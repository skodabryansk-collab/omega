import { useState } from "react";
import { Button } from "@/components/ui/button";
import heroBg from "@assets/gal-04_1780416774585.jpg";

const ROUTES = [
  { id: "lastochkino", name: "Ласточкино Гнездо", multiplier: 1.0 },
  { id: "ai-petri", name: "Ай-Петри с воды", multiplier: 1.1 },
  { id: "sunset", name: "Закатный круиз", multiplier: 1.05 },
  { id: "custom", name: "Индивидуальный маршрут", multiplier: 1.2 },
];

export function Hero() {
  const [hours, setHours] = useState(2);
  const [guests, setGuests] = useState(2);
  const [route, setRoute] = useState("lastochkino");
  const [isSunset, setIsSunset] = useState(false);

  const calculatePrice = () => {
    const baseRate = 14000;
    const g = guests;

    let guestMultiplier = 1.0;
    if (g > 8) guestMultiplier = 1.5;
    else if (g > 4) guestMultiplier = 1.35;
    else if (g > 2) guestMultiplier = 1.15;

    const r = ROUTES.find(r => r.id === route)?.multiplier || 1.0;
    const sunsetMultiplier = isSunset ? 1.15 : 1.0;

    const total = Math.round((hours * baseRate * guestMultiplier * r * sunsetMultiplier) / 1000) * 1000;
    return new Intl.NumberFormat("ru-RU").format(total) + " ₽";
  };

  const guestWord = (n: number) => {
    if (n === 1) return "гость";
    if (n < 5) return "гостя";
    return "гостей";
  };
  const hourWord = (n: number) => {
    if (n === 1) return "час";
    if (n < 5) return "часа";
    return "часов";
  };

  /* Путь к видео из public-папки через BASE_URL */
  const videoSrc = `${import.meta.env.BASE_URL}hero.mp4`;

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-24 pb-12 overflow-hidden">
      {/* Видео-фон: полноэкранный слой */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <img
          src={heroBg}
          alt="Парусный катамаран OMEGA"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={heroBg}
          className="absolute inset-0 w-full h-full object-cover object-center"
          aria-hidden="true"
          onError={(e) => { (e.currentTarget as HTMLVideoElement).style.display = "none"; }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        {/* Градиент: левая 55% с густым светлым цветом, правая открытая */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(244,248,251,0.98) 0%, rgba(244,248,251,0.98) 58%, rgba(244,248,251,0.85) 65%, transparent 78%, transparent 100%)' }}></div>
      </div>
      {/* Моб: только фото — видео только на desktop */}
      <div className="absolute inset-0 z-0 md:hidden">
        <img
          src={heroBg}
          alt="Парусный катамаран OMEGA"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(244,248,251,0.98) 0%, rgba(244,248,251,0.98) 82%, rgba(244,248,251,0.97) 88%, transparent 95%, transparent 100%)' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 grid md:grid-cols-12 gap-8 md:gap-12 items-center">
        <div className="md:col-span-7 lg:col-span-6 space-y-5 md:space-y-8">
          <div className="inline-block border border-primary/20 bg-primary/10 text-primary text-xs font-semibold tracking-wider px-3 py-1 rounded-full mb-2">
            Французская верфь • Рефит 2025 • Ялта / Крым
          </div>
          <h1
            className="font-serif text-foreground leading-[1.1] mb-4 md:mb-6"
            style={{ fontSize: "clamp(2.1rem, 9vw, 4.5rem)" }}
          >
            Парусный катамаран <span className="text-primary italic">OMEGA</span> для ваших лучших дней в море
          </h1>

          <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-8">
            <span className="bg-white/90 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium border border-white/50 shadow-sm">до 10 гостей</span>
            <span className="bg-white/90 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium border border-white/50 shadow-sm">от 2 часов</span>
            <span className="bg-white/90 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium border border-white/50 shadow-sm">популярные маршруты</span>
          </div>

          <div className="glass-panel p-4 md:p-6 rounded-2xl space-y-3 md:space-y-4 shadow-xl">
            <h3 className="font-serif text-lg md:text-xl font-medium">Калькулятор аренды</h3>

            {/* Ползунок часов */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Длительность</label>
                <span className="text-sm font-medium">{hours} {hourWord(hours)}</span>
              </div>
              <input type="range" min={2} max={8} step={1} value={hours} onChange={(e) => setHours(parseInt(e.target.value))}
                className="w-full h-2 bg-primary/10 rounded-lg appearance-none cursor-pointer accent-primary" />
            </div>

            {/* Счётчик гостей */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Гостей</label>
                <div className="flex items-center gap-2">
                  <button onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20 flex items-center justify-center text-lg font-medium transition-colors">-</button>
                  <span className="text-sm font-medium w-16 text-center">{guests} {guestWord(guests)}</span>
                  <button onClick={() => setGuests(Math.min(12, guests + 1))}
                    className="w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20 flex items-center justify-center text-lg font-medium transition-colors">+</button>
                </div>
              </div>
            </div>

            {/* Маршрут + Чекбокс закат */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-3 h-11 px-4 rounded-xl border border-border bg-white/70 cursor-pointer transition-colors select-none">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide shrink-0">Маршрут</span>
                <select value={route} onChange={(e) => setRoute(e.target.value)}
                  className="flex-1 bg-transparent text-foreground text-sm focus:outline-none appearance-none cursor-pointer min-w-0">
                  {ROUTES.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
              </label>
              <label className="flex items-center gap-3 h-11 px-4 rounded-xl border border-border bg-white/70 cursor-pointer hover:bg-white/90 transition-colors select-none">
                <input type="checkbox" checked={isSunset} onChange={(e) => setIsSunset(e.target.checked)} className="w-4 h-4 accent-primary rounded" />
                <span className="text-sm">Закатный круиз <span className="text-primary">+15%</span></span>
              </label>
            </div>

            <div className="flex items-end justify-between pt-2 border-t border-border/40">
              <div className="text-sm text-muted-foreground">Ориентировочная стоимость:</div>
              <div className="text-3xl font-serif font-medium text-primary">{calculatePrice()}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 hidden sm:flex">
            <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8" onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}>
              Забронировать дату
            </Button>
          </div>

          {/* Mobile: sticky CTA внизу перенесен в MobileCTA компонент */}
        </div>

        <div className="md:col-span-5 lg:col-span-5 lg:col-start-8 hidden md:block">
          <div className="glass-panel p-8 rounded-3xl border border-white/40 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-4 -mt-4"></div>
            <h3 className="font-serif text-2xl font-medium mb-6 relative z-10">Капитанская сводка</h3>
            <ul className="space-y-5 relative z-10">
              {[
                "Идеальное техническое состояние, обновленный интерьер 2025 года.",
                "Просторная кают-компания и панорамное остекление.",
                "Две сетки на носу для загара над водой.",
                "Профессиональный экипаж с многолетним опытом."
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/80">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
