"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Step = "destination" | "dates" | "travelers" | "summary";

interface StepData {
  destination: string;
  startDate: string;
  durationDays: number;
  travelers: number;
  budget: "economy" | "standard" | "luxury";
  interests: string;
}

const BUDGET_OPTIONS = [
  { value: "economy", label: "Эконом (4-5 баров на человека)" },
  { value: "standard", label: "Классический (8-10 баров на человека)" },
  { value: "luxury", label: "Люкс (15+ баров на человека)" },
];

const STEPS = [
  { id: "destination", label: "Куда" },
  { id: "dates", label: "Когда" },
  { id: "travelers", label: "С кем" },
  { id: "summary", label: "Итог" },
] as const;

export default function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("destination");
  const [data, setData] = useState<StepData>({
    destination: "",
    startDate: "",
    durationDays: 7,
    travelers: 1,
    budget: "standard",
    interests: "",
  });

  const goNext = () => {
    setStep((prev) => {
      const nextMap: Record<Step, Step> = {
        destination: "dates",
        dates: "travelers",
        travelers: "summary",
        summary: "summary",
      };
      return nextMap[prev];
    });
  };

  const goBack = () => {
    setStep((prev) => {
      const prevMap: Record<Step, Step> = {
        destination: "destination",
        dates: "destination",
        travelers: "dates",
        summary: "travelers",
      };
      return prevMap[prev];
    });
  };

  const update = <K extends keyof StepData>(key: K, value: StepData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const inputs = {
    text: (placeholder: string, value: string, onChange: (v: string) => void) => (
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-border px-3 py-2"
      />
    ),
    number: (placeholder: string, value: number, onChange: (v: number) => void) => (
      <input
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded border border-border px-3 py-2"
      />
    ),
    select: (options: { value: string; label: string }[], value: string, onChange: (v: string) => void) => (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-border px-3 py-2"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    ),
  };

  const finish = () => {
    // В реальном приложении данные сохраняются в Supabase.
    console.log("Onboarding complete:", data);
    router.push("/routes");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="font-display text-3xl mb-2">Настроим ваш маршрут</h1>
        <p className="text-muted-foreground">
          Немного ответив на вопросы, мы подберём лучшие места и места для отдыха.
        </p>
      </div>

      {/* Прогресс */}
      <div className="flex justify-center mb-10">
        {STEPS.map((s, index) => {
          const isCompleted = index <= STEPS.findIndex((x) => x.id === step);
          return (
            <div key={s.id} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step === s.id
                    ? "bg-primary text-white"
                    : isCompleted
                    ? "bg-surface border border-border"
                    : "bg-muted"
                }`}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </div>
              <span
                className={`text-sm hidden sm:block ${
                  step === s.id ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {s.label}
              </span>
              {index < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded ${
                    isCompleted ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      {/* Шаги */}
      <div className="bg-surface card p-6 sm:p-8">
        {step === "destination" && (
          <div className="space-y-4">
            <h2 className="font-display text-xl">Куда отправимся?</h2>
            <p className="text-muted-foreground text-sm">
              Укажите город или страну, чтобы найти лучшие места.
            </p>
            {inputs.text("Город или страна", data.destination, update.bind(null, "destination"))}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                className="btn-primary"
                onClick={goNext}
              >
                Далее
              </button>
            </div>
          </div>
        )}

        {step === "dates" && (
          <div className="space-y-4">
            <h2 className="font-display text-xl">Когда и сколько времени?</h2>
            <p className="text-muted-foreground text-sm">
              Укажите дату выезда и длительность путешествия.
            </p>
            {inputs.text("Дата выезда (ГГГГ-ММ-ДД)", data.startDate, update.bind(null, "startDate"))}
            {inputs.number("Длительность (дней)", data.durationDays, update.bind(null, "durationDays"))}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                className="btn-primary"
                onClick={goNext}
              >
                Далее
              </button>
            </div>
          </div>
        )}

        {step === "travelers" && (
          <div className="space-y-4">
            <h2 className="font-display text-xl">Кто едет?</h2>
            <p className="text-muted-foreground text-sm">
              Укажите количество путешественников и желаемый бюджет.
            </p>
            {inputs.number("Количество человек", data.travelers, update.bind(null, "travelers"))}
            {inputs.select(
              BUDGET_OPTIONS,
              data.budget,
              update.bind(null, "budget")
            )}
            {inputs.text("Интересы (через запятую)", data.interests, update.bind(null, "interests"))}
            <div className="flex justify-between pt-2">
              <button type="button" className="btn-secondary" onClick={goBack}>
                Назад
              </button>
              <button type="button" className="btn-primary" onClick={goNext}>
                Далее
              </button>
            </div>
          </div>
        )}

        {step === "summary" && (
          <div className="space-y-4">
            <h2 className="font-display text-xl">Итоги</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Куда</span>
                <span className="font-medium">{data.destination || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Дата выезда</span>
                <span className="font-medium">{data.startDate || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Длительность</span>
                <span className="font-medium">{data.durationDays || "—"} дней</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">С кем</span>
                <span className="font-medium">{data.travelers || "—"} человек(а)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Бюджет</span>
                <span className="font-medium">{data.budget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Интересы</span>
                <span className="font-medium">{data.interests || "—"}</span>
              </div>
            </div>
            <div className="flex justify-between pt-2">
              <button type="button" className="btn-secondary" onClick={goBack}>
                Назад
              </button>
              <button type="button" className="btn-primary" onClick={finish}>
                Создать маршрут
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
