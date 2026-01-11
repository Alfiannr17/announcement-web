export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-lg border border-transparent bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition duration-150 ease-in-out hover:bg-blue-800 focus:bg-blue-800 focus:outline-none active:bg-blue-900 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
