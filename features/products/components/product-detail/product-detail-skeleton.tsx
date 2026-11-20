const block = "rounded-full bg-[#1B4F8A]/10 dark:bg-[#EFF6FF]/10";

export default function ProductDetailSkeleton() {
    return (
        <div role="status" aria-label="Caricamento prodotto" className="animate-pulse">
            <div className={`h-4 w-64 ${block}`} />
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-8 lg:gap-10 items-start">
                <div>
                    <div className="h-60 sm:h-80 lg:h-[400px] rounded-[28px] bg-[#1B4F8A]/10 dark:bg-[#EFF6FF]/10" />
                    <div className="mt-6 flex gap-2">
                        <div className={`h-7 w-16 ${block}`} />
                        <div className={`h-7 w-24 ${block}`} />
                        <div className={`h-7 w-40 ${block}`} />
                    </div>
                    <div className={`mt-5 h-9 w-3/4 ${block}`} />
                    <div className={`mt-5 h-4 w-full ${block}`} />
                    <div className={`mt-2.5 h-4 w-2/3 ${block}`} />
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {Array.from({ length: 4 }, (_, i) => (
                            <div key={i} className="h-[72px] rounded-2xl bg-[#1B4F8A]/10 dark:bg-[#EFF6FF]/10" />
                        ))}
                    </div>
                </div>
                <div className="h-[420px] rounded-[28px] bg-[#1B4F8A]/10 dark:bg-[#EFF6FF]/10" />
            </div>
        </div>
    );
}
