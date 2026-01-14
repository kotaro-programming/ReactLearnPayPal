// src/pages/app/Wallet.tsx
import { useEffect, useState } from "react";
import { mockCards } from "../../lib/mock";
import { fetchWallets, type Wallet } from "../../lib/api";

function formatMoney(balance: number, currency: Wallet["currency"]) {
  if (currency === "JPY") {
    return `¥${balance.toLocaleString("ja-JP")}`;
  }
  return `${balance.toLocaleString()} ${currency}`;
}

export default function WalletPage() {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchWallets();
        if (!cancelled) {
          setWallets(data.wallets);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setError("ウォレット残高の取得に失敗しました。");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">ウォレット</h1>

      {/* ★追加：残高（wallets テーブルの内容） */}
      <section className="bg-white rounded-xl p-6 shadow">
        <h2 className="font-semibold mb-3">残高</h2>

        {loading && <p className="text-sm text-gray-500">読み込み中...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {!loading && !error && (
          <>
            {wallets.length === 0 ? (
              <p className="text-gray-600 text-sm">残高データがありません。</p>
            ) : (
              <ul className="space-y-2">
                {wallets.map((w) => (
                  <li
                    key={w.id}
                    className="flex items-center justify-between border rounded px-3 py-2"
                  >
                    <span className="font-medium">{w.currency}</span>
                    <span>{formatMoney(w.balance, w.currency)}</span>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 支払い方法（現状はモックのまま残す） */}
        <section className="bg-white rounded-xl p-6 shadow">
          <h2 className="font-semibold mb-3">支払い方法</h2>
          <ul className="space-y-2">
            {mockCards.map((card) => (
              <li
                key={card.id}
                className="flex items-center justify-between border rounded px-3 py-2"
              >
                <span>
                  {card.brand} **** {card.last4}
                </span>
                <button className="text-blue-600 text-sm hover:underline">
                  管理
                </button>
              </li>
            ))}
          </ul>
          <button className="mt-4 border px-4 py-2 rounded-full text-sm">
            カードを追加
          </button>
        </section>

        {/* 銀行口座（現状のまま） */}
        <section className="bg-white rounded-xl p-6 shadow">
          <h2 className="font-semibold mb-3">銀行口座</h2>
          <p className="text-gray-600 text-sm">銀行口座はまだ登録されていません。</p>
          <button className="mt-4 border px-4 py-2 rounded-full text-sm">
            銀行口座を追加
          </button>
        </section>
      </div>
    </div>
  );
}
