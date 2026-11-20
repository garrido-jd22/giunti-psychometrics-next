

export default function ProductsLayout({ children }: LayoutProps<"/resources">) {
    return (
        <section className="w-full min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 bg-[#EFF6FF] text-[#0F2D52] dark:bg-[#091526] dark:text-[#EFF6FF] transition-colors duration-300 font-sans">
            <div className="max-w-[1220px] mx-auto">
                <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between pb-5 border-b border-[#1B4F8A]/15 dark:border-[#EFF6FF]/15">
                    <div className="motion-safe:animate-fade-down">
                        <h1 className="text-[26px] sm:text-[30px] lg:text-[34px] font-semibold tracking-tight leading-tight text-[#0F2D52] dark:text-[#EFF6FF]">
                            Risorse
                        </h1>
                        <p className="mt-1.5 text-[15px] text-[#0F2D52]/65 dark:text-[#EFF6FF]/65">
                            Risorse: libri, materiali, ecc.
                        </p>
                    </div>
                </div>

                {children}
            </div>
        </section>
    );
}
