import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ---------- Навигация ---------- */}
      <header className="sticky top-0 z-50 surface border-b border-border/60 backdrop-blur">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M16 8l-5 5-3-3"/></svg>
            Путешествие <span className="text-primary">от Гермеса</span>
          </Link>
          <nav className="flex items-center gap-5 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition">
              Возможности
            </a>
            <a href="#how" className="hover:text-foreground transition">
              Как работает
            </a>
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 btn-primary text-sm px-4 py-2 rounded-full"
            >
              Начать <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </Link>
          </nav>
        </div>
      </header>

      {/* ---------- Главная ---------- */}
      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-12 pb-20 sm:pt-20 sm:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 5.1L19 11l-5.1 1.9L12 19l-1.9-5.1L5 11l5.1-1.9L12 3z"/></svg>
                Персональный ассистент путешествий
              </span>
              <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight">
                Ваш каждый маршрут, такой{" "}
                <span className="text-primary"> как в стихах</span>, чтобы{" "}
                <span className="font-semibold text-foreground">помнился момент</span>, а не
                забывался в пробке.
              </h1>
              <p className="mt-5 text-lg text-muted-foreground max-w-xl leading-relaxed">
                Заполните короткую форму — а ИИ подберёт лучшие места, сгруппирует их
                по дням и отобразит на карте. Убедитесь, что в поездке гораздо больше
                вдохновения, чем забот о том, куда идти в 18:00.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/auth" className="inline-flex items-center btn-primary">
                  Начать <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </Link>
                <a href="#how" className="inline-flex items-center btn-outline text-sm">
                  Как это устроено <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </a>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative hidden lg:block">
              <div className="rounded-2xl surface border border-border p-6 sm:p-8 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <div className="space-y-4">
                  {[
                    { day: "День 1", place: "Западный храм Сэнсодзи", time: "09:00" },
                    { day: "День 1", place: "Парк Чимё-сисэндзи", time: "11:00" },
                    { day: "День 1", place: "Университет Токио (восточные сады)", time: "14:00" },
                    { day: "День 2", place: "Парк Шибуя-Скай", time: "10:00" },
                    { day: "День 2", place: "Бенц-стол с йогуртом", time: "13:00" },
                  ].map((item) => (
                    <div
                      key={item.day + item.place}
                      className="flex items-center justify-between p-3 rounded-lg surface border border-border/60"
                    >
                      <div>
                        <p className="font-medium">{item.place}</p>
                        <p className="text-xs text-muted-foreground">{item.day} · {item.time}</p>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-lg p-4 surface border border-border/60">
                  <p className="text-sm font-medium">Удобно, как в пути</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Каждый день — от 3 до 4 точек. Если они рядом, они объединяются в одну
                    точку. Фото подтверждает, что это именно то место.
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 sm:-right-10 rounded-2xl bg-accent px-6 py-4 text-white shadow-lg">
                <p className="text-2xl font-display">3–4</p>
                <p className="text-sm font-medium">места в день</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <div className="text-center">
            <span className="eyebrow">Что умеет</span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">
              Не список, а <span className="text-primary">воспоминание</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Мы ищем лучшие места, группируем их по дням и показываем фотографии, чтобы
              вы сразу узнавали место.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M16 8l-5 5-3-3"/></svg>,
                title: "Топовые маршруты",
                text: "Примерные маршруты с подписью, которого не хватает в обычных генераторах.",
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3"/><path d="M3 20a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2"/></svg>,
                title: "Группировка по дням",
                text: "Каждый день от 3 до 4 мест. Если они рядом, они объединяются в одну точку.",
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="17" rx="3"/><path d="M3 7h18M16 3v4M8 3v4"/></svg>,
                title: "По дням на карте",
                text: "Интерактивная карта с точками на каждый день, навигация и маршрут.",
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-4.5-7-10a7 7 0 1 1 14 0c0 5.5-7 10-7 10z"/></svg>,
                title: "Фото под места",
                text: "В списке под каждым пунктом — фото, чтобы сразу узнавать необходимое место.",
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 5.1L19 11l-5.1 1.9L12 19l-1.9-5.1L5 11l5.1-1.9L12 3z"/></svg>,
                title: "ИИ-ассистент",
                text: "Лучшие места, сгруппированные по расстоянию, с фото для распознавания.",
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3"/><path d="M3 20a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2"/></svg>,
                title: "Профиль в БД",
                text: "Всё создается внутри аккаунта, чтобы маршруты и настройки сохранялись.",
              },
            ].map((feature) => (
              <div key={feature.title} className="p-5">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  {feature.icon}
                </div>
                <h3 className="font-display text-lg">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="max-w-6xl mx-auto px-5 sm:px-8 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="eyebrow">Пошагово</span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl">
                Три минуты от идеи{" "}
                <span className="text-primary">до карты</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Заполните форму, и мы подберем маршрут и отобразим его по дням.
              </p>
              <ol className="mt-8 space-y-5">
                {[
                  "Регистрация и профиль",
                  "Выбор места, дат и интересов",
                  "Генерация маршрута с картой",
                ].map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="flex flex-shrink-0 h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-semibold">
                      {i + 1}
                    </div>
                    <div className="pt-1">
                      <p className="font-medium">{step}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl surface border border-border p-6 sm:p-8">
              <h3 className="font-display text-xl mb-4">Пример маршрута</h3>
              <div className="space-y-3 text-sm">
                {[
                  { day: "День 1", place: "Сэнсодзис", time: "09:00" },
                  { day: "День 1", place: "Пункт", time: "12:00" },
                  { day: "День 2", place: "Панорамный вид", time: "10:00" },
                ].map((item) => (
                  <div key={item.day + item.place} className="flex items-center justify-between border-b border-border/60 pb-3">
                    <span>{item.day}</span>
                    <span className="text-muted-foreground">{item.time}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Фото подтверждает, что вы пришли в нужное место.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ---------- Футер ---------- */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Путешествие от Гермеса. Всё для воспоминаний.</p>
          <p className="text-xs">Гостинская версия · для демонстрации</p>
        </div>
      </footer>
    </div>
  );
}
