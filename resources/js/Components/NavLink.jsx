import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 border-b-2 text-base font-semibold leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'text-gray-900 group-hover:text-[#5a525275] '
                    : 'border-transparent text-black group-hover:text-[#5a525275] ') +
                className
            }
        >
            {children}
        </Link>
    );
}
