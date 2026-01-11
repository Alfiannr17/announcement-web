import AdminLayout from "@/Layouts/AdminLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import ButtonDetails from "@/Components/ButtonDetails";

function getInitials(name = "") {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  const a = (parts[0]?.[0] || "A").toUpperCase();
  const b = (parts[1]?.[0] || "").toUpperCase();
  return (a + b).trim();
}

export default function Profile({ auth, profile }) {
  const { flash } = usePage().props;

  const { data, setData, patch, processing, errors } = useForm({
    name: profile?.name || auth?.user?.name || "",
    email: profile?.email || auth?.user?.email || "",
  });

  const initials = getInitials(data.name || auth?.user?.name);

  const submit = (e) => {
    e.preventDefault();
    patch(route("admin.profile.update"));
  };

  return (
    <AdminLayout auth={auth} title="Profile">
  <Head title="Profile" />

  <div className="space-y-6">
    {flash?.success && (
      <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
        {flash.success}
      </div>
    )}

    <div className="rounded-xl border bg-white">
      <div className="p-6 border-b">
        <div className="flex items-center gap-4">
                    <img
                        className="h-14 w-14 rounded-full object-cover"
                        src={`https://ui-avatars.com/api/?name=${auth?.user?.name || 'User'}&background=1d4ed8&color=fff&bold=true`}
                        alt={auth?.user?.name}
                    />            

          <div className="min-w-0">
            <p className="font-bold text-gray-900 truncate">
              {auth?.user?.name || data.name || "Admin"}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {auth?.user?.email || data.email || "-"}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={submit} className="space-y-5">
          <div>
            <InputLabel htmlFor="name" value="Full Name" />
            <TextInput
              id="name"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              className="mt-1 block w-full"
              placeholder="Example: Admin Announcement"
            />
            <InputError message={errors.name} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              className="mt-1 block w-full"
              placeholder="admin@announcement.com"
            />
            <InputError message={errors.email} className="mt-2" />
          </div>

          <div className="flex justify-end">
            <PrimaryButton disabled={processing}>
              {processing ? "Saving..." : "Save Changes"}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>

    <div className="rounded-xl border bg-white">
      <div className="p-6 border-b">
        <h2 className="font-bold text-gray-900">Security</h2>
        <p className="text-sm text-gray-500 mt-1">
          Reset your password when needed.
        </p>
      </div>

      <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="text-sm text-gray-600">
          Send a password reset link to your email address.
        </div>

        <div className="flex w-full md:w-auto gap-2">
          <Link
            href={route("password.request")}
            
          >
            <ButtonDetails className="py-2 px-4 hover:bg-blue-100">Forgot Password</ButtonDetails>
          </Link>
          <Link
            href={route('logout')}
            method="post"
            as="button"
            className="block "
          >
            <ButtonDetails className="py-2 px-4 items-center bg-red-50 border border-red-400 text-red-600 hover:bg-red-100">
                Log Out
            </ButtonDetails>
            
          </Link>
        </div>
      </div>
    </div>
  </div>
</AdminLayout>

  );
}
