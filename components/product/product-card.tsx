import { memo } from "react";
import Link from "next/link";
import { ArrowRight, Bookmark, Calendar, Users } from "lucide-react";
import AddToCartButton from "@/components/cart/add-to-cart-button";
import type { Product } from "@/interfaces/product.interface";
import { formatDate, formatEuro, getInitials, getProductHref } from "@/lib/products";

interface ProductCardProps {
    product: Product;
}

function ProductCard({ product }: ProductCardProps) {
    const { meta } = product;
    const href = getProductHref(product.slug);

    return (
        <article className="group relative flex flex-col justify-between rounded-[24px] p-4 bg-white/80 dark:bg-[#11223A]/85 backdrop-blur-md shadow-[0_8px_30px_rgb(15,45,82,0.05)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.25)] hover:shadow-[0_14px_38px_rgb(27,79,138,0.12)] transition-all duration-300">
            <div>
                <div className="relative w-full h-52 rounded-[18px] overflow-hidden bg-[#1B4F8A]/10">
                    {/* eslint-disable-next-line @next/next/no-img-element -- imágenes de ejemplo externas */}
                    <img
                        src={product.image}
                        alt={product.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <span className="absolute top-3 left-3 px-3.5 py-1.5 rounded-full text-[13px] font-semibold bg-[#EFF6FF]/85 dark:bg-[#091526]/80 text-[#1B4F8A] dark:text-[#0EA5E9] backdrop-blur-md shadow-xs">
                        {product.format}
                    </span>

                    <button
                        type="button"
                        aria-label="Salva nei preferiti"
                        className="absolute z-10 top-3 right-3 w-9 h-9 rounded-2xl flex items-center justify-center bg-[#0F2D52]/75 hover:bg-[#0EA5E9] text-white backdrop-blur-md transition-colors cursor-pointer"
                    >
                        <Bookmark className="w-4 h-4" strokeWidth={1.9} />
                    </button>

                    <div className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-2xl bg-white/90 dark:bg-[#091526]/85 backdrop-blur-md shadow-sm flex items-baseline gap-2">
                        {product.originalPrice !== undefined && (
                            <span className="text-[13px] line-through text-[#0F2D52]/50 dark:text-[#EFF6FF]/45">
                                {formatEuro(product.originalPrice)}
                            </span>
                        )}
                        <span className="text-[16px] font-bold text-[#1B4F8A] dark:text-[#0EA5E9]">
                            {formatEuro(product.price)}
                        </span>
                    </div>
                </div>

                <div className="px-1.5 pt-5">
                    <h3 className="text-[19px] font-bold leading-snug text-[#0F2D52] dark:text-[#EFF6FF] group-hover:text-[#1B4F8A] dark:group-hover:text-[#0EA5E9] transition-colors line-clamp-2">
                        {/* ::after cubre toda la tarjeta y la hace clicable */}
                        <Link href={href} className="after:absolute after:inset-0 after:rounded-[24px] focus:outline-none focus-visible:after:ring-2 focus-visible:after:ring-[#0EA5E9]">
                            {product.title}
                        </Link>
                    </h3>

                    <p className="mt-2 text-[14.5px] leading-relaxed text-[#0F2D52]/70 dark:text-[#EFF6FF]/70 line-clamp-2">
                        {product.description}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-2 text-[14px] font-medium text-[#0F2D52]/85 dark:text-[#EFF6FF]/85">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] dark:bg-[#091526]/70">
                            {meta.type === "age" ? (
                                <>
                                    <Users className="w-3.5 h-3.5 text-[#0EA5E9]" />
                                    {meta.label}
                                </>
                            ) : (
                                <>
                                    <Calendar className="w-3.5 h-3.5 text-[#0EA5E9]" />
                                    <time dateTime={meta.startDate}>
                                        Inizio: {formatDate(meta.startDate)}
                                    </time>
                                </>
                            )}
                        </span>
                    </div>
                </div>
            </div>

            <div className="px-1.5 pt-5 mt-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#1B4F8A]/15 dark:bg-[#0EA5E9]/20 text-[#1B4F8A] dark:text-[#0EA5E9] font-bold text-[12px] flex items-center justify-center shrink-0">
                        {getInitials(product.author)}
                    </div>
                    <div className="min-w-0">
                        <p className="text-[14px] font-semibold text-[#0F2D52] dark:text-[#EFF6FF] truncate">
                            {product.author}
                        </p>
                        <p className="text-[12.5px] text-[#0F2D52]/55 dark:text-[#EFF6FF]/55">
                            {product.authorRole}
                        </p>
                    </div>
                </div>

                <div className="relative z-10">
                    {product.actionType === "cart" ? (
                        <AddToCartButton product={product} />
                    ) : (
                        <Link
                            href={href}
                            className="inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-full text-[14px] font-semibold text-white bg-[#1B4F8A] hover:bg-[#0EA5E9] transition-colors shrink-0"
                        >
                            Scopri di più
                            <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
                        </Link>
                    )}
                </div>
            </div>
        </article>
    );
}

export default memo(ProductCard);
