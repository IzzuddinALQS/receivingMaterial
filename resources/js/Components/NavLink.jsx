import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition duration-150 ease-in-out focus:outline-none " +
                (active
                    ? "bg-slate-800 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white") +
                className
            }
        >
            {children}
        </Link>
    );
}
