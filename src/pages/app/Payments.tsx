// src/pages/app/Payments.tsx
import { useState, type FormEvent } from "react";

export default function Payments() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const normalizedAmount = Number(amount.replace(/,/g, ""));
    if (
      !email ||
      !amount ||
      !Number.isFinite(normalizedAmount) ||
      normalizedAmount <= 0
    ) {
      setMessage("メールアドレスと正しい金額を入力してください。");
      return;
    }

    try {
      setMessage("");

      const res = await fetch("http://localhost:3001/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toEmail: email,
          amount: normalizedAmount,
          note,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => null);
        const msg = errJson?.error ?? `送金に失敗しました（${res.status}）`;
        setMessage(msg);
        return;
      }

      setMessage(
        `「${email}」に ¥${normalizedAmount.toLocaleString(
          "ja-JP"
        )} を送金しました。`
      );
      setEmail("");
      setAmount("");
      setNote("");
    } catch (err) {
      console.error(err);
      setMessage("送金に失敗しました。バックエンドが起動しているか確認してください。");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">支払いと請求</h1>

      <form
        onSubmit={onSubmit}
        className="bg-white rounded-xl p-6 shadow space-y-4 max-w-xl"
      >
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            送金先（メールアドレス）
          </label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@example.com"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">金額 (¥)</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="1,000"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            メモ（任意）
          </label>
          <textarea
            className="border rounded px-3 py-2 w-full"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="例）昼ごはん代"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-full"
          >
            送金
          </button>
          <button
            type="button"
            className="border px-4 py-2 rounded-full text-gray-700"
          >
            請求書を作成（モック）
          </button>
        </div>

        {message && (
          <p className="text-sm text-green-700 bg-green-50 border border-green-100 px-3 py-2 rounded">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
