import { mockBalance, mockTransactions } from "../../lib/mock";

export default function Home() {
  const recent = mockTransactions.slice(0, 3);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">ホーム</h1>

      {/* 上段：残高 + クイック送金 */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* 残高カード */}
        <section className="bg-white rounded-xl p-6 shadow flex flex-col justify-between">
          <div>
            <h2 className="text-sm text-gray-500">PayPal残高</h2>
            <p className="text-3xl font-semibold mt-2">
              ¥{mockBalance.toLocaleString()}
            </p>
          </div>
          <div className="mt-4 flex gap-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">
              送金
            </button>
            <button className="border px-4 py-2 rounded-full text-sm">
              入金
            </button>
          </div>
        </section>

        {/* クイック送金（ダミー） */}
        <section className="bg-white rounded-xl p-6 shadow md:col-span-2">
          <h2 className="text-sm text-gray-500 mb-3">クイック送金</h2>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              className="border rounded px-3 py-2 flex-1"
              placeholder="メールアドレスまたは名前"
            />
            <input
              className="border rounded px-3 py-2 w-40"
              placeholder="金額 (¥)"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full">
              次へ
            </button>
          </div>
        </section>
      </div>

      {/* 下段：最近の取引 */}
      <section className="bg-white rounded-xl p-6 shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm text-gray-500">最近の取引</h2>
          <a href="/app/activity" className="text-sm text-blue-600 hover:underline">
            すべて表示
          </a>
        </div>

        <ul className="divide-y">
          {recent.map((tx) => (
            <li key={tx.id} className="py-3 flex items-center justify-between">
              <div>
                <p className="font-medium">{tx.name}</p>
                <p className="text-xs text-gray-500">
                  {tx.date} ・ {tx.id}
                </p>
              </div>
              <div className="text-right">
                <p className={tx.amount >= 0 ? "text-green-600" : "text-gray-800"}>
                  {tx.amount >= 0
                    ? `+¥${tx.amount}`
                    : `-¥${Math.abs(tx.amount)}`}
                </p>
                <p className="text-xs text-gray-500">{tx.status}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
