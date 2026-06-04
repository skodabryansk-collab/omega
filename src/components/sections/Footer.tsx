export function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="py-12 bg-white border-t border-border/60">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-border/40">
          <div className="space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-2xl tracking-[0.12em] text-foreground font-semibold">OMEGA</span>
              <span className="text-[10px] tracking-widest text-muted-foreground uppercase">Yalta Yachting</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Парусный катамаран для незабываемых путешествий по Ялте и Южному берегу Крыма.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              { id: "yacht", label: "Яхта" },
              { id: "gallery", label: "Галерея" },
              { id: "reviews", label: "Отзывы" },
              { id: "routes", label: "Маршруты" },
              { id: "services", label: "Услуги" },
              { id: "map", label: "Карта" },
              { id: "booking", label: "Бронирование" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <a
              href="https://t.me/omega360"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              data-testid="link-telegram"
            >
              <div className="w-7 h-7 rounded-lg bg-[#29a0d0]/10 flex items-center justify-center text-[#29a0d0] font-bold text-xs">T</div>
              Telegram
            </a>
            <a
              href="https://max.ru/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              data-testid="link-max"
            >
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">M</div>
              MAX
            </a>
            <a
              href="tel:+79788425488"
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              data-testid="link-phone"
            >
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              +7 978 842-54-88
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2026 OMEGA — Аренда яхты в Ялте и Крыму</p>
          <p className="text-xs text-muted-foreground">Французская верфь • Рефит 2025</p>
        </div>
      </div>
    </footer>
  );
}
