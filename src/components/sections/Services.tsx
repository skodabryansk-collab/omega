import { ScrollReveal } from "../ScrollReveal";

/* ====== SVG-иконки в стиле сайта (line-style, primary цвет) ====== */

/* День рождения — торт с двумя свечками */
const IconBirthday = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="10" width="18" height="8" rx="2" />
    <path d="M3 13h18" />
    <path d="M8 10V6" />
    <path d="M8 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
    <path d="M16 10V6" />
    <path d="M16 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
  </svg>
);

/* Свадьба — сердце */
const IconWedding = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21l-1-1a7 7 0 0 1-4-6c0-3 2-5 4-5 2 0 3 2 3 2s1-2 3-2c2 0 4 2 4 5a7 7 0 0 1-4 6l-1 1" />
  </svg>
);

/* Мальчишник / девичник — бокалы с шампанским */
const IconParty = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 22h10" />
    <path d="M7 22v-6l-3-8h6" />
    <path d="M17 22v-6l3-8h-6" />
    <path d="M9 8v4" />
    <path d="M15 8v4" />
    <path d="M9 6l1-2" strokeWidth="1.5" />
    <path d="M15 6l-1-2" strokeWidth="1.5" />
    <path d="M10 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2" fill="currentColor" stroke="none" />
    <path d="M14 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2" fill="currentColor" stroke="none" />
  </svg>
);

/* Фотосессия — фотоаппарат с линзой */
const IconPhoto = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="6" width="18" height="14" rx="2" />
    <circle cx="12" cy="13" r="3" />
    <path d="M8 6l2-3h4l2 3" />
    <circle cx="17" cy="9" r="0.5" fill="currentColor" />
  </svg>
);

/* Патио — шезлонг */
const IconPatio = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 16h12" />
    <path d="M6 16V9l4-3" />
    <path d="M18 16V9l-4-3" />
    <path d="M6 12h12" />
  </svg>
);

/* BBQ — мангал с шашлыками */
const IconBBQ = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v8" />
    <path d="M5 10h14" />
    <path d="M5 10v4" />
    <path d="M19 10v4" />
    <path d="M12 10v6" />
    <path d="M8 20h8" />
  </svg>
);

/* Каюты — кровать с подушкой */
const IconCabins = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 20h18" />
    <path d="M5 20v-6l4-4h6l4 4v6" />
    <path d="M10 14v-4h4v4" />
  </svg>
);

/* Сапборд — доска с веслом */
const IconPaddle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="14" width="16" height="6" rx="3" />
    <path d="M12 3v10" />
    <path d="M10 5h4" />
  </svg>
);

/* Носовые сетки — гамак на балках */
const IconNets = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 8h16" />
    <path d="M4 8v4" />
    <path d="M20 8v4" />
    <path d="M6 12h12v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4v-4Z" />
    <path d="M12 16v-4" />
    <path d="M8 12v4" />
    <path d="M16 12v4" />
  </svg>
);

/* До 10 гостей — двое людей */
const IconGuests = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const EVENTS = [
  { icon: IconBirthday, title: "Дни рождения", desc: "Отмечайте день на открытой воде — мы создадим атмосферу." },
  { icon: IconWedding, title: "Свадебные торжества", desc: "Фотосессии, банкет, прогулка по закату." },
  { icon: IconParty, title: "Мальчишники и девичники", desc: "Проведите последний вечер в кругу друзей — без лишних глаз." },
  { icon: IconPhoto, title: "Фотосессии", desc: "Паруса, море, закат — идеальный фон для вашей съёмки." },
];

const AMENITIES = [
  { icon: IconPatio, title: "Огромное патио", desc: "В тени для комфортного отдыха." },
  { icon: IconBBQ, title: "Камбуз с BBQ", desc: "Большая кухня для пикника на воде." },
  { icon: IconCabins, title: "3 каюты, 2 санузла", desc: "С душем для комфорта всех гостей." },
  { icon: IconPaddle, title: "Сапборды", desc: "Включены в аренду — активности на воде." },
  { icon: IconNets, title: "Носовые сетки", desc: "Две сетки для загара прямо над водой." },
  { icon: IconGuests, title: "До 10 гостей", desc: "Достаточно места для большой компании." },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Заголовок */}
        <ScrollReveal>
          <div className="max-w-2xl mb-14">
            <div className="inline-block border border-primary/20 text-primary text-xs font-semibold tracking-wider px-3 py-1 rounded-full mb-4">
              Что предлагаем
            </div>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">
              Услуги <span className="italic text-primary">и форматы</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Морские приключения от 2-х часовых прогулок до полноценных путешествий из Ялты.
            </p>
          </div>
        </ScrollReveal>

        {/* Ваш праздник на борту */}
        <div className="mb-16">
          <ScrollReveal>
            <h3 className="text-xl font-serif font-medium mb-6 text-foreground/80">
              Ваш праздник на нашей яхте (до 10 человек)
            </h3>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {EVENTS.map((e, i) => {
              const Icon = e.icon;
              return (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="relative p-6 rounded-2xl border border-border/60 bg-background group hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 h-full flex flex-col gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                      <Icon />
                    </div>
                    <h4 className="text-lg font-serif font-medium group-hover:text-primary transition-colors">{e.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">{e.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* На борту для вас */}
        <div>
          <ScrollReveal>
            <h3 className="text-xl font-serif font-medium mb-6 text-foreground/80">
              К вашим услугам
            </h3>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AMENITIES.map((a, i) => {
              const Icon = a.icon;
              return (
                <ScrollReveal key={i} delay={i * 80}>
                  <div className="flex gap-4 p-5 rounded-2xl border border-border/60 bg-background hover:border-primary/30 hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Icon />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">{a.title}</h4>
                      <p className="text-muted-foreground text-sm">{a.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
