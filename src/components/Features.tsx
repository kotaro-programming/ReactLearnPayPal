// src/components/Features.tsx
import FeatureCard from "./FeatureCard";

export default function Features() {
  return (
    <section className="py-20 bg-gray-50 px-6">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
        <FeatureCard
          title="かんたんに支払い"
          desc="クリックひとつでスムーズにお支払い。"
        />
        <FeatureCard
          title="安全に取引"
          desc="カード情報を相手に伝えずに支払い可能。"
        />
        <FeatureCard
          title="世界中で利用"
          desc="200以上の国と地域で利用できるグローバルな決済。"
        />
      </div>
    </section>
  );
}
