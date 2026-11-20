import type { LucideIcon } from "lucide-react";

/** Tarjeta de ventaja/servicio que se muestra bajo el hero. */
export interface HeroFeature {
    id: string;
    icon: LucideIcon;
    title: string;
    description: string;
}
