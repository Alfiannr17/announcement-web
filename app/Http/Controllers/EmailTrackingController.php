<?php

namespace App\Http\Controllers;

use App\Models\AnnouncementRecipient;
use Illuminate\Http\Request;

class EmailTrackingController extends Controller
{
    public function __invoke(Request $request, $id)
    {
        if (! $request->hasValidSignature()) {
            abort(403, 'Invalid signature.');
        }

        $recipient = AnnouncementRecipient::find($id);

        if ($recipient && is_null($recipient->read_at)) {
            $recipient->update([
                'read_at' => now(),
            ]);
        }

        $pixel = base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=');

        return response($pixel, 200)
            ->header('Content-Type', 'image/png')
            ->header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    }
}