"use client";

import React from "react";
import Link from "next/link";
import { CONTACT_HREF } from "@/config/contact";
import { Galaxy } from "lucide-react";

const footerLinks = {
    areaClienti: [
        { label: "Aiuto", href: "#" },
        { label: "Contattaci", href: CONTACT_HREF },
        { label: "Condizioni generali di vendita", href: "#" },
        { label: "Resi e Rimborsi", href: "#" },
        { label: "Informativa Privacy", href: "#" },
        { label: "Informativa Cookie", href: "#" },
        { label: "Condizioni Findomestic", href: "#" },
    ],
    giuntiPsychometrics: [
        { label: "Chi siamo", href: "#" },
        { label: "Divisione clinica sul territorio", href: "#" },
        { label: "Lavora con noi", href: "#" },
        {
            label: "Politica integrata parità di genere, ambiente e qualità",
            href: "#",
        },
        { label: "Codice Etico", href: "#" },
        { label: "Mod. 231", href: "#" },
        { label: "Sistema di segnalazione", href: "#" },
    ],
    esplora: [
        { label: "Guida all'acquisto dei test", href: "#" },
        { label: "Catalogo Test", href: "#" },
        { label: "Autori", href: "#" },
        { label: "Docenti", href: "#" },
        { label: "Nesplora", href: "#" },
        { label: "Notizie", href: "#" },
    ],
    corporate: [
        { label: "Giunti Psychometrics Italy", href: "#" },
        { label: "Corporate", href: "#" },
    ],
};

export default function Footer() {
    return (
        <footer className="w-full bg-[#EFF6FF] text-[#0F2D52] dark:bg-[#091526] dark:text-[#EFF6FF] transition-colors duration-300 font-sans border-t border-[#1B4F8A]/10 dark:border-[#EFF6FF]/10">
            <div className="max-w-[1220px] mx-auto px-6 pt-16 pb-10 motion-safe:animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-6 pb-16">
                    <div className="lg:col-span-3 flex flex-col items-start">
                        <Link href="/" className="flex items-center gap-2.5 shrink-0">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1B4F8A] text-white dark:bg-[#EFF6FF] dark:text-[#091526] shrink-0">
                                <Galaxy aria-hidden="true" className="w-5 h-5" strokeWidth={1.8} />
                            </div>
                            <div className="flex flex-col leading-[1.08]">
                                <span className="text-[15px] font-bold tracking-tight text-[#1B4F8A] dark:text-[#EFF6FF]">
                                    Giunti
                                </span>
                                <span className="text-[15px] font-bold tracking-tight text-[#1B4F8A] dark:text-[#EFF6FF]">
                                    Psychometrics
                                </span>
                            </div>
                        </Link>
                        <p className="mt-4 text-[20px] sm:text-[22px] font-bold tracking-tight leading-tight bg-linear-to-r from-[#1B4F8A] to-[#0EA5E9] dark:from-[#EFF6FF] dark:to-[#0EA5E9] bg-clip-text text-transparent">
                            Where Science Meets People
                        </p>
                    </div>

                    <div className="lg:col-span-2">
                        <h3 className="text-[15px] font-semibold mb-4 text-[#0F2D52] dark:text-[#EFF6FF]">
                            Area Clienti
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.areaClienti.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="text-[14.5px] text-[#0F2D52]/75 hover:text-[#0EA5E9] dark:text-[#EFF6FF]/75 dark:hover:text-[#0EA5E9] transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h3 className="text-[15px] font-semibold mb-4 text-[#0F2D52] dark:text-[#EFF6FF]">
                            Giunti Psychometrics
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.giuntiPsychometrics.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="block text-[14.5px] leading-snug text-[#0F2D52]/75 hover:text-[#0EA5E9] dark:text-[#EFF6FF]/75 dark:hover:text-[#0EA5E9] transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h3 className="text-[15px] font-semibold mb-4 text-[#0F2D52] dark:text-[#EFF6FF]">
                            Esplora
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.esplora.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="text-[14.5px] text-[#0F2D52]/75 hover:text-[#0EA5E9] dark:text-[#EFF6FF]/75 dark:hover:text-[#0EA5E9] transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-1">
                        <h3 className="text-[15px] font-semibold mb-4 text-[#0F2D52] dark:text-[#EFF6FF]">
                            Gruppo
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.corporate.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="block text-[14.5px] leading-snug text-[#0F2D52]/75 hover:text-[#0EA5E9] dark:text-[#EFF6FF]/75 dark:hover:text-[#0EA5E9] transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2 flex flex-col items-start lg:items-end justify-start gap-5">
                        <div className="flex items-center gap-4 text-[#0F2D52]/70 dark:text-[#EFF6FF]/70">
                            <Link
                                href="#"
                                aria-label="LinkedIn"
                                className="hover:text-[#0EA5E9] transition-colors"
                            >
                                <svg className="w-[17px] h-[17px] fill-current" viewBox="0 0 24 24">
                                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                                </svg>
                            </Link>

                            <Link
                                href="#"
                                aria-label="Instagram"
                                className="hover:text-[#0EA5E9] transition-colors"
                            >
                                <svg className="w-[17px] h-[17px] fill-current" viewBox="0 0 24 24">
                                    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                                </svg>
                            </Link>

                            <Link
                                href="#"
                                aria-label="YouTube"
                                className="hover:text-[#0EA5E9] transition-colors"
                            >
                                <svg className="w-[19px] h-[19px] fill-current" viewBox="0 0 24 24">
                                    <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
                                </svg>
                            </Link>

                            <Link
                                href="#"
                                aria-label="Facebook"
                                className="hover:text-[#0EA5E9] transition-colors"
                            >
                                <svg className="w-[17px] h-[17px] fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
                                </svg>
                            </Link>
                        </div>

                        <Link
                            href={CONTACT_HREF}
                            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-[15px] font-medium bg-[#1B4F8A]/10 text-[#1B4F8A] hover:bg-[#1B4F8A] hover:text-white dark:bg-[#11223A] dark:text-[#EFF6FF] dark:hover:bg-[#0EA5E9] dark:hover:text-white transition-colors"
                        >
                            Contattaci
                        </Link>
                    </div>
                </div>

                <hr className="border-t border-[#1B4F8A]/15 dark:border-[#EFF6FF]/15" />

                <div className="pt-7 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-[13px] text-[#0F2D52]/65 dark:text-[#EFF6FF]/55">
                    <div className="space-y-1">
                        <p>
                            Copyright © 2026 Giunti Psychometrics Italia S.r.l. | P.IVA
                            07367670481 · Giunti Psychometrics Italia S.r.l., tutti i diritti
                            riservati
                        </p>
                        <p>
                            Responsabile della Protezione dei Dati (Art. 37 del REG UE
                            2016/679) Avv. Victoria Parise{" "}
                            <a
                                href="mailto:privacy@giuntipsy.com"
                                className="hover:text-[#0EA5E9] underline-offset-2 hover:underline transition-colors"
                            >
                                privacy@giuntipsy.com
                            </a>
                        </p>
                    </div>

                    <div className="flex items-center gap-6 shrink-0">
                        <Link
                            href="#"
                            className="hover:text-[#0EA5E9] transition-colors"
                        >
                            Informativa Privacy
                        </Link>
                        <Link
                            href="#"
                            className="hover:text-[#0EA5E9] transition-colors"
                        >
                            Informativa Cookie
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}