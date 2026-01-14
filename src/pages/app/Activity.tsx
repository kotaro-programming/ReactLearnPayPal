import { useEffect, useMemo, useState } from "react";
import { fetchPayments, type Payment } from "../../lib/api";

type FilterValue = "all" | "in" | "out" | "refund";

function formatDate(iso: string) {
  // 例: 2025-11-25T10:20:00Z -> 2025/11/25 19:20 のように表示（環境依存）
  const d = new Date(iso);
  return d.toLocaleString();
}

function formatAmount(amount: number, currency: string) {
  // 今回は JPY 前提の表示に寄せています（必要なら通貨ごとに出し分け）
  if (currency === "JPY") {
    const n = Math.abs(amount).toLocaleString("ja-JP");
    return amount >= 0 ? `+¥${n}` : `-¥${n}`;
  }

  // JPY以外はシンプル表示
  const n = Math.abs(amount).toLocaleString();
  return amount >= 0 ? `+${n} ${currency}` : `-${n} ${currency}`;
}

function statusBadgeClass(status: Payment["status"]) {
  switch (status) {
    case "completed":
      return "bg-green-50 text-green-700";
    case "pending":
      return "bg-yellow-50 text-yellow-700";
    case "failed":
      return "bg-red-50 text-red-700";
    default:
      return "bg-gray-50 text-gray-700";
  }
}

export default function Activity() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 画面の検索・フィルタ（今のUIに合わせて状態だけ持たせます）
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterValue>("all");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchPayments();
        if (!cancelled) {
          setPayments(data.payments);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setError("取引履歴の取得に失敗しました。バックエンドが起動しているか確認してください。");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredPayments = useMemo(() => {
    const q = query.trim().toLowerCase();

    return payments.filter((p) => {
      // フィルタ（入金/支払い/返金）
      if (filter === "in" && p.direction !== "in") return false;
      if (filter === "out" && p.direction !== "out") return false;

      // refund は今回のデータモデルに専用項目がないので暫定的に判定します
      // 例: タイトルに「返金」が含まれる or 入金かつ金額が正
      if (filter === "refund") {
        const isRefund = p.title.includes("返金") || (p.direction === "in" && p.amount > 0);
        if (!isRefund) return false;
      }

      // 検索（相手・取引IDなど）
      if (!q) return true;
      const idHit = String(p.id).includes(q);
      const titleHit = p.title.toLowerCase().includes(q);
      return idHit || titleHit;
    });
  }, [payments, query, filter]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">取引履歴</h1>

      <div className="bg-white rounded-xl p-6 shadow">
        <div className="mb-4 flex flex-col md:flex-row gap-3">
          <input
            className="border rounded px-3 py-2 flex-1"
            placeholder="検索（相手・取引IDなど）"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="border rounded px-3 py-2 w-full md:w-40"
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterValue)}
          >
            <option value="all">すべて</option>
            <option value="in">入金</option>
            <option value="out">支払い</option>
            <option value="refund">返金</option>
          </select>
        </div>

        {loading && <div className="text-sm text-gray-500">読み込み中...</div>}
        {error && <div className="text-sm text-red-600">{error}</div>}

        {!loading && !error && (
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500 border-b">
              <tr>
                <th className="py-2">日付</th>
                <th>相手</th>
                <th>取引ID</th>
                <th className="text-right">金額</th>
                <th className="text-center">ステータス</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((p) => (
                <tr key={p.id} className="border-b last:border-0">
                  <td className="py-2">{formatDate(p.occurredAt)}</td>
                  <td>{p.title}</td>
                  <td>{p.id}</td>
                  <td
                    className={`text-right ${
                      p.amount >= 0 ? "text-green-600" : ""
                    }`}
                  >
                    {formatAmount(p.amount, p.currency)}
                  </td>
                  <td className="text-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${statusBadgeClass(p.status)}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-500">
                    該当する取引がありません
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
