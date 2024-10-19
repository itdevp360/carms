export default function Checkbox({ className = '', value, ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-[#ff771c6e] text-indigo-600 shadow-sm focus:ring-[#ff771c6e] ' +
                className
            }
        />
    );
}
