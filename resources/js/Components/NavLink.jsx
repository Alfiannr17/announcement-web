import { Link } from '@inertiajs/react';

export default function NavLink({
    href,
    Icon,
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
              href={href}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition duration-150 ease-in-out ${
                active
                  ? 'bg-blue-600 text-white font-semibold shadow-md'
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              {Icon && <Icon className="h-5 w-5" />}
              <span>{children}</span>
            </Link>
    );
}
