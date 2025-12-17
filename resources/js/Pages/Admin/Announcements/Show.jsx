import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { UsersIcon } from '@heroicons/react/24/outline';

const StatusPill = ({ status }) => {
  let color = 'bg-gray-100 text-gray-700';
  if (status === 'sent') {
    color = 'bg-green-100 text-green-700';
  } else if (status === 'failed') {
    color = 'bg-red-100 text-red-700';
  } else if (status === 'pending') {
    color = 'bg-yellow-100 text-yellow-700';
  }
  
  // Mengubah teks status dari bahasa inggris ke bahasa indonesia
  const statusText = 
    status === 'sent' ? 'TERKIRIM' : // Menggunakan huruf kapital seperti di contoh
    status === 'failed' ? 'GAGAL' : 
    status === 'pending' ? 'MENUNGGU' : 
    status;

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${color}`}
    >
      {statusText}
    </span>
  );
};

export default function Show({ announcement }) {
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <AdminLayout title="Detail Pengumuman">
      <Head title="Detail Pengumuman" />
      <div className="space-y-6">
        
        <div className="bg-white rounded-xl border p-6 lg:p-6">
            <div className="flex justify-between items-center pb-4 border-b mb-6">
  
                <div className="flex items-center">
                  <UsersIcon className="w-6 h-6 text-gray-700 mr-3" />
                  <h1 className="text-xl font-semibold text-gray-800">Employee</h1>
                </div> 
                
            </div>
          
            <h1 className="text-xl font-bold text-gray-800 mb-4">{announcement.title}</h1>
            
            <div className="pb-4 mb-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
               <div>
                  <div className="font-semibold text-gray-500">Pengirim</div>
                  <div className="text-gray-800 font-medium">{announcement.sender || '-'}</div>
               </div>
               <div>
                  <div className="font-semibold text-gray-500">Dibuat Pada</div>
                  <div>{formatDate(announcement.created_at)}</div>
               </div>
               <div>
                  <div className="font-semibold text-gray-500">Dikirim Pada</div>
                  <div>{announcement.sent_at ? formatDate(announcement.sent_at) : 'Belum Dikirim'}</div>
               </div>
               <div>
                  <div className="font-semibold text-gray-500">Total Penerima</div>
                  <div className="text-gray-800 font-medium">{announcement.recipients?.length || 0} orang</div>
               </div>
            </div>

            <div className="mt-6">
               <h2 className="text-lg font-semibold text-gray-800 mb-2">Isi Pesan:</h2>
               <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-800 whitespace-pre-line leading-relaxed">
                  {announcement.body}
               </div>
            </div>

            {announcement.attachments?.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="text-sm font-semibold text-gray-800 mb-2">Lampiran ({announcement.attachments.length} file):</div>
                <ul className="space-y-1">
                  {announcement.attachments.map((att) => (
                    <li key={att.id} className="text-sm">
                      <a
                        href={`/storage/${att.file_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 hover:underline flex items-center"
                      >
                        <svg className="h-4 w-4 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13.5"/></svg>
                        {att.original_name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>

           <div className="bg-white rounded-xl border p-6 lg:p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-4">Status Pengiriman ({announcement.recipients?.length || 0})</h2>
            <div className="overflow-x-auto border rounded-lg">
                <table className="min-w-full text-sm ">
                    <thead>
                        <tr className="border-b bg-gray-50/80 text-left text-gray-600 uppercase text-xs">
                            <th className="px-4 py-3 font-medium">Email</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3 font-medium">Keterangan</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {announcement.recipients?.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="px-4 py-4 text-center text-gray-500">
                                    Tidak ada data penerima.
                                </td>
                            </tr>
                        ) : (
                            announcement.recipients.map((r) => (
                                <tr key={r.id} className="hover:bg-gray-50 transition">
                                    <td className="px-4 py-3 font-medium text-gray-700">{r.email_snapshot}</td>
                                    <td className="px-4 py-3">
                                        <StatusPill status={r.status} />
                                    </td>
                                    <td className="px-4 py-3 text-xs text-gray-500">
                                        {r.error_message || '-'}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </AdminLayout>
  );
}