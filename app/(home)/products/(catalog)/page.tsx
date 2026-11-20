import { Suspense } from "react";
import type { Metadata } from "next";
import ProductGrid from "@/components/product/product-grid";
import ProductCatalogSection from "@/features/products/components/product-catalog-section";
import { PRODUCT_TABS, PRODUCT_TYPE_PARAM } from "@/config/products";
import { parseProductType } from "@/lib/products";

export async function generateMetadata({ searchParams }: PageProps<"/products">): Promise<Metadata> {
    const type = parseProductType((await searchParams)[PRODUCT_TYPE_PARAM]);
    const tab = PRODUCT_TABS.find((t) => t.value === type);
    return { title: `${tab?.label ?? "Catalogo"} · Catalogo Prodotti` };
}

export default function ProductsPage({ searchParams }: PageProps<"/products">) {
    return (
        <Suspense
            fallback={
                <div className="pt-10">
                    <ProductGrid products={[]} isLoading />
                </div>
            }
        >
            <ProductCatalogSection searchParams={searchParams} />
        </Suspense>
    );
}
