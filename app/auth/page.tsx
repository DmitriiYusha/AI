import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Вход | Путешествие от Гермеса",
  description: "Войдите в аккаунт, чтобы сохранить ваши маршруты.",
};

export default function AuthPage() {
  return (
    <main className="min-h-screen flex items-center justify-center surface p-6">
      <AuthForm />
    </main>
  );
}
