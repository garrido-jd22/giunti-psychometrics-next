import Link from "next/link";

export default function notFound() {
    return <>
        <div className="h-screen w-screen bg-gray-100 flex items-center">
            <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
                <div className="max-w-md">
                    <div className="text-5xl font-dark font-bold mb-5">404</div>
                    <p
                        className="text-2xl md:text-3xl font-light leading-normal mb-3"
                    >Ops! Non riusciamo a trovare questa pagina. </p>
                    <p className="mb-8">Ma possiamo aiutarti a trovare quello che stavi cercando</p>

                    <Link
                        href="/"
                        className="inline-flex items-center justify-center h-11 px-7 rounded-[6px] text-[15.5px] font-medium text-[#EFF6FF] bg-[#1B4F8A] hover:bg-[#0EA5E9] dark:bg-[#1B4F8A] dark:hover:bg-[#0EA5E9] shadow-sm transition-colors"
                    >
                        Torna alla pagina principale
                    </Link>                </div>
            </div>
        </div>
    </>
}