import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { OmegaLogo } from "@/components/OmegaLogo";

/* SVG иконки */
const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const TelegramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.2 2.9L2.1 11.3c-1.3.6-1.3 1.4-.2 1.8l4.7 1.5 10.8-6.8c.5-.3 1 0 .6.4l-8.7 7.9-.3 4.1c.5 0 .7-.2.9-.5l2.1-2.1 4.4 3.2c.8.4 1.4.2 1.6-.7l3.2-15.2c.3-1.2-.4-1.8-1.4-1.3z" />
  </svg>
);

const NAV_ITEMS = [
  { id: "yacht", label: "\u042f\u0445\u0442\u0430" },
  { id: "gallery", label: "\u0413\u0430\u043b\u0435\u0440\u0435\u044f" },
  { id: "reviews", label: "\u041e\u0442\u0437\u044b\u0432\u044b" },
  { id: "services", label: "\u0423\u0441\u043b\u0443\u0433\u0438" },
  { id: "routes", label: "\u041c\u0430\u0440\u0448\u0440\u0443\u0442\u044b" },
  { id: "map", label: "\u041a\u0430\u0440\u0442\u0430" },
  { id: "booking", label: "\u0411\u0440\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Блокировка скролла при открытом меню */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "py-3 glass-panel shadow-sm" : "py-5 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <button
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setMenuOpen(false); }}
            data-testid="logo-button"
          >
            <OmegaLogo size={36} />
            <div className="flex flex-col items-start leading-none">
              <span className="font-serif text-[1.35rem] tracking-[0.12em] text-foreground font-semibold group-hover:text-primary/80 transition-colors">
                OMEGA
              </span>
              <span className="text-[9px] tracking-[0.22em] text-muted-foreground uppercase hidden md:inline-block mt-0.5">
                Yalta Yachting
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors tracking-wide"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Desktop: contacts + book button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+79788425488"
              className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
              data-testid="link-phone-header"
            >
              <PhoneIcon />
              <span>+7 978 842-54-88</span>
            </a>
            <a
              href="https://t.me/omega360"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-[#29a0d0] hover:text-[#1e7ba3] transition-colors"
              data-testid="link-tg-header"
            >
              <TelegramIcon />
              <span>Telegram</span>
            </a>
            <Button
              onClick={() => scrollTo("booking")}
              className="hidden md:inline-flex tracking-wide"
              data-testid="button-book-header"
            >
              Забронировать
            </Button>
          </div>

          {/* Mobile: phone + burger */}
          <div className="flex items-center gap-3 md:hidden">
            <a
              href="tel:+79788425488"
              className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center"
              aria-label="По\u0437\u0432\u043e\u043d\u0438\u0442\u044c"
              data-testid="link-phone-mobile"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
              aria-label="Меню"
            >
              {menuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="6" x2="20" y2="6"></line>
                  <line x1="4" y1="12" x2="20" y2="12"></line>
                  <line x1="4" y1="18" x2="20" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/80 backdrop-blur-sm md:hidden" onClick={() => setMenuOpen(false)}>
          <div
            className="absolute top-20 right-4 left-4 bg-white rounded-3xl shadow-2xl p-6 space-y-1"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-border/40">
              <span className="font-serif text-lg font-medium">Навигация</span>
              <button onClick={() => setMenuOpen(false)} className="w-8 h-8 flex items-center justify-center text-muted-foreground">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>
                </svg>
              </button>
            </div>
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="w-full text-left py-3 px-4 rounded-xl text-foreground font-medium hover:bg-primary/5 transition-colors"
              >
                {label}
              </button>
            ))}
            <div className="pt-4 border-t border-border/40 mt-2">
              <Button
                onClick={() => scrollTo("booking")}
                className="w-full h-12 rounded-full text-base"
              >
                Забронировать
              </Button>
              <div className="flex gap-3 mt-3">
                <a
                  href="tel:+79788425488"
                  className="flex-1 flex items-center justify-center gap-2 h-11 rounded-full border border-border text-sm font-medium hover:bg-primary/5 transition-colors"
                >
                  <PhoneIcon /> По\u0437\u0432\u043e\u043d\u0438\u0442\u044c
                </a>
                <a
                  href="https://t.me/omega360"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 h-11 rounded-full border border-border text-sm font-medium text-[#29a0d0] hover:bg-primary/5 transition-colors"
                >
                  <TelegramIcon /> Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
