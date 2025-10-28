import { useState } from "react";
import { login } from "../lib/auth"

export default function Login(){
    const [loading, setLoading] = useState(false);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(login, 500);
    };

    return (
        <div className="min-h-screen grid place-itemes-center bg-gray-50">
            <form onSubmit={onSubmit} className="bg-white p-8 rounted-xl shadow w-full max-w-md space-y-4">
                <h1 className="text-2xl font-bold text-center text-blue-600">ログイン</h1>
                <input className="border rounded px-3 py-2 w-full" placeholder="メールアドレス" required/>
                <input type="password" className="border rounded px-3 py-2 w-full" placeholder="パスワード" required/>
                <button disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-full">
                    {loading ? "サインイン中..." : "ログイン"}
                </button>
                <p className="text-center text-sm text-gray-600">
                    アカウントがない？ <a href="/register" className="text-blue-600 hover:underline">新規登録</a>
                </p>
            </form>
        </div>
    );
}