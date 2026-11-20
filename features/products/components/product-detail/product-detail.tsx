import Link from "next/link";
import { Calendar, ChevronRight, Layers, Tag, UserRound, Users, type LucideIcon } from "lucide-react";
import { PRODUCT_TABS } from "@/config/products";
import type { Product } from "@/interfaces/product.interface";
import { formatDate, getInitials } from "@/lib/products";
import ProductPurchaseCard from "./product-purchase-card";

interface ProductDetailProps {
    product: Product;
}

function InfoRow({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: React.ReactNode }) {
    return (
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/70 dark:bg-[#11223A]/70">
            <span className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center bg-[#0EA5E9]/12 text-[#1B4F8A] dark:text-[#0EA5E9]">
                <Icon aria-hidden="true" className="w-[18px] h-[18px]" />
            </span>
            <div className="min-w-0">
                <dt className="text-[13px] text-[#0F2D52]/55 dark:text-[#EFF6FF]/55">{label}</dt>
                <dd className="text-[15px] font-semibold text-[#0F2D52] dark:text-[#EFF6FF]">{children}</dd>
            </div>
        </div>
    );
}

export default function ProductDetail({ product }: ProductDetailProps) {
    const tab = PRODUCT_TABS.find((t) => t.value === product.type);
    const { meta } = product;

    return (
        <>
            <nav aria-label="Percorso" className="motion-safe:animate-fade-down">
                <ol className="flex flex-wrap items-center gap-1.5 text-[14px] text-[#0F2D52]/60 dark:text-[#EFF6FF]/60">
                    <li>
                        <Link href="/products" className="hover:text-[#0EA5E9] transition-colors">
                            Catalogo
                        </Link>
                    </li>
                    <li className="flex items-center gap-1.5">
                        <ChevronRight aria-hidden="true" className="w-3.5 h-3.5" />
                        <Link href={tab?.href ?? "/products"} className="hover:text-[#0EA5E9] transition-colors">
                            {tab?.label}
                        </Link>
                    </li>
                    <li aria-current="page" className="flex items-center gap-1.5 min-w-0 font-medium text-[#0F2D52] dark:text-[#EFF6FF]">
                        <ChevronRight aria-hidden="true" className="w-3.5 h-3.5 shrink-0 text-[#0F2D52]/60 dark:text-[#EFF6FF]/60" />
                        <span className="line-clamp-1">{product.title}</span>
                    </li>
                </ol>
            </nav>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-8 lg:gap-10 items-start">
                <article className="min-w-0 motion-safe:animate-fade-up">
                    <div className="relative w-full h-60 sm:h-80 lg:h-[400px] rounded-[28px] overflow-hidden bg-[#1B4F8A]/10">
                        {/* eslint-disable-next-line @next/next/no-img-element -- imágenes de ejemplo externas */}
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full text-[13px] font-semibold bg-[#1B4F8A] text-white dark:bg-[#0EA5E9] dark:text-[#091526]">
                            {tab?.label}
                        </span>
                        <span className="px-3 py-1 rounded-full text-[13px] font-semibold bg-[#0EA5E9]/15 text-[#1B4F8A] dark:text-[#0EA5E9]">
                            {product.format}
                        </span>
                        <span className="px-3 py-1 rounded-full text-[13px] font-medium bg-white/80 dark:bg-[#11223A]/80 text-[#0F2D52]/75 dark:text-[#EFF6FF]/75">
                            {product.category}
                        </span>
                    </div>

                    <h1 className="mt-4 text-[28px] sm:text-[36px] lg:text-[40px] font-semibold tracking-tight leading-[1.12] text-[#0F2D52] dark:text-[#EFF6FF]">
                        {product.title}
                    </h1>

                    <p className="mt-4 text-[16px] sm:text-[17px] leading-relaxed text-[#0F2D52]/75 dark:text-[#EFF6FF]/75">
                        {product.description}
                    </p>

                    <h2 className="mt-8 text-[18px] font-semibold text-[#0F2D52] dark:text-[#EFF6FF]">Dettagli</h2>
                    <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <InfoRow icon={UserRound} label={product.authorRole}>
                            <span className="inline-flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-[#1B4F8A]/15 dark:bg-[#0EA5E9]/20 text-[#1B4F8A] dark:text-[#0EA5E9] text-[10.5px] font-bold flex items-center justify-center">
                                    {getInitials(product.author)}
                                </span>
                                {product.author}
                            </span>
                        </InfoRow>
                        {meta.type === "age" ? (
                            <InfoRow icon={Users} label="Fascia d'età">
                                {meta.label}
                            </InfoRow>
                        ) : (
                            <InfoRow icon={Calendar} label="Data di inizio">
                                <time dateTime={meta.startDate}>{formatDate(meta.startDate)}</time>
                            </InfoRow>
                        )}
                        <InfoRow icon={Layers} label="Formato">
                            {product.format}
                        </InfoRow>
                        <InfoRow icon={Tag} label="Categoria">
                            {product.category}
                        </InfoRow>
                    </dl>
                </article>

                <aside className="lg:sticky lg:top-28 motion-safe:animate-fade-up motion-safe:[animation-delay:150ms]">
                    <ProductPurchaseCard product={product} />
                </aside>
            </div>
        </>
    );
}
