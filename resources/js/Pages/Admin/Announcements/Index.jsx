import React, { useEffect, useState, useRef } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { BellAlertIcon, CheckIcon, ChevronUpDownIcon, FunnelIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Listbox, Transition } from '@headlessui/react';
import SecondaryButton from '@/Components/SecondaryButton';
import Pagination from '@/Components/Pagination';
import ButtonDetails from '@/Components/ButtonDetails';

export default function Index({ announcements, filters, senderOptions }) {
  const { flash } = usePage().props;

  const [search, setSearch] = useState(filters.search || '');
  const [sender, setSender] = useState(filters.sender || '');
  const [dateFrom, setDateFrom] = useState(filters.date_from || '');
  const [dateTo, setDateTo] = useState(filters.date_to || '');
  const [showFilters, setShowFilters] = useState(false);

  const handleFilter = () => {
    router.get(
      route('admin.announcements.index'),
      { search, sender, date_from: dateFrom, date_to: dateTo },
      { preserveState: true, replace: true }
    );
  };

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      handleFilter();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search, sender, dateFrom, dateTo]);

  const resetFilters = () => {
    setSearch('');
    setSender('');
    setDateFrom('');
    setDateTo('');
    setShowFilters(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  };

  const isFilterActive = sender || dateFrom || dateTo;

  

  return (
    <AdminLayout title="Announcement">
      <Head title="Announcement"/>
     
      <div className="bg-white rounded-xl border p-4 lg:p-6">
        <div className="flex justify-between items-center  pb-4 border-b mb-6">
          <div className="flex items-center">
            <BellAlertIcon className="w-6 h-6 text-gray-700 mr-3" />
            <h1 className="text-xl font-semibold text-gray-800">Announcement</h1>
          </div>
          <PrimaryButton>
          <Link
            href={route('admin.announcements.create')}
          >
            Create New
          </Link>
          </PrimaryButton>
        </div>

         {flash?.success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center ">
           <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           <span>{flash.success}</span>
        </div>
      )}
      
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
  
          <div className="hidden md:block relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title or content..."
              className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg py-2 text-sm w-full "
            />
          </div>

          <div className="hidden md:block relative w-full md:w-auto">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center px-4 py-2 border rounded-lg text-sm font-medium transition-all ${
                isFilterActive ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FunnelIcon className="h-4 w-4 mr-2" />
              Filter {isFilterActive && <span className="ml-1 px-1.5 bg-blue-700 text-white text-[10px] rounded-full">!</span>}
            </button>

            {showFilters && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-100 rounded-xl z-50 p-5 ring-1 ring-black ring-opacity-5">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-gray-900 text-sm">Filter Options</span>
                  <button onClick={() => setShowFilters(false)} className="p-1 hover:bg-gray-100 rounded-full">
                    <XMarkIcon className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Sender</label>
                    <Listbox value={sender} onChange={setSender}>
                      <div className="relative">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-50 py-2 text-left px-3 border  focus:ring-2 focus:ring-blue-500 sm:text-sm">
                          <span className="block truncate">{sender || 'All Senders'}</span>
                          <span className="absolute inset-y-0 right-0 flex items-center pr-2"><ChevronUpDownIcon className="h-4 w-4 text-gray-400"/></span>
                        </Listbox.Button>
                        <Transition leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base  z-[60] focus:outline-none sm:text-sm">
                            <Listbox.Option className={({ active }) => `relative cursor-default select-none py-2 pl-8 pr-4 ${active ? 'bg-blue-50 text-blue-900' : 'text-gray-900'}`} value="">All Senders</Listbox.Option>
                            {senderOptions.map((s, i) => (
                              <Listbox.Option key={i} className={({ active }) => `relative cursor-default select-none py-2 pl-8 pr-4 ${active ? 'bg-blue-50 text-blue-900' : 'text-gray-900'}`} value={s}>
                                {({ selected }) => (<><span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>{s}</span>{selected && <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-blue-600"><CheckIcon className="h-4 w-4"/></span>}</>)}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">Date From</label>
                      <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="w-full border-gray-200 rounded-lg text-xs p-2 bg-gray-50" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">Date To</label>
                      <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="w-full border-gray-200 rounded-lg text-xs p-2 bg-gray-50" />
                    </div>
                  </div>

                  <div className="pt-4 border-t flex flex-col gap-2">
                    <PrimaryButton onClick={() => setShowFilters(false)} className="w-full justify-center">Apply Filters</PrimaryButton>
                    <SecondaryButton onClick={resetFilters} className="w-full justify-center text-red-600">Clear All</SecondaryButton>
                  </div>
                </div>
              </div>
            )}
          </div>

              <div className="md:hidden flex items-center gap-2 w-full">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search title or content..."
                    className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg py-2 text-sm w-full "
                  />
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`relative shrink-0 inline-flex items-center justify-center h-10 w-10 border rounded-lg transition-all ${
                      isFilterActive ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                    title="Filter"
                  >
                    <FunnelIcon className="h-4 w-4" />
                    {isFilterActive && (
                      <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-blue-600 ring-2 ring-white" />
                    )}
                  </button>

                  {showFilters && (
                    <div className="absolute right-0 mt-2 w-80 max-w-[90vw] bg-white border border-gray-100 rounded-xl  z-50 p-5 ring-1 ring-black ring-opacity-5">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-bold text-gray-900 text-sm">Filter Options</span>
                        <button onClick={() => setShowFilters(false)} className="p-1 hover:bg-gray-100 rounded-full">
                          <XMarkIcon className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Sender</label>
                          <Listbox value={sender} onChange={setSender}>
                            <div className="relative">
                              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-50 py-2 text-left px-3 border  focus:ring-2 focus:ring-blue-500 sm:text-sm">
                                <span className="block truncate">{sender || 'All Senders'}</span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2"><ChevronUpDownIcon className="h-4 w-4 text-gray-400"/></span>
                              </Listbox.Button>
                              <Transition leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base  z-[60] focus:outline-none sm:text-sm">
                                  <Listbox.Option className={({ active }) => `relative cursor-default select-none py-2 pl-8 pr-4 ${active ? 'bg-blue-50 text-blue-900' : 'text-gray-900'}`} value="">All Senders</Listbox.Option>
                                  {senderOptions.map((s, i) => (
                                    <Listbox.Option key={i} className={({ active }) => `relative cursor-default select-none py-2 pl-8 pr-4 ${active ? 'bg-blue-50 text-blue-900' : 'text-gray-900'}`} value={s}>
                                      {({ selected }) => (<><span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>{s}</span>{selected && <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-blue-600"><CheckIcon className="h-4 w-4"/></span>}</>)}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </Listbox>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">Date From</label>
                            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="w-full border-gray-200 rounded-lg text-xs p-2 bg-gray-50" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">Date To</label>
                            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="w-full border-gray-200 rounded-lg text-xs p-2 bg-gray-50" />
                          </div>
                        </div>

                        <div className="pt-4 border-t flex flex-col gap-2">
                          <PrimaryButton onClick={() => setShowFilters(false)} className="w-full justify-center">Apply Filters</PrimaryButton>
                          <SecondaryButton onClick={resetFilters} className="w-full justify-center text-red-600">Clear All</SecondaryButton>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>


<div className="md:hidden space-y-3">
  {announcements.data.length === 0 ? (
    <div className="bg-white border rounded-xl p-4 text-center text-gray-500">
      No announcements yet.
    </div>
  ) : (
    announcements.data.map((a) => (
      <div key={a.id} className="bg-white border rounded-xl p-4">
        <div className="font-semibold text-gray-900 text-md line-clamp-2">
          {a.title}
        </div>

        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
          <span>{a.sender || '-'}</span>
          <span className="font-medium text-gray-700">{a.recipients_count} recipients</span>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-500">
          <div className="bg-gray-50 border rounded-lg p-2">
            <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">
              Created
            </div>
            <div className="text-gray-700 font-medium">{formatDate(a.created_at)}</div>
          </div>

          <div className="bg-gray-50 border rounded-lg p-2">
            <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">
              Sent
            </div>
            <div className="text-gray-700 font-medium">
              {a.sent_at ? (
                formatDate(a.sent_at)
              ) : (
                <span className="inline-flex text-[10px] font-bold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full">
                  DRAFT
                </span>
              )}
            </div>
          </div>
        </div>

        
        <div className="mt-4 ">
          <Link href={route('admin.announcements.show', a.id)} className="block">
            <ButtonDetails className="w-full px-8 hover:bg-blue-100 py-2 justify-center">
              Details
            </ButtonDetails>
          </Link>
        </div>
      </div>
    ))
  )}

  <div className="pt-2 flex justify-center">
    <Pagination links={announcements.links} />
  </div>
</div>

<div className="hidden md:block overflow-x-auto border rounded-lg">
  <table className="min-w-full text-sm">
    <thead>
      <tr className="border-b bg-gray-50/80 text-left text-gray-600 uppercase text-xs">
        <th className="px-4 py-3 font-medium">Title</th>
        <th className="px-4 py-3 font-medium">Sender</th>
        <th className="px-4 py-3 font-medium">Created</th>
        <th className="px-4 py-3 font-medium">Sent</th>
        <th className="px-4 py-3 font-medium text-center">Recipient</th>
        <th className="px-4 py-3 font-medium text-right">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100">
      {announcements.data.length === 0 && (
        <tr>
          <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
            No announcements yet.
          </td>
        </tr>
      )}

      {announcements.data.map((a) => (
        <tr key={a.id} className="hover:bg-gray-50 transition">
          <td className="px-4 py-3 font-medium text-gray-800 max-w-xs truncate">{a.title}</td>
          <td className="px-4 py-3">{a.sender || '-'}</td>
          <td className="px-4 py-3 text-gray-600">{formatDate(a.created_at)}</td>
          <td className="px-4 py-3 text-gray-600">
            {a.sent_at ? (
              formatDate(a.sent_at)
            ) : (
              <span className="text-xs font-semibold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full">
                DRAFT
              </span>
            )}
          </td>
          <td className="px-4 py-3 text-center text-gray-800 font-medium">{a.recipients_count}</td>
          <td className="px-4 py-3 text-right">
            <Link
              href={route('admin.announcements.show', a.id)}
              className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium"
            >
              Details
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

<div className="hidden md:flex mt-4 justify-end">
  <Pagination links={announcements.links} />
</div>

      </div>
    </AdminLayout>
  );
}