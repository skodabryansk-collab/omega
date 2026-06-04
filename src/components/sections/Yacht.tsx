import { ScrollReveal } from "../ScrollReveal";
import yachtImg from "@assets/gal-01_1780416774585.jpg";

export function Yacht() {
  return (
    <section id="yacht" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="right">
            <div className="space-y-8">
              <div className="inline-block border border-primary/20 text-primary text-xs font-semibold tracking-wider px-3 py-1 rounded-full">
                Французская верфь
              </div>
              <h2 className="text-4xl md:text-5xl font-serif">О яхте <span className="italic text-primary">OMEGA</span></h2>
              <div className="prose prose-lg text-muted-foreground">
                <p>
                  ⛵️ Катамаран <strong>Indigo Aventura</strong> (Франция), 11 метров (36 ft). Морские приключения от 2-х часовых прогулок до полноценных путешествий из Ялты.
                </p>
                <p>
                  Широкий корпус катамарана обеспечивает невероятную устойчивость на волне — никакой качки, только плавное скольжение. На борту достаточно места для отдыха: огромное патио в тени, большой камбуз с BBQ, 3 каюты, 2 санузла с душем, много пространства для загара и носовые сетки прямо над водой.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6">
                {[
                  { label: "Модель", value: "Indigo Aventura" },
                  { label: "Длина", value: "11 м (36 ft)" },
                  { label: "Верфь", value: "Франция" },
                  { label: "Гостей", value: "до 10" },
                  { label: "Каюты", value: "3" },
                  { label: "Порт", value: "Ялта" }
                ].map((spec, i) => (
                  <div key={i} className="bg-white/50 border border-white p-4 rounded-2xl text-center shadow-sm">
                    <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">{spec.label}</div>
                    <div className="text-lg font-serif font-medium text-foreground">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} direction="left" className="h-full">
            <div className="relative h-full min-h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src={yachtImg}
                alt="Катамаран OMEGA в море"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-primary/10 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-serif text-2xl font-medium">OMEGA</p>
                <p className="text-white/80 text-sm">Ялта — аренда яхты</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
