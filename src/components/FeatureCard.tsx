// src/components/FeatureCard.tsx
interface Props {
  title: string;
  desc: string;
}

export default function FeatureCard({ title, desc }: Props) {
  return (
    <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center text-center">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}
