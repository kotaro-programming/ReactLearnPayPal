// src/pages/app/Payments.tsx
import { useState } from "react";

export default function Payments() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !amount) {
      setMessage("メールアドレスと金額を入力してください。");
      return;
    }
    setMessage(`「${email}」に ¥${amount} を送金したことにします（モック）。`);
    setEmail("");
    setAmount("");
    setNote("");
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
