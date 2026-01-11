export default function ButtonDetails({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex border border-blue-400 items-center justify-center rounded-lg  bg-blue-50 hover:bg-blue-100  w-full  text-sm font-semibold  text-blue-600 transition duration-150 ease-in-out focus:outline-none  disabled:opacity-25 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
