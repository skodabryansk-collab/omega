import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Yacht } from "@/components/sections/Yacht";
import { Gallery } from "@/components/sections/Gallery";
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";
import { Routes } from "@/components/sections/Routes";
import { Process } from "@/components/sections/Process";
import { MapSection } from "@/components/sections/MapSection";
import { Booking } from "@/components/sections/Booking";
import { Footer } from "@/components/sections/Footer";
import { MobileCTA } from "@/components/MobileCTA";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Yacht />
        <Gallery />
        <Reviews />
        <Services />
        <Routes />
        <Process />
        <MapSection />
        <Booking />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}
