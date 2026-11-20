import type { ReactNode } from "react";
import { CircleAlert } from "lucide-react";

interface FormFieldProps {
    id: string;
    label: string;
    error?: string;
    hint?: ReactNode;
    required?: boolean;
    children: ReactNode;
}

export default function FormField({ id, label, error, hint, required, children }: FormFieldProps) {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-[14px] font-semibold text-[#0F2D52] dark:text-[#EFF6FF] mb-2"
            >
                {label}
                {required ? (
                    <span aria-hidden="true" className="ml-0.5 text-[#0EA5E9]">*</span>
                ) : (
                    <span className="ml-1.5 font-normal text-[#0F2D52]/50 dark:text-[#EFF6FF]/50">(facoltativo)</span>
                )}
            </label>

            {children}

            {error ? (
                <p
                    id={`${id}-error`}
                    className="mt-1.5 flex items-start gap-1.5 text-[13.5px] font-medium text-red-600 dark:text-red-400"
                >
                    <CircleAlert className="w-4 h-4 mt-px shrink-0" aria-hidden="true" />
                    {error}
                </p>
            ) : (
                hint && (
                    <p id={`${id}-hint`} className="mt-1.5 text-[13px] text-[#0F2D52]/55 dark:text-[#EFF6FF]/55">
                        {hint}
                    </p>
                )
            )}
        </div>
    );
}

export function fieldControlClass(hasError: boolean, extra = "") {
    return [
        "w-full rounded-2xl text-[15px] bg-[#EFF6FF]/70 dark:bg-[#091526]/75 text-[#0F2D52] dark:text-[#EFF6FF]",
        "placeholder:text-[#0F2D52]/45 dark:placeholder:text-[#EFF6FF]/45 focus:outline-none focus:ring-2 transition-all",
        hasError
            ? "ring-2 ring-red-500/70 focus:ring-red-500 bg-red-50/60 dark:bg-red-950/20"
            : "focus:ring-[#0EA5E9]",
        extra,
    ].join(" ");
}
