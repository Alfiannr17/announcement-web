import React, { useEffect, useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { UsersIcon, ChartBarIcon, ClockIcon, MagnifyingGlassIcon, XMarkIcon, FunnelIcon, ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/solid'; 
import PrimaryButton from '@/Components/PrimaryButton';
import { Listbox, Transition } from '@headlessui/react';
import SecondaryButton from '@/Components/SecondaryButton';
import DeleteConfirmModal from '@/Components/DeleteConfirmModal';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Pagination from '@/Components/Pagination';

const SecondaryNavItem = ({ href, active, children, icon: Icon }) => {
  const baseClasses = 'flex items-center px-4 py-2 border-b-2 text-sm transition-colors duration-150';
  const activeClasses = 'border-blue-700 text-blue-700 font-semibold';
  const inactiveClasses = 'border-transparent text-gray-600 hover:text-indigo-700 hover:border-blue-700';


  return (
    <Link href={href} className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}>
      <Icon className="w-4 h-4 mr-2" />
      {children}
    </Link>
  );
};

export default function Index({ employees, filters, divisions, positions }) {
  const { flash, url } = usePage().props;

  const [search, setSearch] = useState(filters.search || '');
    const [division, setDivision] = useState(filters.division || '');
    const [position, setPosition] = useState(filters.position || '');
    const [showFilters, setShowFilters] = useState(false); 

    const handleFilter = () => {
        router.get(
            route('admin.employees.index'),
            { search, division, position },
            { preserveState: true, replace: true }
        );
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleFilter();
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [search, division, position]);

    const resetFilters = () => {
        setSearch('');
        setDivision('');
        setPosition('');
        setShowFilters(false);
    };

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    const openDeleteModal = (employee) => {
        setEmployeeToDelete(employee);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = () => {
        router.delete(route('admin.employees.destroy', employeeToDelete.id), {
            onSuccess: () => setIsDeleteModalOpen(false),
        });
    };

  return (
    <AdminLayout title="Employee"> 
      <Head title="Employee" />
      <div className="bg-white rounded-xl border p-6">
        
        <div className="flex justify-between items-center pb-4 border-b mb-6">
          <div className="flex items-center">
            <UsersIcon className="w-6 h-6 text-gray-700 mr-3" />
            <h1 className="text-xl font-semibold text-gray-800">Employee</h1>
          </div>
          <div className="flex space-x-2">
            
            <PrimaryButton>
            <Link
              href={route('admin.employees.create')}
            >
              Add Employee
            </Link>
            </PrimaryButton>
          </div>
        </div>
        
        
        
        {flash?.success && (
          <div className="mb-4 bg-green-100 text-green-800 px-4 py-2 rounded text-sm border border-green-200">
            {flash.success}
          </div>
        )}

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div className="w-full flex items-center gap-2 md:hidden">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search name or email..."
                        className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg py-2 text-sm w-full "
                      />
                    </div>

                    <div className="relative">
                      <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`inline-flex items-center justify-center h-10 w-10 border rounded-lg transition-all ${
                          division || position
                            ? 'bg-blue-50 border-blue-200 text-blue-700'
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                        aria-label="Filter"
                      >
                        <FunnelIcon className="h-5 w-5" />
                        {(division || position) && (
                          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-700 text-white text-[10px] flex items-center justify-center">
                            !
                          </span>
                        )}
                      </button>

                      {showFilters && (
                        <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-100 rounded-lg z-50 p-5 ring-1 ring-black ring-opacity-5">
                          <div className="flex justify-between items-center mb-4">
                            <span className="font-bold text-gray-900 text-sm">Filter Options</span>
                            <button
                              onClick={() => setShowFilters(false)}
                              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                              <XMarkIcon className="h-4 w-4 text-gray-400" />
                            </button>
                          </div>

                          <div className="space-y-5">
                            <div>
                              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                                Division
                              </label>
                              <Listbox value={division} onChange={setDivision}>
                                <div className="relative">
                                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-50 py-2.5 pl-3 pr-10 text-left border focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm transition-all hover:bg-blue-100">
                                    <span className="block truncate">{division || 'All Divisions'}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                      <ChevronUpDownIcon className="h-4 w-4 text-gray-400" />
                                    </span>
                                  </Listbox.Button>
                                  <Transition
                                    as={React.Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-lg bg-white text-base  ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-[60]">
                                      <Listbox.Option
                                        className={({ active }) =>
                                          `relative cursor-default select-none py-2 pl-8 pr-2 ${
                                            active ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                                          }`
                                        }
                                        value=""
                                      >
                                        All Divisions
                                      </Listbox.Option>
                                      {divisions.map((div, i) => (
                                        <Listbox.Option
                                          key={i}
                                          className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-8 pr-2 ${
                                              active ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                                            }`
                                          }
                                          value={div}
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                                                {div}
                                              </span>
                                              {selected && (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-blue-600">
                                                  <CheckIcon className="h-4 w-4" />
                                                </span>
                                              )}
                                            </>
                                          )}
                                        </Listbox.Option>
                                      ))}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </Listbox>
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                                Position
                              </label>
                              <Listbox value={position} onChange={setPosition}>
                                <div className="relative">
                                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-50 py-2.5 pl-3 pr-10 text-left border focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm transition-all hover:bg-blue-100">
                                    <span className="block truncate">{position || 'All Positions'}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                      <ChevronUpDownIcon className="h-4 w-4 text-gray-400" />
                                    </span>
                                  </Listbox.Button>
                                  <Transition
                                    as={React.Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-lg bg-white text-base  ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-[60]">
                                      <Listbox.Option
                                        className={({ active }) =>
                                          `relative cursor-default select-none py-2 pl-8 pr-2 ${
                                            active ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                                          }`
                                        }
                                        value=""
                                      >
                                        All Positions
                                      </Listbox.Option>
                                      {positions.map((pos, i) => (
                                        <Listbox.Option
                                          key={i}
                                          className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-8 pr-2 ${
                                              active ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                                            }`
                                          }
                                          value={pos}
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                                                {pos}
                                              </span>
                                              {selected && (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-blue-600">
                                                  <CheckIcon className="h-4 w-4" />
                                                </span>
                                              )}
                                            </>
                                          )}
                                        </Listbox.Option>
                                      ))}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </Listbox>
                            </div>

                            <div className="pt-3 border-t border-gray-100">
                              <PrimaryButton onClick={() => setShowFilters(false)} className="w-full flex items-center justify-center">
                                Apply Filters
                              </PrimaryButton>

                              <SecondaryButton onClick={resetFilters} className="w-full flex items-center justify-center text-red-600 mt-2">
                                Clear All
                              </SecondaryButton>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="hidden md:flex w-full justify-between items-center gap-4">
                    <div className="relative w-full md:w-96">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search name or email..."
                        className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg py-2 text-sm w-full "
                      />
                    </div>

                    <div className="relative w-full md:w-auto">
                      <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center px-4 py-2 border rounded text-sm font-medium transition-all ${
                          division || position ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <FunnelIcon className="h-4 w-4 mr-2" />
                        Filter {(division || position) && <span className="ml-1 px-1.5 bg-blue-700 text-white text-[10px] rounded-full">!</span>}
                      </button>

                      {showFilters && (
                        <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-100 rounded-lg z-50 p-5 ring-1 ring-black ring-opacity-5">
                          <div className="flex justify-between items-center mb-4">
                            <span className="font-bold text-gray-900 text-sm">Filter Options</span>
                            <button
                              onClick={() => setShowFilters(false)}
                              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                              <XMarkIcon className="h-4 w-4 text-gray-400" />
                            </button>
                          </div>

                          <div className="space-y-5">
                            <div>
                              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                                Division
                              </label>
                              <Listbox value={division} onChange={setDivision}>
                                <div className="relative">
                                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-50 py-2.5 pl-3 pr-10 text-left border focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm transition-all hover:bg-blue-100">
                                    <span className="block truncate">{division || 'All Divisions'}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                      <ChevronUpDownIcon className="h-4 w-4 text-gray-400" />
                                    </span>
                                  </Listbox.Button>
                                  <Transition
                                    as={React.Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-lg bg-white text-base  ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-[60]">
                                      <Listbox.Option
                                        className={({ active }) =>
                                          `relative cursor-default select-none py-2 pl-8 pr-2 ${
                                            active ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                                          }`
                                        }
                                        value=""
                                      >
                                        All Divisions
                                      </Listbox.Option>
                                      {divisions.map((div, i) => (
                                        <Listbox.Option
                                          key={i}
                                          className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-8 pr-2 ${
                                              active ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                                            }`
                                          }
                                          value={div}
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                                                {div}
                                              </span>
                                              {selected && (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-blue-600">
                                                  <CheckIcon className="h-4 w-4" />
                                                </span>
                                              )}
                                            </>
                                          )}
                                        </Listbox.Option>
                                      ))}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </Listbox>
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                                Position
                              </label>
                              <Listbox value={position} onChange={setPosition}>
                                <div className="relative">
                                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-50 py-2.5 pl-3 pr-10 text-left border focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm transition-all hover:bg-blue-100">
                                    <span className="block truncate">{position || 'All Positions'}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                      <ChevronUpDownIcon className="h-4 w-4 text-gray-400" />
                                    </span>
                                  </Listbox.Button>
                                  <Transition
                                    as={React.Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-lg bg-white text-base  ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-[60]">
                                      <Listbox.Option
                                        className={({ active }) =>
                                          `relative cursor-default select-none py-2 pl-8 pr-2 ${
                                            active ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                                          }`
                                        }
                                        value=""
                                      >
                                        All Positions
                                      </Listbox.Option>
                                      {positions.map((pos, i) => (
                                        <Listbox.Option
                                          key={i}
                                          className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-8 pr-2 ${
                                              active ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                                            }`
                                          }
                                          value={pos}
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                                                {pos}
                                              </span>
                                              {selected && (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-blue-600">
                                                  <CheckIcon className="h-4 w-4" />
                                                </span>
                                              )}
                                            </>
                                          )}
                                        </Listbox.Option>
                                      ))}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </Listbox>
                            </div>

                            <div className="pt-3 border-t border-gray-100">
                              <PrimaryButton onClick={() => setShowFilters(false)} className="w-full flex items-center justify-center">
                                Apply Filters
                              </PrimaryButton>

                              <SecondaryButton onClick={resetFilters} className="w-full flex items-center justify-center text-red-600 mt-2">
                                Clear All
                              </SecondaryButton>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

<div className="md:hidden space-y-3">
  {employees.data.length === 0 ? (
    <div className="border rounded-xl p-4 text-center text-gray-500">
      No employees yet.
    </div>
  ) : (
    employees.data.map((employee) => (
      <div key={employee.id} className="border rounded-xl p-4">
        <div className="flex items-start gap-3">
          {employee.photo_path ? (
            <img
              src={`/storage/${employee.photo_path}`}
              alt={employee.name}
              className="w-12 h-12 rounded-full object-cover border"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-sm text-blue-500 font-semibold">
              {employee.name.substring(0, 2).toUpperCase()}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="font-semibold text-gray-900 truncate">{employee.name}</div>
            <div className="text-sm text-gray-600 break-all">{employee.email}</div>

            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span className="bg-gray-50 border rounded-full px-2 py-1 text-gray-600">
                {employee.division || '-'}
              </span>
              <span className="bg-gray-50 border rounded-full px-2 py-1 text-gray-600">
                {employee.position || '-'}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <Link
                href={route('admin.employees.edit', employee.id)}
                className="inline-flex items-center gap-1 text-blue-700 hover:text-indigo-800 text-sm font-medium"
              >
                <PencilSquareIcon className="w-4 h-4" />
                Edit
              </Link>

              <button
                type="button"
                onClick={() => openDeleteModal(employee)}
                className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 text-sm font-medium"
              >
                <TrashIcon className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    ))
  )}
</div>

{/* DESKTOP: Table (tetap seperti sekarang) */}
<div className="hidden md:block overflow-x-auto border rounded-lg">
  <table className="min-w-full text-sm">
    <thead>
      <tr className="bg-gray-50 text-gray-600 uppercase text-xs">
        <th className="px-4 py-3 text-left font-medium">Photo</th>
        <th className="px-4 py-3 text-left font-medium">Name</th>
        <th className="px-4 py-3 text-left font-medium">Email</th>
        <th className="px-4 py-3 text-left font-medium">Division</th>
        <th className="px-4 py-3 text-left font-medium">Position</th>
        <th className="px-4 py-3 text-center font-medium">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100">
      {employees.data.length === 0 && (
        <tr>
              <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                No employees yet.
              </td>
            </tr>
          )}

          {employees.data.map((employee) => (
            <tr key={employee.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                {employee.photo_path ? (
                  <img
                    src={`/storage/${employee.photo_path}`}
                    alt={employee.name}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-xs text-blue-500 font-semibold">
                    {employee.name.substring(0, 2).toUpperCase()}
                  </div>
                )}
              </td>
              <td className="px-4 py-3 font-medium text-gray-900">{employee.name}</td>
              <td className="px-4 py-3 text-gray-600">{employee.email}</td>
              <td className="px-4 py-3 text-gray-600">{employee.division || '-'}</td>
              <td className="px-4 py-3 text-gray-600">{employee.position || '-'}</td>
              <td className="px-4 py-3 text-center space-x-3 flex mt-3 justify-center">
                <Link
                  href={route('admin.employees.edit', employee.id)}
                  className="flex gap-1 items-center text-blue-700 hover:text-indigo-800 transition-colors"
                >
                  <PencilSquareIcon className="w-4 h-4" />
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => openDeleteModal(employee)}
                  className="text-red-600 flex gap-1 items-center hover:text-red-800 transition-colors"
                >
                  <TrashIcon className="w-4 h-4" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>


        <div className="mt-4 justify-end items-center flex">
          <Pagination links={employees.links} />
        </div>
      </div>


                    <DeleteConfirmModal
                        show={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        onConfirm={handleDelete}
                        title="Delete Employee"
                        message={<>
                                  Are you sure you want to delete{" "}
                                  <strong>{employeeToDelete?.name}</strong>? This action cannot be undone.
                                </>}
                    />
    </AdminLayout>
  );
}