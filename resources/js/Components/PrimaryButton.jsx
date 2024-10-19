export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex justify-center items-center px-4 py-2 bg-orange-600 border border-transparent rounded-md font-semibold text-large text-white uppercase tracking-widest hover:bg-[#c14d00de] focus:bg-[#c14d00de] active:bg-[#c14d00de] focus:outline-none focus:ring-2 focus:bg-[#c14d00de] focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
