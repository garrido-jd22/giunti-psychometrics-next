import type { CSSProperties } from "react";
import type { HeroFeature } from "@/interfaces/hero.interface";

interface HeroFeatureCardProps {
    feature: HeroFeature;
    style?: CSSProperties;
}

export default function HeroFeatureCard({ feature, style }: HeroFeatureCardProps) {
    const { icon: Icon, title, description } = feature;

    return (
        <li
            style={style}
            className="group flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-3xl text-center sm:text-left bg-white/90 dark:bg-[#11223A]/90 backdrop-blur-md shadow-[0_12px_35px_rgb(15,45,82,0.10)] dark:shadow-[0_12px_35px_rgb(0,0,0,0.35)] hover:-translate-y-1 hover:shadow-[0_18px_40px_rgb(27,79,138,0.18)] transition-[translate,box-shadow] duration-300 motion-safe:animate-fade-up"
        >
            <span className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-2xl flex items-center justify-center bg-[#0EA5E9]/12 text-[#1B4F8A] dark:bg-[#0EA5E9]/15 dark:text-[#0EA5E9] group-hover:bg-[#1B4F8A] group-hover:text-white dark:group-hover:bg-[#0EA5E9] dark:group-hover:text-[#091526] transition-colors duration-300">
                <Icon aria-hidden="true" className="w-5 h-5 sm:w-[22px] sm:h-[22px]" strokeWidth={1.8} />
            </span>

            <div className="min-w-0">
                <p className="text-[14.5px] sm:text-[15.5px] font-semibold tracking-tight leading-snug text-[#0F2D52] dark:text-[#EFF6FF]">
                    {title}
                </p>
                <p className="mt-0.5 text-[12.5px] sm:text-[13.5px] leading-snug text-[#0F2D52]/60 dark:text-[#EFF6FF]/60">
                    {description}
                </p>
            </div>
        </li>
    );
}
