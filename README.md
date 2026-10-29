# Путешествие от Гермеса

Ваш персональный путеводитель и генератор маршрутов.  
Приложение помогает планировать поездки: от гостевой страницы интро и регистрации
через Supabase, до онбординга на трёх-четырёх шагах и, наконец, генерации маршрута
с интерактивной картой по точкам каждого дня.

## Стэк

- Next.js 16 (App Router) + Turbopack
- React 19 + TypeScript
- Supabase (auth + профиль пользователя)
- OpenAI (GPT-4.1-mini) — генерация маршрутов
- Leaflet + react-leaflet — интерактивная карта
- Tailwind CSS 4

## Запуск

```bash
npm install
npm run dev
# → http://localhost:3000
```

`.env.local`:

```bash
OPENAI_API_KEY=sk-...
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

## Структура

- `app/page.tsx` — гостевая страница (интро)
- `app/auth/page.tsx` — авторизация
- `app/onboarding/page.tsx` — онбординг (3–4 шага)
- `app/routes/page.tsx` — основная страница с формой маршрута + картой
- `components/` — переиспользуемые компоненты
- `lib/` — Supabase-клиент, генератор маршрутов
