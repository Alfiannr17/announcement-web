import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { UsersIcon, MegaphoneIcon, EnvelopeOpenIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import PrimaryButton from '@/Components/PrimaryButton';
import ButtonDetails from '@/Components/ButtonDetails';

export default function Dashboard({ totalEmployee, totalAnnouncement, chartData, totalEmailsSent, globalReadRate, recentAnnouncements }) {
    const colors = ['#3b82f6', '#2563eb', '#1d4ed8', '#1e40af'];

    return (
        <AdminLayout title="Dashboard">
            <Head title="Dashboard Admin" />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                <div className="bg-white rounded-xl p-3 sm:p-6 border">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs sm:text-lg font-medium text-gray-500">Total Employees</h3>
                        <UsersIcon className="w-4 h-4 sm:w-6 sm:h-6 text-blue-700" />
                    </div>
                    <p className="mt-1 sm:mt-2 text-xl sm:text-3xl font-bold text-black">{totalEmployee}</p>
                </div>

                <div className="bg-white rounded-xl p-3 sm:p-6 border">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs sm:text-lg font-medium text-gray-500">Total Announcements</h3>
                        <MegaphoneIcon className="w-4 h-4 sm:w-6 sm:h-6 text-blue-700" />
                    </div>
                    <p className="mt-1 sm:mt-2 text-xl sm:text-3xl font-bold text-black">{totalAnnouncement}</p>
                </div>

                <div className="bg-white rounded-xl p-3 sm:p-6 border">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs sm:text-lg font-medium text-gray-500">Email Sent</h3>
                        <EnvelopeOpenIcon className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
                    </div>
                    <p className="mt-1 sm:mt-2 text-xl sm:text-3xl font-bold text-black">{totalEmailsSent}</p>
                </div>

                <div className="bg-white rounded-xl p-3 sm:p-6 border">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs sm:text-lg font-medium text-gray-500">Global Read Rate</h3>
                        <ChartBarIcon className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
                    </div>
                    <div className="flex items-end mt-1 sm:mt-2">
                        <p className="text-xl sm:text-3xl font-bold text-black mr-1 sm:mr-2">{globalReadRate}%</p>
                        <span className="text-[10px] sm:text-sm text-gray-400 mb-0 sm:mb-1">read rate</span>
                    </div>
                </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl border mb-6">
                <div className="mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">Announcement Statistik</h3>
                    <p className="text-gray-500 text-xs sm:text-sm">
                        Number of announcements sent each month in {new Date().getFullYear()}
                    </p>
                </div>

                <div className="h-[250px] sm:h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9ca3af', fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                            <Tooltip
                                cursor={{ fill: '#f9fafb' }}
                                contentStyle={{
                                    borderRadius: '12px',
                                    border: 'none',
                                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                                }}
                            />
                            <Bar dataKey="total" radius={[6, 6, 0, 0]} barSize={40}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white rounded-xl border overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="text-base sm:text-lg font-bold text-gray-800">Recent Announcements</h3>
                    <Link href={route('admin.announcements.index')} className="flex items-center">
                        <PrimaryButton>View All</PrimaryButton>
                    </Link>
                </div>

                <div className="sm:hidden p-4 space-y-3">
                    {recentAnnouncements.length === 0 ? (
                        <div className="py-6 text-center text-gray-400 text-sm">No announcements found.</div>
                    ) : (
                        recentAnnouncements.map((item) => (
                            <div key={item.id} className="border rounded-xl p-3">
                                <div className="font-semibold text-gray-900 text-md line-clamp-2">
                                    {item.title}
                                </div>

                                <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                                    <div>
                                        {item.sent_at ? (
                                            new Date(item.sent_at).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })
                                        ) : (
                                            <span className="text-yellow-700 bg-yellow-100 px-2 py-1 rounded font-bold">
                                                Scheduled
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-gray-500">{item.sender || '-'}</div>
                                </div>

                                <div className="mt-3 flex items-center gap-2">
                                    <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                                        <div
                                            className="bg-blue-600 h-1.5 rounded-full"
                                            style={{ width: `${item.read_rate}%` }}
                                        />
                                    </div>
                                    <div className="text-xs font-medium text-gray-700 w-10 text-right">
                                        {item.read_rate}%
                                    </div>
                                </div>

                                <div className="mt-4">
                                  <Link href={route('admin.announcements.show', item.id)} className="block">
                                    <ButtonDetails className="w-full py-2 justify-center">
                                      Details
                                    </ButtonDetails>
                                  </Link>
                                </div>

                            </div>
                        ))
                    )}
                </div>

                <div className="hidden sm:block overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 sm:px-6">Title</th>
                                <th className="px-4 py-3 sm:px-6">Date Sent</th>
                                <th className="px-4 py-3 sm:px-6">Sender</th>
                                <th className="px-4 py-3 sm:px-6">Engagement (Read Rate)</th>
                                <th className="px-4 py-3 sm:px-6 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentAnnouncements.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                                        No announcements found.
                                    </td>
                                </tr>
                            ) : (
                                recentAnnouncements.map((item) => (
                                    <tr key={item.id} className="bg-white border-b hover:bg-gray-50 transition">
                                        <td className="px-4 py-3 sm:px-6 font-medium text-gray-900">{item.title}</td>
                                        <td className="px-4 py-3 sm:px-6">
                                            {item.sent_at ? (
                                                new Date(item.sent_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })
                                            ) : (
                                                <span className="text-yellow-600 bg-yellow-100 px-2 py-1 rounded text-xs font-bold">
                                                    Scheduled
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 sm:px-6">{item.sender || '-'}</td>
                                        <td className="px-4 py-3 sm:px-6">
                                            <div className="flex items-center">
                                                <div className="w-16 sm:w-24 bg-gray-200 rounded-full h-1.5 mr-2">
                                                    <div
                                                        className="bg-blue-600 h-1.5 rounded-full"
                                                        style={{ width: `${item.read_rate}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-medium text-gray-700">{item.read_rate}%</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 sm:px-6 text-right">
                                            <Link
                                                href={route('admin.announcements.show', item.id)}
                                                className="text-blue-600 hover:text-blue-900 font-medium hover:underline"
                                            >
                                                Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
