import { useState } from "react";
import { ScrollReveal } from "../ScrollReveal";

const REVIEWS = [
  {
    name: "Алексей И.",
    date: "май 2026",
    text: "Отмечали день рождения на OMEGA — получилось замечательно! Яхта идеально подходит для большой компании, капитан подожал пожар, а мы жарили колбаски прямо на носу. Рекомендую!",
    rating: 5,
  },
  {
    name: "Ольга К.",
    date: "апрель 2026",
    text: "Фотосессия на закате — безумно красиво. Яхта плавная, не качает, панорамное остекление. Сапборды включены в аренду, это большой плюс.",
    rating: 5,
  },
  {
    name: "Дмитрий Н.",
    date: "май 2026",
    text: "Мальчишник на 10 человек получился отлично. Места хватило, работает большой камбуз, а декор патио надал настрой. Ай-Петри на закате — забываемое зрелище.",
    rating: 5,
  },
  {
    name: "Сергей М.",
    date: "июнь 2026",
    text: "Взяли яхту на полдня с семьёй. Места много, дети свободно бегали по палубе. Сапборды понравились, но камбуз маловат для готовки на 8 человек. В целом — хороший отдых.",
    rating: 4,
  },
  {
    name: "Мария В.",
    date: "май 2026",
    text: "Фотосессия на закате — просто магия! Команда помогла с декором, свет был идеальным. Единственный минус — чуть прохладно в мае, но пледы были. Обязательно приедем летом!",
    rating: 5,
  },
  {
    name: "Артём С.",
    date: "апрель 2026",
    text: "Второй раз арендуем OMEGA. Прогулка до Ласточкино Гнезда на три часа — хватило вполне. Самое главное — дети были довольны, без качки.",
    rating: 5,
  },
  {
    name: "Наталия П.",
    date: "март 2026",
    text: "Первый опыт аренды яхты в Ялте, и выбор оказался первоклассным. Яхта большая, устойчивая, команда опытная. Обязательно вернемся.",
    rating: 5,
  },
  {
    name: "Иван К.",
    date: "июнь 2026",
    text: "Взял маршрут до Ласточкиного гнезда. Море было штормовое, но капитан уверенно управлял. Круиз получился экстремальным, но безопасным. Рекомендую!",
    rating: 5,
  },
  {
    name: "Анна Р.",
    date: "июнь 2026",
    text: "Девичник получился отличный! Шампанское, декор, вечерняя подсветка — всё было на высоте. Одна звезда минус за небольшое опоздание в выходе, но капитан переждал.",
    rating: 4,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < rating ? "#f59e0b" : "none"} stroke={i < rating ? "none" : "#e5e7eb"} strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export function Reviews() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? REVIEWS : REVIEWS.slice(0, 3);

  return (
    <section id="reviews" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="max-w-2xl mb-14">
            <div className="inline-block border border-primary/20 text-primary text-xs font-semibold tracking-wider px-3 py-1 rounded-full mb-4">
              Что говорят гости
            </div>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">
              Отзывы <span className="italic text-primary">об OMEGA</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Реальные впечатления наших гостей — почему они возвращаются.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {visible.map((r, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="bg-white p-6 rounded-2xl border border-border/60 shadow-sm h-full flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-serif text-sm font-medium">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{r.name}</div>
                      <div className="text-xs text-muted-foreground">{r.date}</div>
                    </div>
                  </div>
                  <StarRating rating={r.rating} />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{r.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {!showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="h-11 px-6 rounded-full border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
            >
              Показать ещё отзывы
            </button>
          )}
          <a
            href="https://yandex.ru/maps/org/omega_yalta/28905785392/?ll=34.1545%2C44.4902&z=15"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 h-11 px-6 rounded-full border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 0C8.686 0 6 3.239 6 7.2 6 12 12 22 12 22s6-10 6-14.8C18 3.239 15.314 0 12 0z" fill="#ff6a6a" />
            </svg>
            Отзывы на Яндекс Картах
          </a>
        </div>
      </div>
    </section>
  );
}
