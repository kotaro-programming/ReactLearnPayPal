import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../../lib/auth";
import { fetchMe, type User } from "../../lib/api";

const tabs = [
  { to: "/app/home", label: "ホーム" },
  { to: "/app/wallet", label: "ウォレット" },
  { to: "/app/payments", label: "支払いと請求" },
  { to: "/app/activity", label: "取引履歴" },
  { to: "/app/help", label: "ヘルプ" },
  { to: "/app/settings", label: "設定" },
];

export default function AppLayout() {
  const [open, setOpen] = useState(false);

  // ★追加：ユーザー情報
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // ★追加：初回だけ /api/me を叩く
  useEffect(() => {
    let cancelled = false;

    async function loadMe() {
      try {
        setLoadingUser(true);
        const data = await fetchMe();
        if (!cancelled) setUser(data.user);
      } catch (e) {
        console.error("Failed to fetch /api/me:", e);
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoadingUser(false);
      }
    }

    loadMe();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50">
        <div className="bg-[#003087] text-white">
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="font-bold shrink-0">PayPal</div>

            <nav className="hidden md:flex gap-6">
              {tabs.map((t) => (
                <NavLink
                  key={t.to}
                  to={t.to}
                  className={({ isActive }) =>
                    `text-sm px-2 py-1 rounded whitespace-nowrap ${
                      isActive
                        ? "bg-white/10 font-semibold"
                        : "opacity-90 hover:opacity-100"
                    }`
                  }
                >
                  {t.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              {/* ★追加：ユーザー名表示（PCのみ） */}
              <div className="hidden md:block text-sm opacity-90">
                {loadingUser ? "loading..." : user ? user.name : "Guest"}
              </div>

              <button onClick={() => setOpen((o) => !o)} className="md:hidden">
                ☰
              </button>
              <button onClick={logout} className="hidden md:inline underline">
                ログアウト
              </button>
            </div>
          </div>

          {open && (
            <div className="md:hidden max-w-6xl mx-auto px-4 py-2 grid gap-1">
              {/* ★追加：ユーザー名表示（スマホメニュー内） */}
              <div className="px-2 py-2 text-sm opacity-90">
                {loadingUser ? "loading..." : user ? user.name : "Guest"}
              </div>

              {tabs.map((t) => (
                <NavLink
                  key={t.to}
                  to={t.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-2 py-2 rounded ${
                      isActive ? "bg-white/10 font-semibold" : "opacity-90"
                    }`
                  }
                >
                  {t.label}
                </NavLink>
              ))}
              <button onClick={logout} className="text-left px-2 py-2">
                ログアウト
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
