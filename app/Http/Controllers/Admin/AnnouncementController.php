<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Jobs\SendAnnouncementEmailJob;
use App\Models\Announcement;
use App\Models\AnnouncementAttachment;
use App\Models\AnnouncementRecipient;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AnnouncementController extends Controller
{
    public function index()
    {
        $announcements = Announcement::withCount('recipients')
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Announcements/Index', [
            'announcements' => $announcements,
        ]);
    }

    public function create()
    {
        $senders = ['HRD', 'Finance', 'Direksi', 'Manajemen'];

    $divisions = \App\Models\Employee::whereNotNull('division')
        ->where('division', '!=', '')
        ->distinct()
        ->pluck('division')
        ->values();

    $positions = \App\Models\Employee::whereNotNull('position')
        ->where('position', '!=', '')
        ->distinct()
        ->pluck('position')
        ->values();

    $employees = \App\Models\Employee::select('id', 'name', 'email')
        ->orderBy('name')
        ->get();

    return Inertia::render('Admin/Announcements/Create', [
        'senders'   => $senders,
        'divisions' => $divisions,
        'positions' => $positions,
        'employees' => $employees,
    ]);
    }

    public function store(Request $request)
        {
            $data = $request->validate([
                'title'       => ['required', 'string', 'max:255'],
                'body'        => ['required', 'string'],
                'sender'      => ['nullable', 'string', 'max:255'],
                'attachments' => ['nullable', 'array'],
                'attachments.*' => ['file', 'max:5120'],
                'target_type'          => ['required', 'in:all,division,position,employees'],
                'target_division'      => ['nullable', 'string', 'max:255'],
                'target_position'      => ['nullable', 'string', 'max:255'],
                'target_employee_ids'  => ['nullable', 'array'],
                'target_employee_ids.*'=> ['integer', 'exists:employees,id'],
            ]);

            if ($data['target_type'] === 'division') {
                $request->validate([
                    'target_division' => ['required', 'string'],
                ]);
            }

            if ($data['target_type'] === 'position') {
                $request->validate([
                    'target_position' => ['required', 'string'],
                ]);
            }

            if ($data['target_type'] === 'employees') {
                $request->validate([
                    'target_employee_ids' => ['required', 'array', 'min:1'],
                ]);
            }

            DB::beginTransaction();

            try {
                $announcement = Announcement::create([
                    'title'      => $data['title'],
                    'subject'    => ['nullable', 'string', 'max:255'],
                    'body'       => $data['body'],
                    'sender'     => $data['sender'] ?? null,
                    'created_by' => Auth::id(),
                ]);

                if ($request->hasFile('attachments')) {
                    foreach ($request->file('attachments') as $file) {
                        $path = $file->store('announcement_attachments', 'public');
                        AnnouncementAttachment::create([
                            'announcement_id' => $announcement->id,
                            'file_path'       => $path,
                            'original_name'   => $file->getClientOriginalName(),
                            'mime_type'       => $file->getClientMimeType(),
                        ]);
                    }
                }

                switch ($data['target_type']) {
                    case 'division':
                        $employees = Employee::where('division', $data['target_division'])->get();
                        break;

                    case 'position':
                        $employees = Employee::where('position', $data['target_position'])->get();
                        break;

                    case 'employees':
                        $employees = Employee::whereIn('id', $data['target_employee_ids'])->get();
                        break;

                    case 'all':
                    default:
                        $employees = Employee::all();
                        break;
                }

                foreach ($employees as $employee) {
                    $recipient = AnnouncementRecipient::create([
                        'announcement_id' => $announcement->id,
                        'employee_id'     => $employee->id,
                        'email_snapshot'  => $employee->email,
                        'status'          => 'pending',
                    ]);

                    dispatch(new SendAnnouncementEmailJob($recipient->id));
                }

                $announcement->update([
                    'sent_at' => now(),
                ]);

                DB::commit();

                return redirect()
                    ->route('admin.announcements.index')
                    ->with('success', 'Pengumuman berhasil dibuat dan dijadwalkan untuk dikirim.');
            } catch (\Throwable $e) {
                DB::rollBack();

                return back()
                    ->withErrors(['general' => 'Terjadi kesalahan: ' . $e->getMessage()])
                    ->withInput();
            }
        }


    public function show(Announcement $announcement)
    {
        $announcement->load(['attachments', 'recipients']);

        return Inertia::render('Admin/Announcements/Show', [
            'announcement' => $announcement,
        ]);
    }
}
