import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    division: '',
    position: '',
    photo: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('admin.employees.store'), {
      forceFormData: true,
    });
  };

  return (
    <AdminLayout title="Tambah Karyawan">
      <Head title="Tambah Karyawan" />

      <div className="bg-white rounded-xl p-6 lg:p-6">
        <div className="flex justify-between items-center pb-4 border-b mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Tambah Karyawan Baru</h1>
            <Link
                href={route('admin.employees.index')}
                className="text-sm text-blue-600 hover:text-blue-800 transition flex items-center space-x-1"
            >
                 <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                <span>Kembali</span>
            </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 w-full">
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

        <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Nama Lengkap</label>
            <TextInput
                type="text"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="w-full text-sm"
            />
            <InputError message={errors.name} className="mt-2" />
        </div>

        <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
            <TextInput
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                className="w-full text-sm"
            />
            <InputError message={errors.email} className="mt-2" />
        </div>

        <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Divisi</label>
            <TextInput
                type="text"
                value={data.division}
                onChange={(e) => setData('division', e.target.value)}
                className="w-full text-sm"
            />
            <InputError message={errors.division} className="mt-2" />
        </div>

        <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Jabatan</label>
            <TextInput
                type="text"
                value={data.position}
                onChange={(e) => setData('position', e.target.value)}
                className="w-full text-sm"
            />
            <InputError message={errors.position} className="mt-2" />
        </div>

    </div>

          <div>
            <label className="block text-sm font-medium mb-4 text-gray-700">
              Foto Profil (opsional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setData('photo', e.target.files[0])}
       
              className=" w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-200"
            />
            <InputError message={errors.photo} className="mt-2" />
          </div>

          <div className="pt-4">
            <PrimaryButton
              type="submit"
              disabled={processing}
            >
              {processing ? 'Menyimpan...' : 'Simpan Karyawan'}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}