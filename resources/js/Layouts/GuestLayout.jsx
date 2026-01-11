import ApplicationLogo from '@/Components/ApplicationLogo';

export default function GuestLayout({ children }) {
  return (
    <div className="min-h-screen">
     

      <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          
          <div className="rounded-2xl border bg-white">
            <div className="px-6 py-6">{children}</div>
          </div>

                <div className="text-center px-6 pt-8 opacity-60">
                    <p className="text-sm font-medium text-gray-500 italic">
                        "Great communication is the bridge between confusion and clarity."
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                        © {new Date().getFullYear()} Announcement System. All rights reserved.
                    </p>
                </div>
        </div>
      </div>
    </div>
  );
}
