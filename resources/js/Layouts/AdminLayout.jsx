import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRightEndOnRectangleIcon, BellAlertIcon, HomeIcon, UserIcon, UsersIcon } from '@heroicons/react/24/solid';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';


export default function AdminLayout({ title, children }) {
  const { auth } = usePage().props;
  const currentRoute = route().current();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getNavLinkClass = (routeName) => currentRoute.startsWith(routeName);

  return (
    <div className="min-h-screen flex">
      
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <aside
        className={`w-64 bg-white border-r flex flex-col fixed top-0 left-0 bottom-0 z-50 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <span className='text-gray-700'>Announcement</span>
          </h1>
          <div className="text-xs text-gray-500 mt-1">Announcement System</div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          
          
          
          <ResponsiveNavLink
            href={route('admin.dashboard')}
            active={getNavLinkClass('admin.dashboard')}
            className='px-3'
          >
            <HomeIcon className='w-5 h-5 mr-1'/> Dashboard
          </ResponsiveNavLink>


          <ResponsiveNavLink
            href={route('admin.announcements.index')}
            active={getNavLinkClass('admin.announcements')}
            className='px-3'
          >
            <BellAlertIcon className='w-5 h-5 mr-1'/>
            Announcements
          </ResponsiveNavLink>


          <ResponsiveNavLink
            href={route('admin.employees.index')}
            active={getNavLinkClass('admin.employees')}
            className='px-3'
          >
            <UsersIcon className='w-5 h-5 mr-1'/> Employees
          </ResponsiveNavLink>


          <ResponsiveNavLink
            href={route('admin.profile')}
            active={getNavLinkClass('admin.profile')}
            className='px-3'
          >
            <UserIcon className='w-5 h-5 mr-1'/> Profile
          </ResponsiveNavLink>
          
          <ResponsiveNavLink
            href={route('admin.about')} 
            active={route().current('admin.about')}
            className='px-3'
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
            </svg>
            About System
          </ResponsiveNavLink>


        </nav>

        <div className="p-4 border-t mt-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Link href={route('admin.profile')}>
                    <img 
                        className="h-8 w-8 rounded-full object-cover"
                        src={`https://ui-avatars.com/api/?name=${auth?.user?.name || 'User'}&background=1d4ed8&color=fff&bold=true`}
                        alt={auth?.user?.name}
                    />
                    </Link>
                    <div>
                        <div className="text-sm font-semibold text-gray-800 leading-none">{auth?.user?.name}</div>
                        <div className="text-xs text-gray-500 leading-none mt-1">{auth?.user?.email}</div>
                    </div>
                </div>
                 <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    title="Logout"
                    className="text-gray-400 hover:text-red-500 transition duration-150"
                  >
                     <ArrowRightEndOnRectangleIcon className="w-6 h-6" />
                  </Link>
            </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col lg:ml-64">
        
        <header className="bg-white sticky top-0 z-20 border-b">
            <div className="grid grid-cols-[auto,1fr,auto] items-center px-4 sm:px-6 py-4">
              
              <div className="flex items-center">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="text-gray-500 hover:text-gray-600 lg:hidden p-1"
                  aria-label="Toggle sidebar"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>

              <div className="text-center lg:text-left lg:pl-2">
                <div className="text-sm text-gray-500 hidden sm:block">
                  Main Menu / <span className="capitalize">{currentRoute.split('.')[1]}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mt-1">
                  {title || 'Admin Page'}
                </h2>
              </div>

              <div className="flex items-center justify-end">
                <Link href={route('admin.profile')}  className="flex items-center">
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={`https://ui-avatars.com/api/?name=${auth?.user?.name || 'User'}&background=1d4ed8&color=fff&bold=true`}
                    alt={auth?.user?.name}
                  />
                </Link>
              </div>

            </div>
          </header>


        <main className="p-6 sm:p-12 flex-1">
          {children}
        </main>

        <footer>
          <div className="text-center mb-8 px-6 opacity-60">
                    <p className="text-sm font-medium text-gray-500 italic">
                        "Great communication is the bridge between confusion and clarity."
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                        © {new Date().getFullYear()} Announcement System. All rights reserved.
                    </p>
            </div>
        </footer>
      </div>
    </div>
  );
}