// src/components/Header.tsx
export default function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-4 shadow">
      <h1 className="text-2xl font-bold text-blue-600">PayPal</h1>
      <nav className="hidden md:flex gap-6 text-sm text-gray-700">
        <a href="#">個人</a>
        <a href="#">法人</a>
        <a href="#">ヘルプ</a>
      </nav>
      <div className="flex gap-3">
        <button className="text-blue-600 font-semibold hover:underline">
          <a href="/login">ログイン</a>
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">
          <a href="/Register">会員登録</a>
        </button>
      </div>
    </header>
  );
}
