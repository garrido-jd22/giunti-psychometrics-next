import type { HeroFeature } from "@/interfaces/hero.interface";
import HeroFeatureCard from "./hero-feature-card";

interface HeroFeaturesProps {
    features: readonly HeroFeature[];
}

const BASE_DELAY_MS = 550;
const STAGGER_MS = 90;

export default function HeroFeatures({ features }: HeroFeaturesProps) {
    return (
        <ul className="max-w-[1220px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {features.map((feature, index) => (
                <HeroFeatureCard
                    key={feature.id}
                    feature={feature}
                    style={{ animationDelay: `${BASE_DELAY_MS + index * STAGGER_MS}ms` }}
                />
            ))}
        </ul>
    );
}
