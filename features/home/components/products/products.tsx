import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FeaturedProductsGrid from "./featured-products-grid";
import { PRODUCTS } from "@/lib/data/products";

const featuredProducts = PRODUCTS.filter((product) => product.featured);

export default function Products() {
    return (
        <section className="w-full bg-white py-20 px-4 sm:px-6 bg-[#EFF6FF] text-[#0F2D52] dark:bg-[#091526] dark:text-[#EFF6FF] transition-colors duration-300 font-sans">
            <div className="max-w-[1220px] mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 motion-safe:animate-fade-up">
                    <div>
                        <span className="inline-block px-3.5 py-1 rounded-full text-[13.5px] font-semibold bg-[#0EA5E9]/15 text-[#1B4F8A] dark:bg-[#0EA5E9]/20 dark:text-[#0EA5E9] mb-3">
                            Catalogo & Formazione
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#0F2D52] dark:text-[#EFF6FF]">
                            Strumenti psicometrici e corsi in evidenza
                        </h2>
                    </div>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-[15.5px] font-semibold text-[#1B4F8A] hover:text-[#0EA5E9] dark:text-[#0EA5E9] dark:hover:text-[#EFF6FF] transition-colors"
                    >
                        Esplora tutto il catalogo
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <FeaturedProductsGrid products={featuredProducts} />
            </div>
        </section>
    );
}
