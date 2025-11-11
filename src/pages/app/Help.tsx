// src/pages/app/Help.tsx
export default function Help() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">ヘルプ</h1>

      {/* 検索ボックス（見た目だけ） */}
      <input
        className="border rounded px-3 py-2 w-full"
        placeholder="キーワードでヘルプを検索"
      />

      {/* Q&A アコーディオン */}
      <div className="bg-white rounded-xl p-6 shadow space-y-2">
        <details className="border-b pb-3">
          <summary className="cursor-pointer font-medium">
            支払いが反映されない場合は？
          </summary>
          <p className="mt-2 text-sm text-gray-600">
            数分お待ちいただき、画面を再読み込みしてみてください。（モック）
          </p>
        </details>

        <details className="border-b pb-3">
          <summary className="cursor-pointer font-medium">
            パスワードを忘れてしまいました
          </summary>
          <p className="mt-2 text-sm text-gray-600">
            ログイン画面の「パスワードをお忘れですか？」からリセットできます。（モック）
          </p>
        </details>

        <details>
          <summary className="cursor-pointer font-medium">
            手数料はどこで確認できますか？
          </summary>
          <p className="mt-2 text-sm text-gray-600">
            手数料ページをご確認ください。（モックのため実際のリンクはありません）
          </p>
        </details>
      </div>
    </div>
  );
}
