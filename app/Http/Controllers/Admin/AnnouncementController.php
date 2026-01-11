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
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Mews\Purifier\Facades\Purifier; 

class AnnouncementController extends Controller
{
    public function index(Request $request)
    {
        $query = Announcement::withCount('recipients');

        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('title', 'like', "%{$request->search}%")
                ->orWhere('body', 'like', "%{$request->search}%");
            });
        }

        if ($request->sender) {
            $query->where('sender', $request->sender);
        }

        if ($request->date_from) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }
        if ($request->date_to) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $announcements = $query->latest()->paginate(10)->withQueryString();

        $senders = Announcement::whereNotNull('sender')->distinct()->pluck('sender');

        return Inertia::render('Admin/Announcements/Index', [
            'announcements' => $announcements,
            'filters' => $request->only(['search', 'sender', 'date_from', 'date_to']),
            'senderOptions' => $senders
        ]);
    }

    public function create()
    {
        $senders = ['HRD', 'Finance', 'Direksi', 'Manajemen'];

        $divisions = Employee::whereNotNull('division')
            ->where('division', '!=', '')
            ->distinct()
            ->pluck('division')
            ->values();

        $positions = Employee::whereNotNull('position')
            ->where('position', '!=', '')
            ->distinct()
            ->pluck('position')
            ->values();

        $employees = Employee::select('id', 'name', 'email', 'division', 'position')
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
            'title'         => ['required', 'string', 'max:255'],
            'subject'       => ['nullable', 'string', 'max:255'],
            'body'          => ['required', 'string'],
            'sender'        => ['nullable', 'string', 'max:255'],
            'published_at'  => ['nullable', 'date'],
            'attachments'   => ['nullable', 'array'],
            'attachments.*' => ['file', 'max:5120'],
            'target_type'          => ['required', 'in:all,division,position,employees'],
            'target_division'      => ['nullable', 'string', 'max:255'],
            'target_position'      => ['nullable', 'string', 'max:255'],
            'target_employee_ids'  => ['nullable', 'array'],
            'target_employee_ids.*'=> ['integer', 'exists:employees,id'],
        ]);

        if ($data['target_type'] === 'division') {
            $request->validate(['target_division' => ['required', 'string']]);
        }
        if ($data['target_type'] === 'position') {
            $request->validate(['target_position' => ['required', 'string']]);
        }
        if ($data['target_type'] === 'employees') {
            $request->validate(['target_employee_ids' => ['required', 'array', 'min:1']]);
        }

        DB::beginTransaction();

        try {
            $cleanBody = Purifier::clean($data['body']);

            $announcement = Announcement::create([
                'title'        => $data['title'],
                'subject'      => $data['subject'] ?? null,
                'body'         => $cleanBody, 
                'sender'       => $data['sender'] ?? null,
                'published_at' => $data['published_at'] ?? null,
                'created_by'   => Auth::id(),
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

            $jobs = [];

            foreach ($employees as $employee) {
                $recipient = AnnouncementRecipient::create([
                    'announcement_id' => $announcement->id,
                    'employee_id'     => $employee->id,
                    'email_snapshot'  => $employee->email,
                    'status'          => 'pending',
                ]);

                $jobs[] = new SendAnnouncementEmailJob($recipient->id);
            }

            $shouldSendNow = empty($data['published_at']) || strtotime($data['published_at']) <= time();
            $message = 'Pengumuman berhasil dijadwalkan.';

            if ($shouldSendNow && count($jobs) > 0) {
                Bus::batch($jobs)
                    ->name('Pengumuman: ' . $announcement->title)
                    ->onQueue('default')
                    ->dispatch();

                $announcement->update(['sent_at' => now()]);
                $message = 'Pengumuman sedang diproses untuk dikirim.';
            }

            DB::commit();

            return redirect()
                ->route('admin.announcements.index')
                ->with('success', $message);

        } catch (\Throwable $e) {
            DB::rollBack();
            return back()
                ->withErrors(['title' => 'System Error: ' . $e->getMessage()])
                ->withInput();
        }
    }

    public function show(Announcement $announcement)
    {
        $announcement->load(['attachments', 'recipients.employee']);

        return Inertia::render('Admin/Announcements/Show', [
            'announcement' => $announcement,
        ]);
    }
}