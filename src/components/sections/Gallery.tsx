import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollReveal } from "../ScrollReveal";
import gal01 from "@assets/gal-01_1780416774585.jpg";
import gal02 from "@assets/gal-02_1780416774585.jpg";
import gal03 from "@assets/gal-03_1780416774585.jpg";
import gal04 from "@assets/gal-04_1780416774585.jpg";
import gal05 from "@assets/gal-05_1780416774585.jpg";
import gal06 from "@assets/gal-06_1780416774585.jpg";
import gal07 from "@assets/gal-07_1780416774585.jpg";
import gal08 from "@assets/gal-08_1780416774585.jpg";
import gal09 from "@assets/gal-09_1780416774585.jpg";
import gal10 from "@assets/gal-10_1780416774585.jpg";

const gid7Base = `${import.meta.env.BASE_URL}images/`;

const IMAGES = [
  { src: gal01, alt: "OMEGA в море на фоне гор", wide: false, tall: false },
  { src: gal06, alt: "Гости на борту OMEGA у берега", wide: false, tall: true },
  { src: gal04, alt: "Закатный выход на OMEGA", wide: false, tall: false },
  { src: gal02, alt: "OMEGA у скалистого берега", wide: false, tall: false },
  { src: gal05, alt: "Кают-компания OMEGA — сервировка", wide: true, tall: false },
  { src: gal03, alt: "OMEGA на закате, открытое море", wide: false, tall: false },
  { src: gal08, alt: "Вид с носа OMEGA на побережье Ялты", wide: false, tall: false },
  { src: gal09, alt: "Интерьер кают-компании OMEGA", wide: false, tall: false },
  { src: gal07, alt: "Навигационный мостик OMEGA", wide: false, tall: false },
  { src: gal10, alt: "Панорама Ялты с борта OMEGA", wide: true, tall: false },
  { src: `${gid7Base}omega-gid7-01.webp`, alt: "OMEGA — вид с палубы", wide: false, tall: false },
  { src: `${gid7Base}omega-gid7-02.webp`, alt: "OMEGA — дневная прогулка", wide: false, tall: false },
  { src: `${gid7Base}omega-gid7-03.webp`, alt: "OMEGA — вид с воды", wide: false, tall: false },
  { src: `${gid7Base}omega-gid7-04.webp`, alt: "OMEGA — паруса на фоне берега", wide: false, tall: false },
  { src: `${gid7Base}omega-gid7-05.webp`, alt: "OMEGA — под парусами", wide: false, tall: false },
  { src: `${gid7Base}omega-gid7-06.webp`, alt: "OMEGA — у причала в Ялте", wide: false, tall: true },
];

/* Видео-элемент галереи */
const VIDEO_ITEM = {
  poster: gal04,
  src: `${import.meta.env.BASE_URL}hero.mp4`,
  alt: "Видео OMEGA — плавание по берегу Ялты",
};

export function Gallery() {
  /* Текущий индекс (-1 = закрыт, -2 = видео) */
  const [activeIdx, setActiveIdx] = useState(-1);
  /* Флаг анимации при смене фото */
  const [fading, setFading] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const isOpen = activeIdx >= 0;
  const isVideo = activeIdx === -2;
  const total = IMAGES.length;

  /* Переключение с анимацией */
  const goTo = useCallback((idx: number) => {
    setFading(true);
    setTimeout(() => {
      setActiveIdx((idx + total) % total);
      setFading(false);
    }, 180);
  }, [total]);

  const close = useCallback(() => setActiveIdx(-1), []);
  const prev = useCallback(() => goTo(activeIdx - 1), [activeIdx, goTo]);
  const next = useCallback(() => goTo(activeIdx + 1), [activeIdx, goTo]);

  /* Клавиши */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, close, prev, next]);

  /* Блокировка скролла пока открыт лайтбокс */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* Обработчики свайпа */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-block border border-primary/20 text-primary text-xs font-semibold tracking-wider px-3 py-1 rounded-full mb-4">
                Наша яхта
              </div>
              <h2 className="text-4xl md:text-5xl font-serif mb-4">
                Галерея <span className="italic text-primary">OMEGA</span>
              </h2>
              <p className="text-muted-foreground max-w-xl leading-relaxed">
                Живые фотографии с борта и с воды — атмосфера каждой прогулки.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Сетка галереи */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-3 md:gap-4">
          {/* Видео — только на desktop */}
          <ScrollReveal
            delay={0}
            className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300 col-span-2 row-span-1 hidden md:block"
          >
            <button
              className="absolute inset-0 w-full h-full"
              onClick={() => setActiveIdx(-2)}
              data-testid="gallery-item-video"
              aria-label={VIDEO_ITEM.alt}
            >
              <img
                src={VIDEO_ITEM.poster}
                alt={VIDEO_ITEM.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#1a2a3a" stroke="none">
                    <polygon points="8 5 19 12 8 19 8 5" />
                  </svg>
                </div>
              </div>
            </button>
          </ScrollReveal>
          {/* Mobile: обычная фото-карточка вместо видео */}
          <ScrollReveal
            delay={0}
            className="relative rounded-2xl overflow-hidden group cursor-zoom-in shadow-sm hover:shadow-xl transition-shadow duration-300 col-span-2 row-span-1 md:hidden"
          >
            <button
              className="absolute inset-0 w-full h-full"
              onClick={() => setActiveIdx(0)}
              data-testid="gallery-item-mobile"
              aria-label={IMAGES[0].alt}
            >
              <img
                src={IMAGES[0].src}
                alt={IMAGES[0].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
            </button>
          </ScrollReveal>

          {IMAGES.map((img, i) => (
            <ScrollReveal
              key={i}
              delay={(i + 1) * 60}
              className={`relative rounded-2xl overflow-hidden group cursor-zoom-in shadow-sm hover:shadow-xl transition-shadow duration-300
                ${img.wide ? "col-span-2" : ""}
                ${img.tall ? "row-span-2" : ""}
              `}
            >
              <button
                className="absolute inset-0 w-full h-full"
                onClick={() => setActiveIdx(i)}
                data-testid={`gallery-item-${i}`}
                aria-label={img.alt}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Лайтбокс фото */}
      {isOpen && !isVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/85 backdrop-blur-sm"
          onClick={close}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          data-testid="gallery-modal"
        >
          {/* Счётчик */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium tracking-wide z-10">
            {activeIdx + 1} / {total}
          </div>

          {/* Закрыть */}
          <button
            className="absolute top-4 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-10"
            onClick={close}
            data-testid="gallery-close"
            aria-label="Закрыть"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          {/* Стрелка влево */}
          <button
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-all z-10"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            data-testid="gallery-prev"
            aria-label="Предыдущее фото"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          {/* Фото */}
          <div className="px-16 md:px-20 max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={IMAGES[activeIdx].src}
              alt={IMAGES[activeIdx].alt}
              className={`w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl transition-all duration-200 ${fading ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"}`}
            />
            <p className="text-white/50 text-sm text-center mt-3">{IMAGES[activeIdx].alt}</p>
          </div>

          {/* Стрелка вправо */}
          <button
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-all z-10"
            onClick={(e) => { e.stopPropagation(); next(); }}
            data-testid="gallery-next"
            aria-label="Следующее фото"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      )}

      {/* Видео лайтбокс */}
      {isVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/90 backdrop-blur-sm"
          onClick={close}
          data-testid="gallery-video-modal"
        >
          <button
            className="absolute top-4 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-10"
            onClick={close}
            aria-label="Закрыть"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <div className="w-full max-w-4xl px-4 md:px-8" onClick={(e) => e.stopPropagation()}>
            <video
              src={VIDEO_ITEM.src}
              controls
              autoPlay
              className="w-full rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
}
