import React, {  useMemo, useEffect, useState  } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { UsersIcon } from '@heroicons/react/24/outline';
import InputError from '@/Components/InputError';
import axios from 'axios';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import RichTextEditor from '@/Components/RichTextEditor';


export default function Create({ senders, divisions, positions, employees }) {
  const { data, setData, post, processing, errors } = useForm({
        subject: '',  
        title: '',
        body: '',
        sender: '',
        attachments: [],
        target_type: 'all',         
        target_division: '',
        target_position: '',
        target_employee_ids: [],
        });

  const [previewHtml, setPreviewHtml] = useState('');
const [previewLoading, setPreviewLoading] = useState(false);

useEffect(() => {
  
  const timeout = setTimeout(() => {
    setPreviewLoading(true);

    axios
      .post(route('admin.announcements.preview'), {
        title: data.title,
        body: data.body,
        sender: data.sender,
      })
      .then((res) => {
        setPreviewHtml(res.data.html);
      })
      .catch(() => {

      })
      .finally(() => {
        setPreviewLoading(false);
      });
  }, 400);

  return () => clearTimeout(timeout);
}, [data.title, data.body, data.sender]);


  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('admin.announcements.store'), {
      forceFormData: true,
    });
  };

  const handleFileChange = (e) => {
    setData('attachments', Array.from(e.target.files));
  };

  const previewBody = useMemo(
    () => (data.body?.trim() ? data.body : 'Isi pengumuman akan tampil di sini...'),
    [data.body]
  );

  const prettySender = useMemo(
    () => data.sender || 'Unit / Departemen',
    [data.sender]
  );

  const prettyTitle = useMemo(
    () => (data.title?.trim() ? data.title : 'Judul Pengumuman'),
    [data.title]
  );

  const prettySubject = useMemo(
  () => data.subject || data.title || 'Subject Email',
  [data.subject, data.title]
  );

  return (
    <AdminLayout title="Buat Pengumuman">
      <Head title="Buat Pengumuman" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
          <div className="bg-white rounded-xl border p-6">
          
          <div className="flex justify-between items-center pb-4 border-b mb-6">
  
                <div className="flex items-center">
                  <UsersIcon className="w-6 h-6 text-gray-700 mr-3" />
                  <h1 className="text-xl font-semibold text-gray-800">Employee</h1>
                </div> 
                
            </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Subject Email</label>
              <TextInput
                type="text"
                value={data.subject}
                onChange={(e) => setData('subject', e.target.value)}
                className="w-full text-sm"
                placeholder="Subject email..."
              />
              {errors.subject && (
                <div className="text-xs text-red-600 mt-1">{errors.subject}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Judul</label>
              <TextInput
                type="text"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              />
              {errors.title && (
                <div className="text-xs text-red-600 mt-1">{errors.title}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Pengirim</label>
              <select
                value={data.sender}
                onChange={(e) => setData('sender', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Pilih pengirim...</option>
                {senders.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.sender && (
                <div className="text-xs text-red-600 mt-1">{errors.sender}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Isi Pengumuman
              </label>
              <RichTextEditor
                  value={data.body}
                  onChange={(html) => setData('body', html)}
              />
              {errors.body && (
                <div className="text-xs text-red-600 mt-1">{errors.body}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-4 text-gray-700">
                Lampiran (boleh lebih dari satu)
              </label>
              <TextInput
                type="file"
                multiple
                onChange={handleFileChange}
                
                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <InputError message={errors['attachments.*']} className="mt-2" />
              {data.attachments.length > 0 && (
                <div className="mt-2 text-xs text-gray-600">
                  {data.attachments.length} file dipilih.
                </div>
              )}
            </div>


            <div>
                <label className="block text-sm font-medium mb-1">Target Penerima</label>
                <div className="space-y-2 text-sm">
                    <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="target_type"
                        value="all"
                        checked={data.target_type === 'all'}
                        onChange={(e) => setData('target_type', e.target.value)}
                    />
                    <span>Semua karyawan</span>
                    </label>

                    <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="target_type"
                        value="division"
                        checked={data.target_type === 'division'}
                        onChange={(e) => setData('target_type', e.target.value)}
                    />
                    <span>Per divisi</span>
                    </label>

                    {data.target_type === 'division' && (
                    <select
                        className="mt-1 w-full border rounded px-3 py-2 text-sm"
                        value={data.target_division}
                        onChange={(e) => setData('target_division', e.target.value)}
                    >
                        <option value="">Pilih divisi...</option>
                        {divisions.map((d) => (
                        <option key={d} value={d}>
                            {d}
                        </option>
                        ))}
                    </select>
                    )}

                    <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="target_type"
                        value="position"
                        checked={data.target_type === 'position'}
                        onChange={(e) => setData('target_type', e.target.value)}
                    />
                    <span>Per jabatan</span>
                    </label>

                    {data.target_type === 'position' && (
                    <select
                        className="mt-1 w-full border rounded px-3 py-2 text-sm"
                        value={data.target_position}
                        onChange={(e) => setData('target_position', e.target.value)}
                    >
                        <option value="">Pilih jabatan...</option>
                        {positions.map((p) => (
                        <option key={p} value={p}>
                            {p}
                        </option>
                        ))}
                    </select>
                    )}

                    <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="target_type"
                        value="employees"
                        checked={data.target_type === 'employees'}
                        onChange={(e) => setData('target_type', e.target.value)}
                    />
                    <span>Pilih karyawan tertentu</span>
                    </label>

                    {data.target_type === 'employees' && (
                    <div className="mt-1 max-h-40 overflow-y-auto border rounded p-2 space-y-1">
                        {employees.map((emp) => (
                        <label
                            key={emp.id}
                            className="flex items-center justify-between text-xs"
                        >
                            <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={data.target_employee_ids.includes(emp.id)}
                                onChange={(e) => {
                                if (e.target.checked) {
                                    setData('target_employee_ids', [
                                    ...data.target_employee_ids,
                                    emp.id,
                                    ]);
                                } else {
                                    setData(
                                    'target_employee_ids',
                                    data.target_employee_ids.filter((id) => id !== emp.id)
                                    );
                                }
                                }}
                            />
                            <span>{emp.name}</span>
                            </div>
                            <span className="text-gray-500">{emp.email}</span>
                        </label>
                        ))}
                    </div>
                    )}
                </div>
                {errors.target_type && (
                    <div className="text-xs text-red-600 mt-1">{errors.target_type}</div>
                )}
                {errors.target_division && (
                    <div className="text-xs text-red-600 mt-1">{errors.target_division}</div>
                )}
                {errors.target_position && (
                    <div className="text-xs text-red-600 mt-1">{errors.target_position}</div>
                )}
                {errors.target_employee_ids && (
                    <div className="text-xs text-red-600 mt-1">
                    {errors.target_employee_ids}
                    </div>
                )}
                </div>


            <div className="pt-2 flex gap-2 ">
              <PrimaryButton
                type="submit"
                disabled={processing}
                className="px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 disabled:opacity-50"
              >
                {processing ? 'Mengirim...' : 'Simpan & Kirim'}
              </PrimaryButton>
              <SecondaryButton>
                <Link href={route('admin.announcements.index')}>
                Batalkan
                </Link>
               
              </SecondaryButton>
            </div>
          </form>
        </div>

        
        <div className="bg-gray-50 rounded-xl border p-6 lg:p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            Preview Email ke Karyawan
          </h2>

          <div className="max-w-md mx-auto h-[520px] border rounded overflow-hidden bg-white">
            {previewLoading && !previewHtml && (
              <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                Memuat preview...
              </div>
            )}

            {!previewLoading && !previewHtml && (
              <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 px-4 text-center">
                Preview email akan muncul di sini setelah Anda mengisi judul atau isi pengumuman.
              </div>
            )}

            {previewHtml && (
              <iframe
                title="Preview Email"
                className="w-full h-full border-0"
          
                srcDoc={previewHtml}
              />
            )}
          </div>
</div>

      </div>
    </AdminLayout>
  );
}
