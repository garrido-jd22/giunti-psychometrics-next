import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Resource() {
    return <>
        <section className="relative w-full min-h-[520px] flex items-center justify-center px-6 py-20 overflow-hidden bg-[#EFF6FF] text-[#0F2D52] dark:bg-[#091526] dark:text-[#EFF6FF] transition-colors duration-300 font-sans">
            <div
                aria-hidden="true"
                className="absolute -top-24 left-1/2 -translate-x-1/2 w-[540px] h-[280px] rounded-full bg-[#0EA5E9]/15 dark:bg-[#0EA5E9]/20 blur-3xl pointer-events-none"
            />

            <div className="relative z-10 max-w-[780px] w-full mx-auto rounded-[28px] p-8 sm:p-12 bg-white/80 dark:bg-[#11223A]/85 backdrop-blur-md shadow-[0_12px_40px_rgb(15,45,82,0.06)] dark:shadow-[0_12px_40px_rgb(0,0,0,0.3)] flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0EA5E9]/15 dark:bg-[#0EA5E9]/20 text-[#1B4F8A] dark:text-[#0EA5E9] text-[12.5px] font-semibold mb-6">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Pagina in corso di realizzazione</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] leading-[1.12] text-[#0F2D52] dark:text-[#EFF6FF]">
                    Stiamo perfezionando{" "}
                    <span className="text-[#1B4F8A] dark:text-[#0EA5E9]">
                        la nuova esperienza
                    </span>
                </h1>

                <p className="mt-4 text-[14.5px] sm:text-[15.5px] leading-[1.65] text-[#0F2D52]/75 dark:text-[#EFF6FF]/75 max-w-[540px]">
                    Il nostro team sta lavorando per completare questa sezione. Torna a
                    visitarci a breve per scoprire tutte le novità e gli strumenti
                    disponibili.
                </p>

                <div className="w-full max-w-[440px] mt-8">
                    <div className="flex items-center justify-between text-[12px] font-semibold text-[#1B4F8A] dark:text-[#0EA5E9] mb-2">
                        <span>Avanzamento</span>
                        <span>75%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-[#1B4F8A]/10 dark:bg-[#091526]/80 overflow-hidden">
                        <div className="h-full w-3/4 rounded-full bg-[#1B4F8A] dark:bg-[#0EA5E9] transition-all duration-500" />
                    </div>
                </div>

                <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-3 h-11 pl-6 pr-2 rounded-full text-[13.5px] font-semibold text-white bg-[#1B4F8A] hover:bg-[#0EA5E9] transition-colors shadow-sm"
                    >
                        <span>Torna alla home</span>
                        <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                            <ArrowRight className="w-3.5 h-3.5 text-white" />
                        </span>
                    </Link>

                    <Link
                        href="#contatti"
                        className="inline-flex items-center justify-center h-11 px-6 rounded-full text-[13.5px] font-semibold bg-white/80 dark:bg-[#091526]/70 text-[#0F2D52] dark:text-[#EFF6FF] hover:text-[#0EA5E9] dark:hover:text-[#0EA5E9] shadow-xs transition-colors"
                    >
                        Contattaci
                    </Link>
                </div>
            </div>
        </section>
    </>
}