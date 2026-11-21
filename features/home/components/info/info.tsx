"use client";

import Link from "next/link";
import { BrainCircuit } from "lucide-react";

export default function Info() {
    return (
        <section className="w-full py-12 px-6 bg-[#EFF6FF] text-[#0F2D52] dark:bg-[#091526] dark:text-[#EFF6FF] transition-colors duration-300 font-sans">
            <div className="max-w-[1220px] mx-auto">
                <div className="relative w-full min-h-[420px] sm:min-h-[480px] rounded-[28px] overflow-hidden shadow-[0_12px_40px_rgb(15,45,82,0.08)] dark:shadow-[0_12px_40px_rgb(0,0,0,0.35)] flex items-center justify-center">
                    <img
                        src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1600&q=80"
                        alt="Consulenza e valutazione clinica Giunti Psychometrics"
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    />

                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[#0F2D52]/55 dark:bg-[#091526]/65 backdrop-blur-[2px] pointer-events-none"
                    />

                    <div className="relative z-10 max-w-[780px] mx-auto px-6 py-12 flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/15 dark:bg-[#11223A]/75 backdrop-blur-md mb-5">
                            <BrainCircuit
                                className="w-5 h-5 text-[#0EA5E9] shrink-0"
                                strokeWidth={1.8}
                            />
                            <span className="text-[13px] font-bold tracking-tight leading-none text-[#EFF6FF]">
                                Giunti Psychometrics
                            </span>
                        </div>

                        <h2 className="text-2xl sm:text-4xl md:text-[42px] font-semibold tracking-[-0.025em] leading-[1.18] text-[#EFF6FF]">
                            Dalla valutazione al trattamento,
                            <br />
                            affidati a test validati clinicamente.
                        </h2>

                        <div className="mt-7">
                            <Link
                                href="#"
                                className="inline-flex items-center justify-center h-11 px-7 rounded-full text-[13.5px] font-semibold text-white bg-[#1B4F8A] hover:bg-[#0EA5E9] shadow-sm transition-colors"
                            >
                                Esplora i test per la clinica
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}