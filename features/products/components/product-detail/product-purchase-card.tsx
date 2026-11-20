import Link from "next/link";
import { ArrowLeft, CircleCheck } from "lucide-react";
import AddToCartButton from "@/components/cart/add-to-cart-button";
import { PRODUCT_PERKS, PRODUCT_TABS } from "@/config/products";
import type { Product } from "@/interfaces/product.interface";
import { formatEuro, getDiscountPercent } from "@/lib/products";

interface ProductPurchaseCardProps {
    product: Product;
}

export default function ProductPurchaseCard({ product }: ProductPurchaseCardProps) {
    const discount = getDiscountPercent(product);
    const backHref = PRODUCT_TABS.find((tab) => tab.value === product.type)?.href ?? "/products";

    return (
        <div className="rounded-[28px] p-6 sm:p-7 bg-white/85 dark:bg-[#11223A]/85 backdrop-blur-md shadow-[0_10px_35px_rgb(15,45,82,0.08)] dark:shadow-[0_10px_35px_rgb(0,0,0,0.3)]">
            <p className="text-[14px] font-medium text-[#0F2D52]/60 dark:text-[#EFF6FF]/60">Prezzo</p>

            <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-[34px] font-bold tracking-tight text-[#1B4F8A] dark:text-[#0EA5E9]">
                    {formatEuro(product.price)}
                </span>
                {product.originalPrice !== undefined && (
                    <span className="text-[16px] line-through text-[#0F2D52]/45 dark:text-[#EFF6FF]/45">
                        {formatEuro(product.originalPrice)}
                    </span>
                )}
                {discount !== null && (
                    <span className="px-2.5 py-0.5 rounded-full text-[13px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">
                        -{discount}%
                    </span>
                )}
            </div>
            <p className="mt-1 text-[13px] text-[#0F2D52]/55 dark:text-[#EFF6FF]/55">IVA inclusa</p>

            <div className="mt-6">
                <AddToCartButton product={product} variant="block" />
            </div>

            <ul className="mt-6 pt-6 space-y-3 border-t border-[#1B4F8A]/10 dark:border-[#EFF6FF]/10">
                {PRODUCT_PERKS[product.type].map((perk) => (
                    <li key={perk} className="flex items-center gap-2.5 text-[14.5px] text-[#0F2D52]/80 dark:text-[#EFF6FF]/80">
                        <CircleCheck aria-hidden="true" className="w-4.5 h-4.5 shrink-0 text-[#0EA5E9]" />
                        {perk}
                    </li>
                ))}
            </ul>

            <Link
                href={backHref}
                className="mt-6 inline-flex items-center gap-2 text-[14.5px] font-semibold text-[#1B4F8A] hover:text-[#0EA5E9] dark:text-[#0EA5E9] dark:hover:text-[#EFF6FF] transition-colors"
            >
                <ArrowLeft aria-hidden="true" className="w-4 h-4" />
                Torna al catalogo
            </Link>
        </div>
    );
}
