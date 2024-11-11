export default function Guest({ children, className }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#e7e7e7]">
            <div className={`w-full mt-5 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg ` + className}>
                {children}
            </div>
        </div>
    );
}
