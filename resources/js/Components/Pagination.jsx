import { Link } from "@inertiajs/react";

export default function Pagination({links}){
    return (
        <nav className="text-center mt-4">
            {links.map(link => (
                <Link 
                preserveScroll
                href={link.url || ""}
                key={link.label}
                className={
                    "inline-block py-2 px-4 rounded-full text-black " + 
                    (link.active ? "bg-[#c16700] text-white " : " ") + (!link.url ? "!text-gray-500 cursor-not-allowed " : "hover:bg-[#cc8a3f]")
                }
                dangerouslySetInnerHTML={{__html: link.label}}></Link>
            ))}
        </nav>
    )
}