import ProductCatalog from "./product-catalog";
import { PRODUCT_TYPE_PARAM } from "@/config/products";
import { PRODUCTS } from "@/lib/data/products";
import { getProductsByType, parseProductType } from "@/lib/products";

interface ProductCatalogSectionProps {
    searchParams: PageProps<"/products">["searchParams"];
}

export default async function ProductCatalogSection({ searchParams }: ProductCatalogSectionProps) {
    const type = parseProductType((await searchParams)[PRODUCT_TYPE_PARAM]);
    const products = getProductsByType(PRODUCTS, type);

    return <ProductCatalog key={type} type={type} products={products} />;
}
