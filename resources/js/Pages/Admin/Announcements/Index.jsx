import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { UsersIcon } from '@heroicons/react/24/outline';

export default function Index({ announcements }) {
  const { flash } = usePage().props;

  const formatDate = (dateString) => {
    if (!dateString) return '-';

    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <AdminLayout title="Pengumuman">
      <Head title="Pengumuman" />
     
      <div className="bg-white rounded-xl border p-4 lg:p-6">
        <div className="flex justify-between items-center  pb-4 border-b mb-6">
          <div className="flex items-center">
            <UsersIcon className="w-6 h-6 text-gray-700 mr-3" />
            <h1 className="text-xl font-semibold text-gray-800">Employee</h1>
          </div>
          <PrimaryButton>
          <Link
            href={route('admin.announcements.create')}
          >
            + Buat Pengumuman
          </Link>
          </PrimaryButton>
        </div>

         {flash?.success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center shadow-sm">
           <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           <span>{flash.success}</span>
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
              <tr className="border-b bg-gray-50/80 text-left text-gray-600 uppercase text-xs">
                <th className="px-4 py-3 font-medium">Judul</th>
                <th className="px-4 py-3 font-medium">Pengirim</th>
                <th className="px-4 py-3 font-medium">Dibuat</th>
                <th className="px-4 py-3 font-medium">Dikirim</th>
                <th className="px-4 py-3 font-medium text-center">Penerima</th>
                <th className="px-4 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {announcements.data.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                    Belum ada pengumuman.
                  </td>
                </tr>
              )}

              {announcements.data.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50 transition">
                  {/* Truncate judul agar tidak merusak layout */}
                  <td className="px-4 py-3 font-medium text-gray-800 max-w-xs truncate">{a.title}</td>
                  <td className="px-4 py-3">{a.sender || '-'}</td>
                  <td className="px-4 py-3 text-gray-600">{formatDate(a.created_at)}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {a.sent_at ? formatDate(a.sent_at) : (
                        <span className="text-xs font-semibold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full">DRAFT</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-800 font-medium">{a.recipients_count}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={route('admin.announcements.show', a.id)}
                      className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium"
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}