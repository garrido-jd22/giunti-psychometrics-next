import { Suspense } from "react";
import type { Metadata } from "next";
import ProductDetailSection from "@/features/products/components/product-detail/product-detail-section";
import ProductDetailSkeleton from "@/features/products/components/product-detail/product-detail-skeleton";
import { getProductBySlug } from "@/lib/services/product.service";
import { PRODUCTS } from "@/lib/data/products";

export function generateStaticParams() {
    return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
    const product = getProductBySlug((await params).slug);
    return product
        ? { title: product.title, description: product.description }
        : { title: "Prodotto non trovato" };
}

export default function ProductDetailPage({ params }: PageProps<"/products/[slug]">) {
    return (
        <section className="w-full min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 bg-[#EFF6FF] text-[#0F2D52] dark:bg-[#091526] dark:text-[#EFF6FF] transition-colors duration-300 font-sans">
            <div className="max-w-[1220px] mx-auto">
                <Suspense fallback={<ProductDetailSkeleton />}>
                    <ProductDetailSection params={params} />
                </Suspense>
            </div>
        </section>
    );
}
