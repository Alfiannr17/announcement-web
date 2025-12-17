import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex items-center space-x-2 px-3 py-2 gap-2 rounded-lg transition duration-150 ease-in-out ${
                active
                    ? 'bg-blue-600 text-white font-semibold shadow-md'
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
