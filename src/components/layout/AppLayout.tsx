import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { logout } from "../../lib/auth";

const tabs = [
    { to: "/app/home", lagel: "ホーム" },
    { to: "/app/payments", label: "支払いと請求" },
    { to: "/app/wallet", label: "取引履歴" },
    { to: "/app/activity", label: "ヘルプ" },
    { to: "/app/settings", label: "設定"},
];

export default function AppLayout(){
    const [open, setOpen] = useState(false);
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="sticky top-0 z-50">
                <div className="bg-[#003087] text-white">
                    <div className="max-w-6xl mx-auto px-6 py-3 flex items-center jusfify-between">
                        <div className="font-bold">PayPal</div>
                        <nav className="hidden md:flex gap-6">
                            {tabs.map(t=>(
                                <NavLink key={t.to} to={t.to}
                                    className={({isActive})=>`text-sm px-2 py-1 rounded ${isActive?'bg-white/10 font-semibold':'opacity-90 hover:opacity-100'}`}>
                                    {t.label}
                                </NavLink>
                            ))}
                        </nav>
                        <div className="flex items-center gap-4">
                            <button onClick={()=>setOpen(o=>!o)} className="md:hidden">☰</button>
                            <button onClick={()=>logout()} className="hidden md:inline underline">ログアウト</button>
                        </div>
                    </div>
                    {open && (
                        <div className="md:hidden max-w6xl max-auto px-4 py-2 grid gap-1">
                            {tabs.map(t=>(
                                <NavLink key={t.to} to={t.to} onClick={()=>setOpen(false)}
                                    className={({isActive})=>`block px-2 py-2 rounded ${isActive?'bg-white/10 font-semibold':'opacity-90'}`}>
                                    {t.label}
                                </NavLink>
                            ))}
                            <button onClick={()=>logout()} className="text-left px-2 py-2">ログアウト</button>
                        </div>
                    )}
                </div>
            </header>
            <main className="max-w-6xl mx-auto px-6 py-8">
                <Outlet/>
            </main>
        </div>
    );
}
