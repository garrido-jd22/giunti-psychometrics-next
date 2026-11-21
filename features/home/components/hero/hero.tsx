import Link from "next/link";
import { HERO_FEATURES } from "@/lib/data/hero-features";
import HeroFeatures from "./hero-features";

export default function Hero() {
    // Desktop: el video cubre las filas 1-2 y las tarjetas 2-3 (mitad encima). Mobile/tablet: sin superponer.
    return (
        <section className="relative grid grid-cols-1 grid-rows-[auto_1fr_1fr] bg-white dark:bg-[#091526] transition-colors duration-300">
            <div
                aria-hidden="true"
                className="col-start-1 row-start-1 row-end-2 lg:row-end-3 relative overflow-hidden rounded-b-[30px] bg-[#EFF6FF] dark:bg-[#091526] transition-colors duration-300"
            >
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                >
                    <source src="/videos/gradient.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[#EFF6FF]/55 dark:bg-[#091526]/65" />
            </div>

            <div className="col-start-1 row-start-1 relative z-10 min-h-[520px] sm:min-h-[600px] max-w-[980px] w-full mx-auto px-4 sm:px-6 pt-32 pb-12 sm:pb-16 flex flex-col items-center justify-center text-center">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/85 dark:bg-[#091526]/80 backdrop-blur-sm border border-[#1B4F8A]/15 dark:border-[#EFF6FF]/15 shadow-xs mb-7 motion-safe:animate-fade-down">
                    <div className="flex -space-x-2">
                        <span className="w-6 h-6 rounded-full bg-[#1B4F8A] text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-[#091526]">
                            GP
                        </span>
                        <span className="w-6 h-6 rounded-full bg-[#0EA5E9] text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-[#091526]">
                            IT
                        </span>
                        <span className="w-6 h-6 rounded-full bg-[#0F2D52] text-[#EFF6FF] text-[11px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-[#091526]">
                            +
                        </span>
                    </div>
                    <span className="text-[14px] font-semibold text-[#0F2D52] dark:text-[#EFF6FF]">
                        10k+ professionisti
                    </span>
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-[68px] font-medium tracking-[-0.03em] leading-[1.08] text-[#0F2D52] dark:text-[#EFF6FF] mb-5 motion-safe:animate-fade-down motion-safe:[animation-delay:120ms]">
                    Inventario di Valutazione Clinica e della Personalità
                </h1>

                <p className="max-w-[640px] mx-auto mb-5 text-[17px] sm:text-[18px] text-[#0F2D52]/85 dark:text-[#EFF6FF]/85 motion-safe:animate-fade-up motion-safe:[animation-delay:300ms]">
                    Disponibile la nuova edizione del questionario per la valutazione clinica della personalità e della psicopatologia negli adulti.
                </p>
                <div className="mt-1 motion-safe:animate-fade-up motion-safe:[animation-delay:450ms]">
                    <Link
                        href="/products"
                        className="inline-flex items-center justify-center h-11 px-7 rounded-full text-[15.5px] font-medium text-[#EFF6FF] bg-[#1B4F8A] hover:bg-[#0EA5E9] dark:bg-[#1B4F8A] dark:hover:bg-[#0EA5E9] shadow-sm transition-colors"
                    >
                        Esplora il catalogo
                    </Link>
                </div>
            </div>

            <div className="col-start-1 row-start-2 row-end-4 relative z-20 mt-6 sm:mt-8 lg:mt-0 px-4 sm:px-6">
                <HeroFeatures features={HERO_FEATURES} />
            </div>
        </section>
    );
}
