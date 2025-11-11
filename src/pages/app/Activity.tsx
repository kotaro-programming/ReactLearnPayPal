import { mockTransactions } from "../../lib/mock";

export default function Activity() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">取引履歴</h1>

      <div className="bg-white rounded-xl p-6 shadow">
        <div className="mb-4 flex flex-col md:flex-row gap-3">
          <input
            className="border rounded px-3 py-2 flex-1"
            placeholder="検索（相手・取引IDなど）"
          />
          <select className="border rounded px-3 py-2 w-full md:w-40">
            <option>すべて</option>
            <option>入金</option>
            <option>支払い</option>
            <option>返金</option>
          </select>
        </div>

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
            {mockTransactions.map((tx) => (
              <tr key={tx.id} className="border-b last:border-0">
                <td className="py-2">{tx.date}</td>
                <td>{tx.name}</td>
                <td>{tx.id}</td>
                <td
                  className={`text-right ${
                    tx.amount >= 0 ? "text-green-600" : ""
                  }`}
                >
                  {tx.amount >= 0
                    ? `+¥${tx.amount}`
                    : `-¥${Math.abs(tx.amount)}`}
                </td>
                <td className="text-center">
                  <span className="px-2 py-1 rounded-full text-xs bg-green-50 text-green-700">
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
