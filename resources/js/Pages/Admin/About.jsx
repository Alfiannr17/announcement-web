import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { CheckBadgeIcon, CpuChipIcon, ExclamationCircleIcon, SparklesIcon } from '@heroicons/react/24/solid';

export default function About() {
    return (
        <AdminLayout title="About System">
            <Head title="About System" />

            <div className="space-y-6">
                <div className="relative overflow-hidden bg-blue-600 rounded-xl p-6 sm:p-8 text-white ">
                    <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 text-xs font-medium mb-3 backdrop-blur-sm border border-white/10">
                                <CheckBadgeIcon className="w-3 h-3 text-cyan-300" />
                                v1.0.0 Stable Release
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                                Employee Announcement Hub
                            </h1>
                            <p className="text-blue-100 text-sm max-w-2xl leading-relaxed">
                                A centralized internal communication platform designed to ensure that every piece of information is delivered quickly, accurately, and transparently.
                            </p>
                        </div>
                        <div className="hidden sm:block opacity-10">
                            <CheckBadgeIcon className="w-24 h-24" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl border   h-full flex flex-col">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-2 bg-indigo-50 rounded-lg">
                                <CpuChipIcon className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 text-lg">
                                    Technology Stack
                                </h3>
                                <p className="text-xs text-gray-500">
                                    Core System Framework
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3 flex-1">
                            <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-lg text-sm border border-gray-50">
                                <span className="font-medium text-gray-700 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    Laravel 11
                                </span>
                                <span className="text-gray-400 text-xs font-mono">
                                    Backend
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-lg text-sm border border-gray-50">
                                <span className="font-medium text-gray-700 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                    React + Inertia
                                </span>
                                <span className="text-gray-400 text-xs font-mono">
                                    Frontend
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-lg text-sm border border-gray-50">
                                <span className="font-medium text-gray-700 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                                    Tailwind CSS
                                </span>
                                <span className="text-gray-400 text-xs font-mono">
                                    Styling
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border h-full flex flex-col">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-2 bg-yellow-50 rounded-lg">
                                <ExclamationCircleIcon className="w-6 h-6 text-yellow-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 text-lg">
                                    About the Application
                                </h3>
                                <p className="text-xs text-gray-500">
                                    Purpose & Functionality
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 text-sm text-gray-600 leading-relaxed space-y-4">
                            <p>
                                <strong>Employee Announcement Hub</strong> is designed as a digital solution to modernize internal information distribution within organizations.
                            </p>
                            <p>
                                This system replaces traditional manual communication methods with an integrated platform that enables:
                            </p>
                            <ul className="list-disc pl-5 space-y-1 text-gray-500">
                                <li>Scheduled mass email announcements.</li>
                                <li>Real-time read receipt and engagement tracking.</li>
                                <li>Centralized employee data management with targeted audiences.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                
            </div>
        </AdminLayout>
    );
}
