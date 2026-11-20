import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/services/product.service";
import ProductDetail from "./product-detail";

interface ProductDetailSectionProps {
    params: PageProps<"/products/[slug]">["params"];
}

export default async function ProductDetailSection({ params }: ProductDetailSectionProps) {
    const { slug } = await params;
    const product = getProductBySlug(slug);
    if (!product) notFound();

    return <ProductDetail product={product} />;
}
