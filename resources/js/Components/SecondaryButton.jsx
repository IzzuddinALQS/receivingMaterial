export default function SecondaryButton({
    type = "button",
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center justify-center gap-2 rounded-xl border-2 border-secondary-600 bg-white px-6 py-3 text-sm font-semibold text-secondary-700 transition duration-150 ease-in-out hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 disabled:opacity-40 ${
                    disabled && "opacity-40"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
