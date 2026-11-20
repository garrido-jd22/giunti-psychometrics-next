import { CONTACT_HREF } from "@/config/contact";
import { PRODUCT_TABS } from "@/config/products";
import type { NavItem } from "@/interfaces/navigation.interface";

const tabHref = (type: string) => PRODUCT_TABS.find((tab) => tab.value === type)!.href;

/** Test y Formazione van a la misma página /products con distinto `?type=`. */
export const NAV_ITEMS: readonly NavItem[] = [
    { label: "Test", href: tabHref("test") },
    { label: "Formazione", href: tabHref("course") },
    { label: "Risorse", href: "/resources" },
    { label: "Contatti", href: CONTACT_HREF },
];
