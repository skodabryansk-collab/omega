export function MobileCTA() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 md:hidden w-[min(95%,440px)]">
      <div className="flex gap-2 w-full bg-white/80 backdrop-blur-md border border-white/60 rounded-full px-2 py-2 shadow-lg shadow-primary/15">
        <button
          onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
          data-testid="button-mobile-book"
          className="flex-1 h-11 rounded-full bg-primary text-white font-semibold text-sm tracking-wide hover:bg-primary/90 transition-all"
        >
          Забронировать
        </button>
        <a
          href="https://t.me/omega360"
          target="_blank"
          rel="noreferrer"
          data-testid="link-mobile-telegram"
          className="flex-1 h-11 rounded-full border border-primary/20 text-primary font-semibold text-sm tracking-wide flex items-center justify-center hover:bg-primary/5 transition-all"
        >
          Telegram
        </a>
      </div>
    </div>
  );
}
