import type { Metadata } from "next";
import RouteForm from "@/components/RouteForm";

export const metadata: Metadata = {
  title: "Мой маршрут | Путешествие от Гермеса",
  description: "Заполните форму и сгенерируйте персональный маршрут с картой.",
};

export default function RoutesPage() {
  return (
    <main className="min-h-screen surface p-6">
      <RouteForm />
    </main>
  );
}
