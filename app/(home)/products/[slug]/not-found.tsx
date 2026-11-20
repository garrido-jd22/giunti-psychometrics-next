import Link from "next/link";
import { SearchX } from "lucide-react";

export default function ProductNotFound() {
    return (
        <section className="w-full min-h-[70vh] pt-32 pb-20 px-4 sm:px-6 flex flex-col items-center justify-center gap-4 text-center bg-[#EFF6FF] text-[#0F2D52] dark:bg-[#091526] dark:text-[#EFF6FF]">
            <SearchX aria-hidden="true" className="w-10 h-10 text-[#0EA5E9]" strokeWidth={1.6} />
            <h1 className="text-[26px] font-semibold tracking-tight">Prodotto non trovato</h1>
            <p className="text-[15.5px] text-[#0F2D52]/65 dark:text-[#EFF6FF]/65">
                Il prodotto che cerchi non esiste o non è più disponibile.
            </p>
            <Link
                href="/products"
                className="mt-2 inline-flex items-center h-11 px-6 rounded-full text-[15px] font-semibold text-white bg-[#1B4F8A] hover:bg-[#0EA5E9] transition-colors"
            >
                Torna al catalogo
            </Link>
        </section>
    );
}
