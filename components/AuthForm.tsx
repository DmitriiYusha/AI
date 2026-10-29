"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { name } },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
      router.push("/onboarding");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Что-то пошло не так");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center surface p-6">
      <div className="max-w-md w-full card p-8">
        <h1 className="font-display text-2xl mb-6">
          {mode === "login" ? "Войти" : "Создать аккаунт"}
        </h1>
        <form onSubmit={submit} className="space-y-4">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded border border-border px-3 py-2"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border border-border px-3 py-2"
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border border-border px-3 py-2"
            required
          />
          {error && <p className="text-sm text-red-700">{error}</p>}
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Загрузка…" : mode === "login" ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-muted-foreground">
          {mode === "login" ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
          <button
            type="button"
            className="text-primary underline"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
          >
            {mode === "login" ? "Зарегистрироваться" : "Войти"}
          </button>
        </p>
      </div>
    </div>
  );
}
