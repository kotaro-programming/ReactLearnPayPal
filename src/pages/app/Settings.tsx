// src/pages/app/Settings.tsx
import { useState } from "react";

type Tab = "profile" | "security" | "notifications";

export default function Settings() {
  const [tab, setTab] = useState<Tab>("profile");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">設定</h1>

      {/* タブ */}
      <div className="bg-white rounded-xl p-6 shadow">
        <div className="flex gap-3 border-b pb-4 mb-4">
          <button
            onClick={() => setTab("profile")}
            className={
              "px-3 py-1 rounded-full text-sm " +
              (tab === "profile"
                ? "bg-blue-50 text-blue-700"
                : "text-gray-700 hover:bg-gray-100")
            }
          >
            プロフィール
          </button>
        <button
            onClick={() => setTab("security")}
            className={
              "px-3 py-1 rounded-full text-sm " +
              (tab === "security"
                ? "bg-blue-50 text-blue-700"
                : "text-gray-700 hover:bg-gray-100")
            }
          >
            セキュリティ
          </button>
          <button
            onClick={() => setTab("notifications")}
            className={
              "px-3 py-1 rounded-full text-sm " +
              (tab === "notifications"
                ? "bg-blue-50 text-blue-700"
                : "text-gray-700 hover:bg-gray-100")
            }
          >
            通知
          </button>
        </div>

        {/* タブごとの内容 */}
        {tab === "profile" && (
          <form className="space-y-4 max-w-lg">
            <div>
              <label className="block text-sm text-gray-600 mb-1">氏名</label>
              <input
                className="border rounded px-3 py-2 w-full"
                defaultValue="山田 太郎"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                メールアドレス
              </label>
              <input
                className="border rounded px-3 py-2 w-full"
                defaultValue="taro@example.com"
              />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">
              保存
            </button>
          </form>
        )}

        {tab === "security" && (
          <form className="space-y-4 max-w-lg">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                現在のパスワード
              </label>
              <input
                type="password"
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                新しいパスワード
              </label>
              <input
                type="password"
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">
              パスワードを変更
            </button>
          </form>
        )}

        {tab === "notifications" && (
          <form className="space-y-4 max-w-lg">
            <div className="flex items-center gap-2">
              <input type="checkbox" defaultChecked />
              <span className="text-sm text-gray-700">
                メールで支払い通知を受け取る
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <span className="text-sm text-gray-700">
                プロモーションメールを受け取る
              </span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">
              通知設定を保存
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
