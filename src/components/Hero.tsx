// src/components/Hero.tsx
import mainImage from "../assets/main.png";

export default function Hero() {
  return (
    <section className="text-center bg-blue-50 py-20 px-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        かんたん、安全、スピーディー。
      </h2>
      <p className="text-gray-600 mb-8">
        PayPalなら、オンラインでも実店舗でも、支払いも送金もかんたん。
      </p>
      <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700">
        無料で登録
      </button>
      <div className="mt-12">
        <img
          src={mainImage}
          alt="PayPal Hero"
          className="mx-auto rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
}
