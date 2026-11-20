"use client";

import { memo, useEffect, useState } from "react";
import {
    Bell,
    CircleCheck,
    CircleX,
    Info,
    Sparkles,
    TriangleAlert,
    X,
    type LucideIcon,
} from "lucide-react";
import type { Toast } from "@/interfaces/toast.interface";
import { toast as toastService } from "@/lib/services/toast.service";
import type { ToastVariant } from "@/types/toast.types";

interface VariantStyle {
    icon: LucideIcon;
    container: string;
    iconWrap: string;
    progress: string;
}

const VARIANTS: Record<ToastVariant, VariantStyle> = {
    success: {
        icon: CircleCheck,
        container: "bg-emerald-50 text-emerald-950 dark:bg-[#0B2A22] dark:text-emerald-50",
        iconWrap: "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-300",
        progress: "bg-emerald-500/60",
    },
    error: {
        icon: CircleX,
        container: "bg-red-50 text-red-950 dark:bg-[#2D1216] dark:text-red-50",
        iconWrap: "bg-red-500/15 text-red-600 dark:bg-red-400/15 dark:text-red-300",
        progress: "bg-red-500/60",
    },
    warning: {
        icon: TriangleAlert,
        container: "bg-amber-50 text-amber-950 dark:bg-[#2B2010] dark:text-amber-50",
        iconWrap: "bg-amber-500/20 text-amber-600 dark:bg-amber-400/15 dark:text-amber-300",
        progress: "bg-amber-500/60",
    },
    info: {
        icon: Info,
        container: "bg-sky-50 text-sky-950 dark:bg-[#0C2233] dark:text-sky-50",
        iconWrap: "bg-sky-500/15 text-sky-600 dark:bg-sky-400/15 dark:text-sky-300",
        progress: "bg-sky-500/60",
    },
    primary: {
        icon: Sparkles,
        container: "bg-[#1B4F8A] text-white",
        iconWrap: "bg-white/15 text-white",
        progress: "bg-white/50",
    },
    secondary: {
        icon: Bell,
        container: "bg-slate-100 text-slate-900 dark:bg-[#1E293B] dark:text-slate-100",
        iconWrap: "bg-slate-500/15 text-slate-600 dark:bg-slate-400/15 dark:text-slate-300",
        progress: "bg-slate-500/50",
    },
};

function ToastItem({ toast }: { toast: Toast }) {
    const [isPaused, setIsPaused] = useState(false);
    const { icon: Icon, container, iconWrap, progress } = VARIANTS[toast.variant];
    const autoClose = Number.isFinite(toast.duration);

    useEffect(() => {
        if (!autoClose || isPaused || !toast.open) return;
        const timer = setTimeout(() => toastService.dismiss(toast.id), toast.duration);
        return () => clearTimeout(timer);
    }, [autoClose, isPaused, toast.open, toast.id, toast.duration]);

    return (
        <div
            role={toast.variant === "error" ? "alert" : "status"}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className={`pointer-events-auto relative overflow-hidden w-full flex items-start gap-3 p-3.5 pr-11 rounded-2xl shadow-[0_12px_32px_rgb(15,45,82,0.16)] dark:shadow-[0_12px_32px_rgb(0,0,0,0.45)] font-sans motion-reduce:animate-none ${container} ${toast.open ? "animate-toast-in" : "animate-toast-out"}`}
        >
            <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconWrap}`}>
                <Icon className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
            </span>

            <div className="min-w-0 pt-0.5">
                <p className="text-[15px] font-semibold leading-snug">{toast.title}</p>
                {toast.description && (
                    <p className="mt-0.5 text-[14px] leading-snug opacity-80">{toast.description}</p>
                )}
            </div>

            <button
                type="button"
                onClick={() => toastService.dismiss(toast.id)}
                aria-label="Chiudi notifica"
                className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition cursor-pointer"
            >
                <X className="w-4 h-4" />
            </button>

            {autoClose && (
                <span
                    aria-hidden="true"
                    key={isPaused ? "paused" : "running"}
                    style={{ animationDuration: `${toast.duration}ms` }}
                    className={`absolute bottom-0 left-0 h-0.5 w-full origin-left animate-toast-progress motion-reduce:hidden ${progress} ${isPaused ? "[animation-play-state:paused]" : ""}`}
                />
            )}
        </div>
    );
}

export default memo(ToastItem);
