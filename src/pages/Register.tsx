import React, { useState } from "react";
import { login } from "../lib/auth";

export default function Register(){
    const [agree, setAgree] = useState(false);
    
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!agree) { alert("利用規約に同意してください。"); return; }

        login();
    };

    return (
        <div className="min-h-screen grid place-items-cneter bg-gray-50">
           <form onSubmit={onSubmit} className="bg-white p-8 rounded-xl shadow w-full max-w-md space-y-4">
            <h1 className="text-2xl font-bold text-center text-blue-600">新規登録</h1>
            <input className="border rounded px-3 py-2 w-full" placeholder="氏名" required/>
            <input type="email" className="border rounded px-3 py-2 w-full" placeholder="メールアドレス" required/>
            <input type="password" className="border rounded px-3 py-2 w-full" placeholder="パスワード" required/>
            <input type="password" className="border rounded px-3 py-2 w-full" placeholder="パスワード（確認）" required/>
            <label className="flex items-center text-sm text-gray-600">
                <input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)} className="mr-2"/>
                <span><a href="/legal/terms" className="text-blue-600 hover:underline">利用規約</a>に同意します</span>
            </label>
            <button className="w-ful bg-blue-600 text-white py-2 rounded-full">登録する</button>
           </form>
        </div>
    )
}