import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { UsersIcon } from '@heroicons/react/24/outline';
import { BellAlertIcon } from '@heroicons/react/24/solid';

const StatusPill = ({ status }) => {
  let color = 'bg-gray-100 text-gray-700';
  if (status === 'sent') {
    color = 'bg-green-100 text-green-700';
  } else if (status === 'failed') {
    color = 'bg-red-100 text-red-700';
  } else if (status === 'pending') {
    color = 'bg-yellow-100 text-yellow-700';
  }
  
  const statusText = 
    status === 'sent' ? 'SENT' : 
    status === 'failed' ? 'FAILED' : 
    status === 'pending' ? 'PENDING' : 
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
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const totalRecipients = announcement.recipients?.length || 0;
  const readCount = announcement.recipients?.filter(r => r.read_at).length || 0;
  const readPercentage = totalRecipients > 0 ? Math.round((readCount / totalRecipients) * 100) : 0;
 
  return (
    <AdminLayout title="Announcement Details">
      <Head title="Announcement Details" />
      <div className="space-y-6">
        
        <div className="bg-white rounded-xl border p-6 lg:p-6">
            <div className="flex justify-between items-center pb-4 border-b mb-6">
  
                <div className="flex items-center">
                  <BellAlertIcon className="w-6 h-6 text-gray-700 mr-3" />
                  <h1 className="text-xl font-semibold text-gray-800">Announcement Details</h1>
                </div> 
                
            </div>
          
            <h1 className="text-xl font-bold text-gray-800 mb-4">{announcement.title}</h1>
            
            <div className="pb-4 mb-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
               <div>
                  <div className="font-semibold text-gray-500">Sender</div>
                  <div className="text-gray-800 font-medium">{announcement.sender || '-'}</div>
               </div>
               <div>
                  <div className="font-semibold text-gray-500">Created At</div>
                  <div>{formatDate(announcement.created_at)}</div>
               </div>
               <div>
                  <div className="font-semibold text-gray-500">Sent At</div>
                  <div>{announcement.sent_at ? formatDate(announcement.sent_at) : 'Belum Dikirim'}</div>
               </div>
               <div>
                  <div className="font-semibold text-gray-500">Total Recipient</div>
                  <div className="text-gray-800 font-medium">{announcement.recipients?.length || 0} People</div>
               </div>
            </div>

            <div className="mt-6">
               <h2 className="text-lg font-semibold text-gray-800 mb-2">Message Content:</h2>
               <div 
                 className="p-4 bg-gray-50 rounded-lg text-sm text-gray-800 whitespace-pre-line leading-relaxed"
                 dangerouslySetInnerHTML={{ __html: announcement.body }}
               />
            </div>

            {announcement.attachments?.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="text-sm font-semibold text-gray-800 mb-2">Attachments ({announcement.attachments.length} file):</div>
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

        <div className="bg-white rounded-xl border p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Engagement Statistics</h2>
            <div className="flex items-center justify-between mb-2 text-sm">
                <span className="text-gray-600">Read Rate</span>
                <span className="font-bold text-gray-900">
                    {readCount} viewed / {totalRecipients} total ({readPercentage}%)
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
                    style={{ width: `${readPercentage}%` }}
                ></div>
            </div>
        </div>

          <div className="bg-white rounded-xl border p-6 lg:p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-4">
            Delivery Status ({announcement.recipients?.length || 0})
          </h2>

          <div className="md:hidden space-y-3">
            {announcement.recipients?.length === 0 ? (
              <div className="bg-white border rounded-xl p-4 text-center text-gray-500">
                No recipient data available.
              </div>
            ) : (
              announcement.recipients.map((r) => (
                <div key={r.id} className="border rounded-xl p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                        Email
                      </div>
                      <div className="text-sm font-semibold text-gray-800 break-all">
                        {r.email_snapshot}
                      </div>
                    </div>

                    <div className="shrink-0">
                      <StatusPill status={r.status} />
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                        Read At
                      </div>
                      {r.read_at ? (
                        <div className="text-green-700 font-semibold">
                          {formatDate(r.read_at)}
                        </div>
                      ) : (
                        <div className="text-gray-400">-</div>
                      )}
                    </div>

                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                        Remarks
                      </div>
                      <div className="text-gray-600 line-clamp-2 break-words">
                        {r.error_message || '-'}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="hidden md:block overflow-x-auto border rounded-lg">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50/80 text-left text-gray-600 uppercase text-xs">
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Read At</th>
                  <th className="px-4 py-3 font-medium">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {announcement.recipients?.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                      No recipient data available.
                    </td>
                  </tr>
                ) : (
                  announcement.recipients.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-medium text-gray-700">{r.email_snapshot}</td>
                      <td className="px-4 py-3">
                        <StatusPill status={r.status} />
                      </td>
                      <td className="px-4 py-3">
                        {r.read_at ? (
                          <div className="flex items-center text-green-700 text-xs font-semibold bg-green-50 px-2 py-1 rounded-full w-fit">
                            {formatDate(r.read_at)}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xs">-</span>
                        )}
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