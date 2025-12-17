import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { BellAlertIcon, HomeIcon, UsersIcon } from '@heroicons/react/24/solid';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';


export default function AdminLayout({ title, children }) {
  const { auth } = usePage().props;
  const currentRoute = route().current();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getNavLinkClass = (routeName) => currentRoute.startsWith(routeName);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      
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
          <div className="text-xs text-gray-500 mt-1">Sistem Pengumuman</div>
        </div>
        
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          <div className="text-xs uppercase font-semibold text-gray-400 px-4 pt-4 pb-2">Main Menu</div>
          
          <ResponsiveNavLink
            href={route('admin.dashboard')}
            active={getNavLinkClass('admin.dashboard')}
           
          >
            <HomeIcon className='size-5 '/> Overview
          </ResponsiveNavLink>
          
          <ResponsiveNavLink
            href={route('admin.employees.index')}
            active={getNavLinkClass('admin.employees')}
           
          >
            <UsersIcon className='size-5 '/> Employee
          </ResponsiveNavLink>

          <ResponsiveNavLink
            href={route('admin.announcements.index')}
            active={getNavLinkClass('admin.announcements')}
         
          >
            <BellAlertIcon className='size-5 '/>
            Announcements
          </ResponsiveNavLink>
        </nav>

        <div className="p-4 border-t mt-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={`https://ui-avatars.com/api/?name=${auth?.user?.name || 'User'}&background=1d4ed8&color=fff&bold=true`}
                        alt={auth?.user?.name}
                    />
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
                   
                  </Link>
            </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col lg:ml-64">
        
        <header className="bg-white sticky top-0 z-20 border-b">
          <div className="flex items-center justify-between px-6 py-4">
           
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 hover:text-gray-600 lg:hidden p-1 mr-3"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div>
              <div className="text-sm text-gray-500 hidden sm:block">
                Main Menu / <span className="capitalize">{currentRoute.split('.')[1]}</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mt-1">
                {title || 'Halaman Admin'}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
      
              
              
              
                  <Link href='#'className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800">
                    <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={`https://ui-avatars.com/api/?name=${auth?.user?.name || 'User'}&background=1d4ed8&color=fff&bold=true`}
                        alt={auth?.user?.name}
                    />
                  </Link>
              
             
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}