import React, {  useMemo, useEffect, useState  } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import InputError from '@/Components/InputError';
import axios from 'axios';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import RichTextEditor from '@/Components/RichTextEditor';
import Checkbox from '@/Components/Checkbox';

export default function Create({ senders, divisions, positions, employees }) {

  const { data, setData, post, processing, errors } = useForm({
        subject: '',  
        title: '',
        body: '',
        sender: '',
        published_at: '', 
        attachments: [],
        target_type: 'all',         
        target_division: '',
        target_position: '',
        target_employee_ids: [],
        });

  const [sendNow, setSendNow] = useState(true);

  const [previewHtml, setPreviewHtml] = useState('');
  const [previewLoading, setPreviewLoading] = useState(false);

  useEffect(() => {
    if (sendNow) {
        setData('published_at', '');
    }
  }, [sendNow]);

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

  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.division?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
     <AdminLayout title="Create Announcement">
      <Head title="Create Announcement" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
          <div className="bg-white rounded-xl border p-6">
          
          <div className="flex justify-between items-center pb-4 border-b mb-6">
  
                <div className="flex items-center">
                  <PlusCircleIcon className="w-6 h-6 text-gray-700 mr-3" />
                  <h1 className="text-xl font-semibold text-gray-800">Create Announcement</h1>
                </div> 
                
            </div>

          {errors.general && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">Error! </strong>
                  <span className="block sm:inline">{errors.general}</span>
              </div>
          )}

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
              <label className="block text-sm font-medium mb-1">Title</label>
              <TextInput
                type="text"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
              {errors.title && (
                <div className="text-xs text-red-600 mt-1">{errors.title}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Sender</label>
              <select
                value={data.sender}
                onChange={(e) => setData('sender', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Select Sender...</option>
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

            <div className="p-4 bg-gray-50 border rounded-lg">
                <label className="flex items-center space-x-2 mb-2 cursor-pointer">
                    <Checkbox
                        checked={sendNow}
                        onChange={(e) => setSendNow(e.target.checked)}
                    />
                    <span className="text-sm font-medium text-gray-700">Send Now (Immediately)</span>
                </label>

                {!sendNow && (
                    <div className="ml-6 animate-fade-in-down">
                        <label className="block text-sm font-medium mb-1">Schedule for</label>
                        <TextInput
                            type="datetime-local"
                            value={data.published_at}
                            onChange={(e) => setData('published_at', e.target.value)}
                            className="w-full text-sm"
                            min={new Date().toISOString().slice(0, 16)}
                        />
                        {errors.published_at && (
                            <div className="text-xs text-red-600 mt-1">{errors.published_at}</div>
                        )}
                        <p className="text-xs text-gray-500 mt-1">The email will be sent automatically at this time.</p>
                    </div>
                )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Announcement Content
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
               Attachments (you can upload more than one)
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
                  {data.attachments.length} file(s) selected.
                </div>
              )}
            </div>


            <div>
                <label className="block text-sm font-medium mb-1">Recipient Target</label>
                <div className="space-y-2 text-sm">
                    <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="target_type"
                        value="all"
                        checked={data.target_type === 'all'}
                        onChange={(e) => setData('target_type', e.target.value)}
                    />
                    <span>All employees</span>
                    </label>

                    <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="target_type"
                        value="division"
                        checked={data.target_type === 'division'}
                        onChange={(e) => setData('target_type', e.target.value)}
                    />
                    <span>By division</span>
                    </label>

                    {data.target_type === 'division' && (
                    <select
                        className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
                        value={data.target_division}
                        onChange={(e) => setData('target_division', e.target.value)}
                    >
                        <option value="">Select division...</option>
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
                    <span>By position</span>
                    </label>

                    {data.target_type === 'position' && (
                    <select
                        className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
                        value={data.target_position}
                        onChange={(e) => setData('target_position', e.target.value)}
                    >
                        <option value="">Select position...</option>
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
                    <span>Choose specific employees</span>
                    </label>

                    {data.target_type === 'employees' && (
                    <div className="mt-1 max-h-40 overflow-y-auto border  rounded-lg p-2 space-y-1">
                    
                    <div className="mb-4">
                        <TextInput
                            type="text"
                            placeholder="Cari nama atau divisi karyawan..."
                            className="w-full"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    
                        {filteredEmployees.length > 0 ? (
                            filteredEmployees.map((emp) => (
                                <label key={emp.id} className="flex items-center space-x-3 p-1 border-t hover:bg-blue-50  rounded-lg cursor-pointer transition">
                                    <Checkbox
                                        type="checkbox"
                                        value={emp.id}
                                        checked={data.target_employee_ids.includes(emp.id)}
                                        onChange={(e) => {
                                            const id = parseInt(e.target.value);
                                            const newIds = e.target.checked
                                                ? [...data.target_employee_ids, id]
                                                : data.target_employee_ids.filter(i => i !== id);
                                            setData('target_employee_ids', newIds);
                                        }}
                                        
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-700">
                                            {emp.name}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                          {emp.position} - {emp.division}
                                        </span>
                                    </div>
                                </label>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 py-4">Employee not found.</p>
                        )}
                    
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
              >
                {processing ? 'Processing...' : (sendNow ? 'Save & Send' : 'Schedule Announcement')}
              </PrimaryButton>
              <SecondaryButton>
                <Link href={route('admin.announcements.index')}>
                Cancel
                </Link>
               
              </SecondaryButton>
            </div>
          </form>
        </div>

        
        <div className="bg-gray-50 rounded-xl border p-6 lg:p-6">
          <h1 className="border-b pb-4 mb-6 text-xl font-semibold text-gray-800">
            Preview Email to Employees
          </h1>

          <div className="max-w-md mx-auto h-[520px] border rounded-xl overflow-hidden bg-white">
            {previewLoading && !previewHtml && (
              <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                Loading preview...
              </div>
            )}

            {!previewLoading && !previewHtml && (
              <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 px-4 text-center">
                The email preview will appear here after you fill in the title or announcement content.</div>
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