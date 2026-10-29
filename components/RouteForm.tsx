"use client";

import { useState } from "react";
import TripMap from "./TripMap";

interface FormData {
  destination: string;
  startDate: string;
  durationDays: number;
  travelers: number;
  budget: "economy" | "standard" | "luxury";
  interests: string;
}

interface Day {
  day: number;
  title: string;
  date: string;
  activities: any[];
}

export default function RouteForm() {
  const [formData, setFormData] = useState<FormData>({
    destination: "",
    startDate: "",
    durationDays: 7,
    travelers: 1,
    budget: "standard",
    interests: "",
  });

  const [itinerary, setItinerary] = useState<Day[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setItinerary(null);
    try {
      const res = await fetch("/api/generate-route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success && result.itinerary) {
        setItinerary(result.itinerary);
      } else {
        setError(result.error || "Не удалось сгенерировать маршрут");
      }
    } catch {
      setError("Ошибка подключения к серверу");
    } finally {
      setLoading(false);
    }
  };

  const input = (placeholder: string, value: string, onChange: (v: string) => void) => (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded border border-border px-3 py-2"
    />
  );

  const number = (placeholder: string, value: number, onChange: (v: number) => void) => (
    <input
      type="number"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full rounded border border-border px-3 py-2"
    />
  );

  const select = (options: { value: string; label: string }[], value: string, onChange: (v: string) => void) => (
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
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl mb-8">Создать маршрут</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-surface card p-6 sm:p-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Куда</label>
            {input("Город или страна", formData.destination, update.bind(null, "destination"))}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Дата выезда</label>
            {input("ГГГГ-ММ-ДД", formData.startDate, update.bind(null, "startDate"))}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Длительность (дней)</label>
            {number("Количество дней", formData.durationDays, update.bind(null, "durationDays"))}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Количество человек</label>
            {number("Количество человек", formData.travelers, update.bind(null, "travelers"))}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Бюджет</label>
            {select(
              [
                { value: "economy", label: "Эконом" },
                { value: "standard", label: "Классический" },
                { value: "luxury", label: "Люкс" },
              ],
              formData.budget,
              update.bind(null, "budget")
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Интересы</label>
            {input("Через запятую", formData.interests, update.bind(null, "interests"))}
          </div>
        </div>

        <div className="flex gap-4 pt-2">
          <button
            type="submit"
            className="btn-primary flex-1"
            disabled={loading}
          >
            {loading ? "Генерация..." : "Сгенерировать маршрут"}
          </button>
        </div>

        {error && <p className="text-sm text-red-700">{error}</p>}
      </form>

      {itinerary && (
        <div className="mt-8 bg-surface card p-6 sm:p-8">
          <h2 className="font-display text-2xl mb-4">Карта маршрута</h2>
          <TripMap places={itinerary.flatMap((day: Day) =>
            day.activities.map((act: any, idx: number) => ({
              id: `${day.day}-${idx}`,
              day: day.day,
              title: act.placeName || act.title,
              lat: 0,
              lon: 0,
              description: act.description || act.title,
              photo: act.photo || null,
              time: act.time,
            }))
          )}
          />
        </div>
      )}
    </div>
  );
}
