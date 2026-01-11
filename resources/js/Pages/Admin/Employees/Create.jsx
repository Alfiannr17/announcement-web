import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { PlusCircleIcon, UserIcon } from '@heroicons/react/24/solid';
import SecondaryButton from '@/Components/SecondaryButton';

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
    <AdminLayout title="Add Employee">
      <Head title="Add Employee" />

      <div className="bg-white rounded-xl border p-6 lg:p-6">
        <div className="flex justify-between items-center pb-4 border-b mb-6">
          <div className="flex items-center">
            <PlusCircleIcon className="w-6 h-6 text-gray-700 mr-3" />
            <h1 className="text-xl font-semibold text-gray-800">Add Employee</h1>
          </div>
            
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

        <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Full Name</label>
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
            <label className="block text-sm font-medium mb-1 text-gray-700">Division</label>
            <TextInput
                type="text"
                value={data.division}
                onChange={(e) => setData('division', e.target.value)}
                className="w-full text-sm"
            />
            <InputError message={errors.division} className="mt-2" />
        </div>

        <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Position</label>
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
              Photo Profile (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setData('photo', e.target.files[0])}
       
              className=" w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-200"
            />
            <InputError message={errors.photo} className="mt-2" />
          </div>

          <div className="pt-2 flex gap-2">
            <PrimaryButton
              type="submit"
              disabled={processing}
            >
              {processing ? 'Saving...' : 'Save'}
            </PrimaryButton>
            <SecondaryButton>
              <Link  href={route('admin.employees.index')}>
              Cancel
              </Link>
              </SecondaryButton>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}