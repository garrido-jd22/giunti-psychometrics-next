"use client";

import { useId, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useDrawer } from "@/hooks/use-drawer";
import { cart } from "@/lib/services/cart.service";
import { formatEuro } from "@/lib/products";
import CartItem from "./cart-item";

export default function CartDrawer() {
    const { lines, count, total, isOpen } = useCart();
    const titleId = useId();
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useDrawer(isOpen, cart.close, closeButtonRef);

    return (
        <div className={`fixed inset-0 z-[60] ${isOpen ? "" : "pointer-events-none"}`} inert={!isOpen}>
            <div
                aria-hidden="true"
                onClick={cart.close}
                className={`absolute inset-0 bg-[#091526]/45 backdrop-blur-[2px] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
            />

            <aside
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className={`absolute top-0 right-0 h-full w-full sm:w-[420px] flex flex-col bg-white dark:bg-[#0D1B2F] text-[#0F2D52] dark:text-[#EFF6FF] shadow-[-20px_0_50px_rgb(15,45,82,0.18)] sm:rounded-l-[28px] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <header className="flex items-center justify-between gap-3 px-5 sm:px-6 py-5 border-b border-[#1B4F8A]/10 dark:border-[#EFF6FF]/10">
                    <div className="flex items-center gap-2.5">
                        <h2 id={titleId} className="text-[20px] font-semibold tracking-tight">
                            Il tuo carrello
                        </h2>
                        <span className="min-w-6 h-6 px-2 rounded-full flex items-center justify-center text-[12.5px] font-bold bg-[#0EA5E9]/15 text-[#1B4F8A] dark:text-[#0EA5E9]">
                            {count}
                        </span>
                    </div>
                    <button
                        ref={closeButtonRef}
                        type="button"
                        onClick={cart.close}
                        aria-label="Chiudi carrello"
                        className="w-9 h-9 rounded-full flex items-center justify-center text-[#0F2D52]/70 dark:text-[#EFF6FF]/70 hover:bg-[#EFF6FF] hover:text-[#0EA5E9] dark:hover:bg-[#091526] transition-colors cursor-pointer"
                    >
                        <X aria-hidden="true" className="w-5 h-5" />
                    </button>
                </header>

                {lines.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
                        <span className="w-16 h-16 rounded-full flex items-center justify-center bg-[#EFF6FF] dark:bg-[#091526] text-[#0EA5E9]">
                            <ShoppingBag aria-hidden="true" className="w-7 h-7" strokeWidth={1.6} />
                        </span>
                        <div>
                            <p className="text-[17px] font-semibold">Il carrello è vuoto</p>
                            <p className="mt-1 text-[14px] text-[#0F2D52]/60 dark:text-[#EFF6FF]/60">
                                Aggiungi test o corsi dal catalogo.
                            </p>
                        </div>
                        <Link
                            href="/products"
                            onClick={cart.close}
                            className="inline-flex items-center h-10 px-5 rounded-full text-[14.5px] font-semibold text-white bg-[#1B4F8A] hover:bg-[#0EA5E9] transition-colors"
                        >
                            Esplora il catalogo
                        </Link>
                    </div>
                ) : (
                    <>
                        <ul className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-5 py-4 space-y-3">
                            {lines.map((line) => (
                                <CartItem key={line.product.slug} line={line} />
                            ))}
                        </ul>

                        <footer className="px-5 sm:px-6 py-5 border-t border-[#1B4F8A]/10 dark:border-[#EFF6FF]/10">
                            <div className="flex items-center justify-between text-[14.5px] text-[#0F2D52]/70 dark:text-[#EFF6FF]/70">
                                <span>Prodotti</span>
                                <span>{count}</span>
                            </div>
                            <div className="mt-2 flex items-baseline justify-between">
                                <span className="text-[16px] font-semibold">Totale</span>
                                <span className="text-[22px] font-bold text-[#1B4F8A] dark:text-[#0EA5E9]">
                                    {formatEuro(total)}
                                </span>
                            </div>
                            <div className="mt-5 flex flex-col gap-2.5">
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center gap-2 h-12 rounded-full text-[15.5px] font-semibold text-white bg-[#1B4F8A] hover:bg-[#0EA5E9] shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#091526]"
                                >
                                    Procedi all&apos;acquisto
                                    <ArrowRight aria-hidden="true" className="w-4 h-4" />
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center h-12 rounded-full text-[15.5px] font-semibold text-[#1B4F8A] dark:text-[#EFF6FF] border border-[#1B4F8A]/25 dark:border-[#EFF6FF]/20 hover:bg-[#1B4F8A]/5 dark:hover:bg-[#EFF6FF]/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
                                >
                                    Verifica il carrello
                                </button>
                            </div>
                        </footer>
                    </>
                )}
            </aside>
        </div>
    );
}
