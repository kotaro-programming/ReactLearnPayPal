// src/pages/app/Wallet.tsx
import { mockCards } from "../../lib/mock";

export default function Wallet() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">ウォレット</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* カード一覧 */}
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

        {/* 銀行口座 */}
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
