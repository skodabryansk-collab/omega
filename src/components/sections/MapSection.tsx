import { useEffect, useRef, useState } from "react";
import { ScrollReveal } from "../ScrollReveal";

const OMEGA_COORDS: [number, number] = [44.495542, 34.167116];

/* Загрузка Yandex Maps API динамически */
function loadYandexMaps(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && (window as any).ymaps) {
      resolve((window as any).ymaps);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
    script.async = true;
    script.onload = () => {
      (window as any).ymaps.ready(() => {
        resolve((window as any).ymaps);
      });
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export function MapSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [yandexMap, setYandexMap] = useState<any>(null);

  useEffect(() => {
    let destroyed = false;

    loadYandexMaps()
      .then((ymaps) => {
        if (destroyed || !mapRef.current) return;

        const map = new ymaps.Map(mapRef.current, {
          center: OMEGA_COORDS,
          zoom: 16,
          controls: ["zoomControl", "typeSelector"],
        });

        // Стили карты
        map.behaviors.disable("scrollZoom");

        // Маркер OMEGA
        const placemark = new ymaps.Placemark(
          OMEGA_COORDS,
          {
            hintContent: "OMEGA — аренда яхты",
            balloonContent: `
              <div style="font-family:system-ui,sans-serif;padding:4px;text-align:center">
                <strong style="font-size:15px;color:#1e3a5f">ОМЕГА</strong><br/>
                <span style="font-size:12px;color:#666">Причал у морского вокзала</span>
              </div>
            `,
          },
          {
            preset: "islands#darkBlueCircleDotIcon",
            iconColor: "#1e3a5f",
          }
        );

        map.geoObjects.add(placemark);
        placemark.balloon.open();

        setYandexMap(map);
      })
      .catch(() => {
        // Yandex API без ключа — подавляем ошибку в консоли
      });

    return () => {
      destroyed = true;
      if (yandexMap) {
        yandexMap.destroy();
      }
    };
  }, []);

  return (
    <section id="map" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="max-w-2xl mb-10">
            <div className="inline-block border border-primary/20 text-primary text-xs font-semibold tracking-wider px-3 py-1 rounded-full mb-4">
              Где мы находимся
            </div>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">
              Место <span className="italic text-primary">стоянки</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Катамаран OMEGA базируется в Ялте — на причале у морского вокзала.
              Забрать вас могут прямо от причала или от пляжа.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="relative rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-white">
            {/* Yandex карта */}
            <div
              ref={mapRef}
              style={{ height: 450, width: "100%" }}
            />

            {/* Карточка под картой */}
            <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif font-medium text-lg mb-1">
                    Причал у морского вокзала, Ялта
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Крым, г. Ялта, набережная им. Ленина, у причала.
                    Встреча у пирса — скажите, что на OMEGA.
                  </p>
                </div>
              </div>
              <a
                href="https://yandex.ru/maps/-/CPXGeH-k"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors shrink-0"
              >
                Открыть в Яндекс.Картах
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
