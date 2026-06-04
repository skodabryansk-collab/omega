import { useEffect, useRef, useState } from "react";
import { ScrollReveal } from "../ScrollReveal";

interface BookingForm {
  name: string;
  phone: string;
  date: string;
  guests: string;
  hours: string;
  comment: string;
}

export function Booking() {
  const [form, setForm] = useState<BookingForm>({
    name: "",
    phone: "",
    date: "",
    guests: "4",
    hours: "2",
    comment: "",
  });
  const [sending, setSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const commentRef = useRef<HTMLTextAreaElement>(null);

  /* Слушаем событие выбора маршрута из попапа */
  useEffect(() => {
    const handler = (e: Event) => {
      const routeName = (e as CustomEvent<string>).detail;
      setForm((prev) => ({
        ...prev,
        comment: prev.comment
          ? prev.comment
          : `Маршрут: ${routeName}`,
      }));
      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
    };
    window.addEventListener("omega:selectroute", handler);
    return () => window.removeEventListener("omega:selectroute", handler);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("https://formsubmit.co/ajax/skodabryansk@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          Имя: form.name,
          Телефон: form.phone,
          Дата: form.date,
          Гостей: form.guests,
          Длительность: form.hours + " ч.",
          Комментарий: form.comment || "—",
          _subject: "Новая заявка OMEGA — аренда яхты",
          _template: "table",
        }),
      });
      if (!res.ok) throw new Error("Ошибка сети");
      setShowSuccess(true);
      setForm({ name: "", phone: "", date: "", guests: "4", hours: "2", comment: "" });
    } catch {
      setError("Не удалось отправить. Напишите нам в Telegram напрямую.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="booking" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Левая колонка — текст и контакты */}
          <ScrollReveal direction="right">
            <div className="space-y-8">
              <div>
                <div className="inline-block border border-primary/20 text-primary text-xs font-semibold tracking-wider px-3 py-1 rounded-full mb-4">
                  Бронирование
                </div>
                <h2 className="text-4xl md:text-5xl font-serif mb-4">
                  Забронировать <span className="italic text-primary">OMEGA</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Оставьте контакты и удобную дату — мы свяжемся в течение 10 минут и согласуем все детали.
                </p>
              </div>

              <div className="space-y-5">
                {[
                  { icon: "⟳", title: "Ответ в течение 10 минут", desc: "На связи с раннего утра до позднего вечера." },
                  { icon: "✓", title: "Фиксация даты и маршрута", desc: "Всё согласовываем до внесения оплаты." },
                  { icon: "♦", title: "Оплата после согласования", desc: "Никаких предоплат до обсуждения деталей." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 font-semibold text-sm">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass-panel p-6 rounded-3xl space-y-3">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Или напишите напрямую</p>
                <div className="flex flex-col gap-3">
                  <a href="https://t.me/omega360" target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors font-medium"
                    data-testid="link-tg-booking">
                    <div className="w-9 h-9 rounded-xl bg-[#29a0d0]/10 flex items-center justify-center text-[#29a0d0] text-lg font-bold">T</div>
                    Telegram — @omega360
                  </a>
                  <a href="tel:+79788425488"
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors font-medium"
                    data-testid="link-phone-booking">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    +7 978 842-54-88
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Правая колонка — форма */}
          <ScrollReveal delay={150} direction="left">
            <div className="glass-panel p-8 rounded-3xl shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-5" data-testid="booking-form">
                <h3 className="text-2xl font-serif mb-2">Оставить заявку</h3>
                <p className="text-sm text-muted-foreground mb-4">Пришлём подтверждение на вашу почту и напишем в Telegram</p>

                {/* Имя + Телефон */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Имя</span>
                    <input type="text" name="name" required placeholder="Ваше имя"
                      value={form.name} onChange={handleChange} data-testid="input-name"
                      className="h-11 px-4 rounded-xl border border-border bg-white/70 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all" />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Телефон</span>
                    <input type="tel" name="phone" required placeholder="+7 ..."
                      value={form.phone} onChange={handleChange} data-testid="input-phone"
                      className="h-11 px-4 rounded-xl border border-border bg-white/70 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all" />
                  </label>
                </div>

                {/* Дата + Гости + Длительность */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Желаемая дата</span>
                    <div className="relative">
                      <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <input type="date" name="date" required
                        value={form.date} onChange={handleChange} data-testid="input-date"
                        className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-white/70 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all" />
                    </div>
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Гостей</span>
                    <div className="relative">
                      <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                      <select name="guests" value={form.guests} onChange={handleChange} data-testid="select-guests"
                        className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-white/70 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all appearance-none">
                        {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? "гость" : n < 5 ? "гостя" : "гостей"}</option>
                        ))}
                      </select>
                    </div>
                  </label>
                </div>

                {/* Ползунок длительности аренды */}
                <label className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Длительность аренды</span>
                    <span className="text-sm font-medium">{form.hours || 2} {parseInt(form.hours) === 1 ? "час" : parseInt(form.hours) < 5 ? "часа" : "часов"}</span>
                  </div>
                  <input
                    type="range"
                    name="hours"
                    min={2}
                    max={8}
                    step={1}
                    value={form.hours || 2}
                    onChange={handleChange}
                    className="w-full h-2 bg-primary/10 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </label>

                {/* Комментарий */}
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Пожелания / маршрут</span>
                  <textarea ref={commentRef} name="comment" rows={3}
                    placeholder="Маршрут, повод, особые пожелания..."
                    value={form.comment} onChange={handleChange} data-testid="textarea-comment"
                    className="px-4 py-3 rounded-xl border border-border bg-white/70 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none" />
                </label>

                {/* Сообщение об ошибке */}
                {error && (
                  <p className="text-sm text-destructive bg-destructive/10 rounded-xl px-4 py-3">{error}</p>
                )}

                {/* Кнопка отправки */}
                <button type="submit" disabled={sending} data-testid="button-submit"
                  className="w-full h-12 rounded-full bg-primary text-white font-semibold text-sm tracking-wide hover:bg-primary/90 active:scale-[0.98] disabled:opacity-60 transition-all shadow-lg shadow-primary/20">
                  {sending ? "Отправляем..." : "Отправить заявку"}
                </button>

                <p className="text-xs text-center text-muted-foreground">
                  Заявка придёт нам на email, ответим в течение 10 минут
                </p>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Модальное окно успеха */}
      {showSuccess && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-4"
          onClick={() => setShowSuccess(false)}
          data-testid="success-modal"
        >
          <div
            className="glass-panel bg-white/95 p-10 rounded-3xl max-w-md w-full text-center space-y-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h3 className="text-3xl font-serif">Заявка отправлена!</h3>
            <p className="text-muted-foreground leading-relaxed">
              Мы получили ваш запрос и свяжемся с вами в течение <strong>10 минут</strong> для подтверждения деталей.
            </p>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowSuccess(false)}
                className="flex-1 h-11 rounded-full border border-border text-sm font-semibold hover:bg-muted/50 transition-all">
                Закрыть
              </button>
              <a href="https://t.me/omega360" target="_blank" rel="noreferrer"
                className="flex-1 h-11 rounded-full bg-primary text-white text-sm font-semibold flex items-center justify-center hover:bg-primary/90 transition-all">
                Написать в Telegram
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
