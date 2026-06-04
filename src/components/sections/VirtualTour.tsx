import { useState, useRef } from "react";
import { ScrollReveal } from "../ScrollReveal";
import gal05 from "@assets/gal-05_1780416774585.jpg";
import gal09 from "@assets/gal-09_1780416774585.jpg";
import gal06 from "@assets/gal-06_1780416774585.jpg";
import gal07 from "@assets/gal-07_1780416774585.jpg";

/* === Зоны для 3D-тура === */
const ZONES = [
  {
    id: "saloon",
    name: "Кают-компания",
    photo: gal05,
    desc: "Просторный отдых для 6–8 гостей. Панорамное окно, мебель из массива тика, амбиентное освещение.",
    specs: ["До 8 гостей", "Панорамное окно", "Мини-бар"],
    hotspots: [
      { x: 28, y: 45, label: "Окно" },
      { x: 72, y: 55, label: "Сервировка" },
    ],
  },
  {
    id: "cockpit",
    name: "Кокпит",
    photo: gal06,
    desc: "Наблюдательное место для отдыха одновременно с парусами. Зона обеда и аперитивов.",
    specs: ["До 6 гостей", "Доступ к парусам", "Солнечная зона"],
    hotspots: [
      { x: 35, y: 38, label: "Паруса" },
      { x: 65, y: 62, label: "Сетки" },
    ],
  },
  {
    id: "nav",
    name: "Навигационный мостик",
    photo: gal07,
    desc: "Современное оборудование и картография для безопасного плавания по всем маршрутам.",
    specs: ["Спутниковая навигация", "Радар", "Эхолот"],
    hotspots: [
      { x: 50, y: 50, label: "Радар" },
    ],
  },
  {
    id: "interior",
    name: "Каюты",
    photo: gal09,
    desc: "Уютная каюта с кондиционером, двуспальной кроватью и чистой ванной комнатой.",
    specs: ["Кондиционер", "Двуспальная кровать", "Санузел"],
    hotspots: [
      { x: 42, y: 35, label: "Кровать" },
      { x: 68, y: 48, label: "Иллюминация" },
    ],
  },
];

export function VirtualTour() {
  const [activeZone, setActiveZone] = useState(0);
  const zone = ZONES[activeZone];
  const imgRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    setTilt({ x: -y, y: x });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section id="tour" className="py-24 bg-white relative overflow-hidden">
      {/* Фоновый паттерн */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative">
        <ScrollReveal>
          <div className="max-w-xl mb-14">
            <div className="inline-block border border-primary/20 text-primary text-xs font-semibold tracking-wider px-3 py-1 rounded-full mb-4">
              3D визуализация
            </div>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">
              3D тур по <span className="italic text-primary">OMEGA</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Осмотрите помещения яхты заранее: кают-компания, кокпит, мостик и каюты. Наведите на фото, чтобы почувствовать объём.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Левая колонка — зоны навигации */}
          <div className="lg:col-span-4 space-y-4">
            {ZONES.map((z, i) => (
              <ScrollReveal key={z.id} delay={i * 80}>
                <button
                  onClick={() => setActiveZone(i)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 border ${
                    i === activeZone
                      ? "bg-primary/5 border-primary/20 shadow-lg shadow-primary/10"
                      : "bg-white/60 border-border/40 hover:border-primary/20 hover:bg-white"
                  }`}
                  data-testid={`tour-zone-${i}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                      i === activeZone ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                    }`}>
                      {i + 1}
                    </div>
                    <div>
                      <p className={`font-medium text-sm transition-colors ${i === activeZone ? "text-primary" : "text-foreground"}`}>
                        {z.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{z.specs.length} подробностей</p>
                    </div>
                    <div className="ml-auto">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`transition-all ${i === activeZone ? "text-primary translate-x-1" : "text-muted-foreground"}`}
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>

          {/* Правая колонка — изображение с 3D тилтом */}
          <div className="lg:col-span-8">
            <ScrollReveal delay={200}>
              <div
                ref={imgRef}
                className="relative rounded-3xl overflow-hidden shadow-2xl cursor-move select-none"
                style={{
                  perspective: "1000px",
                  transformStyle: "preserve-3d",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                data-testid="tour-viewport"
              >
                <div
                  className="transition-transform duration-200 ease-out"
                  style={{
                    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.05)`,
                    transformOrigin: "center center",
                  }}
                >
                  <img
                    src={zone.photo}
                    alt={zone.name}
                    className="w-full h-[420px] md:h-[520px] object-cover"
                    draggable={false}
                  />
                </div>

                {/* Затемнение по краям */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                {/* Шильд переключения */}
                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10">
                  {activeZone + 1} / {ZONES.length}
                </div>

                {/* Хотспоты */}
                {zone.hotspots.map((h, hi) => (
                  <div
                    key={hi}
                    className="absolute group cursor-pointer"
                    style={{ left: `${h.x}%`, top: `${h.y}%`, transform: "translate(-50%, -50%)" }}
                    data-testid={`tour-hotspot-${hi}`}
                  >
                    <div className="relative">
                      {/* Пульсирующая кольцевая волна */}
                      <div className="absolute inset-0 w-6 h-6 rounded-full bg-white/30 animate-ping" />
                      <div className="relative w-6 h-6 rounded-full bg-white/90 border-2 border-primary flex items-center justify-center shadow-lg">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </div>
                      {/* Всплывающая подпись */}
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/90 backdrop-blur-sm text-foreground text-xs font-medium px-2.5 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        {h.label}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Навигационные стрелки */}
                <button
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all backdrop-blur-sm"
                  onClick={() => setActiveZone((activeZone - 1 + ZONES.length) % ZONES.length)}
                  aria-label="Предыдущая зона"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all backdrop-blur-sm"
                  onClick={() => setActiveZone((activeZone + 1) % ZONES.length)}
                  aria-label="Следующая зона"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
            </ScrollReveal>

            {/* Детали зоны */}
            <ScrollReveal delay={300}>
              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-serif mb-2">{zone.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{zone.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {zone.specs.map((s, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 bg-primary/5 text-primary text-xs font-medium px-3 py-1.5 rounded-full border border-primary/10">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
