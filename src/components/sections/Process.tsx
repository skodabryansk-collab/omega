import { ScrollReveal } from "../ScrollReveal";

const STEPS = [
  {
    title: "Оставляете заявку",
    desc: "Укажите желаемую дату, маршрут и количество гостей. Мы на связи."
  },
  {
    title: "Подтверждаем детали",
    desc: "Согласуем время, меню и особые пожелания. Вносите предоплату."
  },
  {
    title: "Выходите в море",
    desc: "Встречаемся в порту Ялты и отправляемся в ваше лучшее путешествие."
  }
];

export function Process() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Как забронировать</h2>
            <p className="text-muted-foreground">Три простых шага до вашего путешествия. Мы берем на себя все заботы по организации.</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-24 right-24 h-px bg-border z-0"></div>
          
          {STEPS.map((step, i) => (
            <ScrollReveal key={i} delay={i * 150} className="relative z-10">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-background border-8 border-white shadow-sm flex items-center justify-center text-3xl font-serif text-primary mb-6">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-medium mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
