"use client";

import type { MouseEvent } from "react";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/interfaces/product.interface";
import { cart } from "@/lib/services/cart.service";
import { toast } from "@/lib/services/toast.service";

interface AddToCartButtonProps {
    product: Product;
    variant?: "pill" | "icon" | "block";
}

const base =
    "inline-flex items-center justify-center shrink-0 font-semibold text-white bg-[#1B4F8A] hover:bg-[#0EA5E9] active:scale-[0.97] transition-[background-color,scale] cursor-pointer";

const variants = {
    pill: "gap-1.5 h-10 px-4 rounded-full text-[14px]",
    icon: "w-9 h-9 rounded-full",
    block: "w-full gap-2 h-12 px-6 rounded-full text-[15.5px] shadow-sm",
};

export default function AddToCartButton({ product, variant = "pill" }: AddToCartButtonProps) {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        cart.add(product.slug);
        toast.success("Aggiunto al carrello", {
            description: product.title,
            duration: 2500,
        });
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            aria-label={variant === "icon" ? `Aggiungi ${product.title} al carrello` : undefined}
            className={`${base} ${variants[variant]}`}
        >
            <ShoppingCart aria-hidden="true" className="w-4 h-4" strokeWidth={variant === "icon" ? 1.8 : 2} />
            {variant !== "icon" && "Aggiungi al carrello"}
        </button>
    );
}
