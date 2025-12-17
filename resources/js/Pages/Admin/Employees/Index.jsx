import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { UsersIcon, ChartBarIcon, ClockIcon } from '@heroicons/react/24/outline'; // Tambahkan ikon
import PrimaryButton from '@/Components/PrimaryButton';

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

export default function Index({ employees }) {
  const { flash, url } = usePage().props;

  return (
    <AdminLayout title="Employee"> 
      <Head title="Data Karyawan" />
      <div className="bg-white rounded-xl shadow p-6">
        
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
              + Add Employee
            </Link>
            </PrimaryButton>
          </div>
        </div>
        
        
        
        {flash?.success && (
          <div className="mb-4 bg-green-100 text-green-800 px-4 py-2 rounded text-sm border border-green-200">
            {flash.success}
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search keyword..."
              className="border rounded-lg px-4 py-2 text-sm w-64"
            />
          </div>
          <button className="px-4 py-2 rounded border text-sm text-gray-600 hover:bg-gray-50 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
            Filter
          </button>
        </div>

        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600 uppercase text-xs">
                <th className="px-4 py-3 text-left font-medium">Foto</th>
                <th className="px-4 py-3 text-left font-medium">Nama</th>
                <th className="px-4 py-3 text-left font-medium">Email</th>
                <th className="px-4 py-3 text-left font-medium">Divisi</th>
                <th className="px-4 py-3 text-left font-medium">Jabatan</th>
                <th className="px-4 py-3 text-center font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {employees.data.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                    Belum ada karyawan.
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
                  <td className="px-4 py-3 text-center space-x-3">
                    <Link
                      href={route('admin.employees.edit', employee.id)}
                      className="text-blue-700 hover:text-indigo-800 transition-colors"
                    >
                      Edit
                    </Link>
                    <Link
                      href={route('admin.employees.destroy', employee.id)}
                      method="delete"
                      as="button"
                      className="text-red-600 hover:text-red-800 transition-colors"
                      onClick={(e) => {
                        if (!confirm('Yakin ingin menghapus karyawan ini?')) {
                          e.preventDefault();
                        }
                      }}
                    >
                      Hapus
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-between items-center text-sm">
          <div className="text-gray-600">
            Showing {employees.from} to {employees.to} of {employees.total} results
          </div>
          <div className="flex space-x-1">
            {employees.links.map((link, i) => (
              <Link
                key={i}
                href={link.url || '#'}
                dangerouslySetInnerHTML={{ __html: link.label }}
                className={`px-3 py-1 rounded-lg transition-colors duration-150 ${
                  link.active ? 'bg-blue-700 text-white font-medium' : 'text-gray-600 hover:bg-gray-100'
                } ${!link.url ? 'text-gray-400 cursor-default' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}