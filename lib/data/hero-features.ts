import { BadgeCheck, ClipboardList, Globe, GraduationCap } from "lucide-react";
import type { HeroFeature } from "@/interfaces/hero.interface";

/** Cifras de ejemplo con tono comercial; ajustar a los datos reales. */
export const HERO_FEATURES: readonly HeroFeature[] = [
    {
        id: "courses",
        icon: GraduationCap,
        title: "Oltre 100 corsi",
        description: "Formazione online e in presenza",
    },
    {
        id: "certifications",
        icon: BadgeCheck,
        title: "Certificazioni validate",
        description: "Riconosciute in ambito clinico e professionale",
    },
    {
        id: "countries",
        icon: Globe,
        title: "Presenti in 15+ paesi",
        description: "Una rete internazionale di professionisti",
    },
    {
        id: "tests",
        icon: ClipboardList,
        title: "500+ test psicometrici",
        description: "Strumenti validati scientificamente",
    },
];
