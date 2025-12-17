import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { UsersIcon, MegaphoneIcon, ClockIcon } from '@heroicons/react/24/outline'; 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Dashboard({ totalEmployee, totalAnnouncement, chartData }) {
   
    const colors = ['#3b82f6', '#2563eb', '#1d4ed8', '#1e40af'];
  return (
    <AdminLayout title="Dashboard">
      <Head title="Dashboard Admin" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-2 mb-4 ">
        <div className="bg-white rounded-xl  p-6  border ">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-500">
              Total Karyawan
            </h3>
            <UsersIcon className="w-6 h-6 text-blue-700" />
          </div>
          <p className="mt-2 text-3xl font-bold text-black">
            {totalEmployee}
          </p>
        </div>
        <div className="bg-white rounded-xl  p-6  border ">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-500">
              Total Pengumuman
            </h3>
            <MegaphoneIcon className="w-6 h-6 text-blue-700" />
          </div>
          <p className="mt-2 text-3xl font-bold text-black">
            {totalAnnouncement}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl  border">
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Statistik Pengumuman</h3>
                    <p className="text-gray-500 text-sm">Jumlah pengumuman yang dikirim setiap bulan di tahun {new Date().getFullYear()}</p>
                </div>
                
                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis 
                                dataKey="name" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{fill: '#9ca3af', fontSize: 12}}
                                dy={10}
                            />
                            <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{fill: '#9ca3af', fontSize: 12}}
                            />
                            <Tooltip 
                                cursor={{fill: '#f9fafb'}}
                                contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
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
    </AdminLayout>
  );
}