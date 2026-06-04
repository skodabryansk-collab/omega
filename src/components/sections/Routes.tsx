import { useCallback, useEffect, useState } from "react";
import { ScrollReveal } from "../ScrollReveal";
import gal01 from "@assets/gal-01_1780416774585.jpg";
import gal02 from "@assets/gal-02_1780416774585.jpg";
import gal03 from "@assets/gal-03_1780416774585.jpg";
import gal04 from "@assets/gal-04_1780416774585.jpg";
import gal05 from "@assets/gal-05_1780416774585.jpg";
import gal06 from "@assets/gal-06_1780416774585.jpg";
import gal08 from "@assets/gal-08_1780416774585.jpg";
import gal09 from "@assets/gal-09_1780416774585.jpg";
import gal10 from "@assets/gal-10_1780416774585.jpg";

/* === Данные маршрутов — удобно редактировать === */
const ROUTES = [
  {
    id: "lastochkino",
    name: "Ялта — Ласточкино Гнездо",
    tag: "Популярный",
    desc: "Классический маршрут вдоль живописного побережья: скалы, замки и лучшие виды Крыма с моря.",
    fullDesc: "Отправляемся из Ялтинской гавани и идём вдоль берега к знаменитому Ласточкиному гнезду. По дороге откроются панорамы Аю-Дага, Гурзуфа и Медведь-горы. Остановимся в бухте для купания, сделаем фото с воды у замка.",
    duration: "от 2 часов",
    price: "от 28 000 ₽",
    includes: ["Опытный капитан", "Безлимитные напитки (вода/сок)", "Снорклинг-комплекты", "Музыка на борту"],
    highlights: ["Вид на замок Ласточкино Гнездо с воды", "Остановка для купания", "Лучшие фото-точки побережья"],
    photo: gal01,
    gallery: [gal01, gal02, gal04, gal06],
  },
  {
    id: "ai-petri",
    name: "Ялта — Ай-Петри с воды",
    tag: "Живописный",
    desc: "Откройте горный хребет Ай-Петри с борта OMEGA. Горные панорамы над бирюзой Чёрного моря.",
    fullDesc: "Уникальный маршрут, дающий редкую возможность увидеть скальные зубцы Ай-Петри с моря. Идём вдоль побережья Мисхора и Алупки, проходим мимо Воронцовского дворца, наблюдаем горы с воды — именно так их видели путешественники XIX века.",
    duration: "от 3 часов",
    price: "от 46 200 ₽",
    includes: ["Опытный капитан", "Напитки на борту", "Рассказ о достопримечательностях", "Купальные остановки"],
    highlights: ["Панорама Ай-Петри с моря", "Дворцы Южного берега", "Кристальная вода в уединённых бухтах"],
    photo: gal10,
    gallery: [gal10, gal08, gal01, gal04],
  },
  {
    id: "sunset",
    name: "Закатный круиз",
    tag: "Романтика",
    desc: "Романтическое плавание в час золотого заката. Идеально для свиданий и камерных праздников.",
    fullDesc: "Выходим за 1,5 часа до заката и встречаем его в открытом море или в уединённой бухте. Горизонт окрашивается в золото и пурпур, паруса светятся. Идеальный формат для предложения руки и сердца, годовщины или романтического вечера.",
    duration: "2–4 часа",
    price: "от 29 400 ₽",
    includes: ["Шампанское/вино в подарок", "Декор по запросу", "Мягкое освещение на борту", "Плед и подушки"],
    highlights: ["Встреча заката в открытом море", "Атмосфера для романтики", "Возможность предложения"],
    photo: gal03,
    gallery: [gal03, gal04, gal05, gal06],
  },
  {
    id: "custom",
    name: "Индивидуальный маршрут",
    tag: "Под ключ",
    desc: "Составьте свой маршрут вместе с нашим капитаном. Весь южный берег Крыма — ваша карта.",
    fullDesc: "Форос, Балаклава, мыс Фиолент, Алушта — выбирайте любое направление. Капитан OMEGA знает каждую бухту и предложит лучшие маршруты в зависимости от сезона, ветра и ваших пожеланий. Корпоративы, дни рождения, семейный отдых.",
    duration: "по договорённости",
    price: "от 33 600 ₽",
    includes: ["Полная свобода маршрута", "Кейтеринг по запросу", "Декор и тематика", "Любое количество гостей до 12"],
    highlights: ["Весь южный берег в вашем распоряжении", "Секретные бухты", "Формат под любое событие"],
    photo: gal06,
    gallery: [gal06, gal09, gal05, gal08],
  },
];

type Route = typeof ROUTES[number];

/* === Компонент попапа маршрута === */
function RouteModal({ route, onClose }: { route: Route; onClose: () => void }) {
  const [galIdx, setGalIdx] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  const bookRoute = useCallback(() => {
    onClose();
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("omega:selectroute", { detail: route.name }));
    }, 300);
  }, [onClose, route.name]);

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-foreground/70 backdrop-blur-sm p-4"
      onClick={onClose}
      data-testid={`route-modal-${route.id}`}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Фото-карусель */}
        <div className="relative h-56 md:h-72 rounded-t-3xl overflow-hidden">
          <img
            src={route.gallery[galIdx]}
            alt={route.name}
            className="w-full h-full object-cover transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Миниатюры */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {route.gallery.map((_, i) => (
              <button
                key={i}
                onClick={() => setGalIdx(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === galIdx ? "bg-white scale-125" : "bg-white/50"}`}
                aria-label={`Фото ${i + 1}`}
              />
            ))}
          </div>

          {/* Стрелки */}
          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all"
            onClick={() => setGalIdx((galIdx - 1 + route.gallery.length) % route.gallery.length)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all"
            onClick={() => setGalIdx((galIdx + 1) % route.gallery.length)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>

          {/* Закрыть */}
          <button
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all"
            onClick={onClose}
            aria-label="Закрыть"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>

          <span className="absolute top-4 left-4 text-xs font-semibold bg-white/20 backdrop-blur-sm text-white border border-white/30 px-3 py-1 rounded-full">
            {route.tag}
          </span>
        </div>

        {/* Контент */}
        <div className="p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif mb-2">{route.name}</h2>
            <p className="text-muted-foreground leading-relaxed">{route.fullDesc}</p>
          </div>

          {/* Длительность и цена */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/40 rounded-2xl p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Длительность</p>
              <p className="font-serif text-xl font-medium text-foreground">{route.duration}</p>
            </div>
            <div className="bg-primary/5 border border-primary/15 rounded-2xl p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Стоимость</p>
              <p className="font-serif text-xl font-medium text-primary">{route.price}</p>
            </div>
          </div>

          {/* Включено */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Включено в стоимость</p>
            <div className="grid grid-cols-2 gap-2">
              {route.includes.map((item, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <p className="text-sm text-foreground/80">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Особенности */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Особенности маршрута</p>
            <div className="space-y-2">
              {route.highlights.map((h, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <p className="text-sm text-foreground/80">{h}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Кнопка бронирования */}
          <button
            onClick={bookRoute}
            data-testid={`book-route-${route.id}`}
            className="w-full h-13 py-4 rounded-full bg-primary text-white font-semibold tracking-wide hover:bg-primary/90 active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
          >
            Забронировать этот маршрут
          </button>
        </div>
      </div>
    </div>
  );
}

/* === Основной компонент === */
export function Routes() {
  const [openRoute, setOpenRoute] = useState<Route | null>(null);

  return (
    <section id="routes" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="max-w-xl mb-14">
            <div className="inline-block border border-primary/20 text-primary text-xs font-semibold tracking-wider px-3 py-1 rounded-full mb-4">
              Южный берег Крыма
            </div>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">
              Популярные <span className="italic text-primary">маршруты</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Нажмите на карточку, чтобы узнать подробности и сразу забронировать маршрут.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {ROUTES.map((route, i) => (
            <div
              key={route.id}
              className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer h-[420px] md:h-[480px]"
              onClick={() => setOpenRoute(route)}
              data-testid={`route-card-${i}`}
            >
                <img
                  src={route.photo}
                  alt={route.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/50 to-foreground/10" />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute top-4 left-4">
                  <span className="text-xs font-semibold bg-white/20 backdrop-blur-sm text-white border border-white/30 px-3 py-1 rounded-full">
                    {route.tag}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                  <h3 className="text-lg font-serif font-medium text-white leading-snug">{route.name}</h3>
                  <p className="text-white/75 text-sm leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    {route.desc}
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-sm font-semibold text-white/90">{route.duration}</span>
                    <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors flex items-center gap-1">
                      Подробнее
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-200">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>

      {/* Попап маршрута */}
      {openRoute && (
        <RouteModal route={openRoute} onClose={() => setOpenRoute(null)} />
      )}
    </section>
  );
}
