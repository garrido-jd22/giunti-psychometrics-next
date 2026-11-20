export default function ProductCardSkeleton() {
    const block = "rounded-full bg-[#1B4F8A]/10 dark:bg-[#EFF6FF]/10";

    return (
        <div
            aria-hidden="true"
            className="flex flex-col justify-between rounded-[24px] p-4 bg-white/80 dark:bg-[#11223A]/85 shadow-[0_8px_30px_rgb(15,45,82,0.05)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.25)] animate-pulse"
        >
            <div>
                <div className="w-full h-52 rounded-[18px] bg-[#1B4F8A]/10 dark:bg-[#EFF6FF]/10" />

                <div className="px-1.5 pt-5">
                    <div className={`h-5 w-11/12 ${block}`} />
                    <div className={`mt-2 h-5 w-2/3 ${block}`} />
                    <div className={`mt-4 h-3.5 w-full ${block}`} />
                    <div className={`mt-2 h-3.5 w-4/5 ${block}`} />
                    <div className={`mt-4 h-7 w-32 ${block}`} />
                </div>
            </div>

            <div className="px-1.5 pt-5 mt-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 ${block}`} />
                    <div>
                        <div className={`h-3.5 w-24 ${block}`} />
                        <div className={`mt-1.5 h-3 w-16 ${block}`} />
                    </div>
                </div>
                <div className={`h-10 w-36 ${block}`} />
            </div>
        </div>
    );
}
