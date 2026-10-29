import type { Metadata } from "next";
import OnboardingWizard from "@/components/OnboardingWizard";

export const metadata: Metadata = {
  title: "Настроить маршрут | Путешествие от Гермеса",
  description: "Ответьте на несколько вопросов и мы подберём лучшие места.",
};

export default function OnboardingPage() {
  return (
    <main className="min-h-screen surface p-6">
      <OnboardingWizard />
    </main>
  );
}
