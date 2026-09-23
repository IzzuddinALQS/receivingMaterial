export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center gap-1.5 rounded-md border border-transparent bg-accent-700 px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out hover:bg-accent-800 focus:bg-accent-800 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 active:bg-accent-900 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
