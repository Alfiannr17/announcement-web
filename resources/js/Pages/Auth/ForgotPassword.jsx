import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600">
                <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Forgot your password?</h1>
                        <p className="text-gray-500 mt-4">No problem. Just let us know your email
                        address and we will email you a password reset link that will
                        allow you to choose a new one.</p>
                    </div>
                
                
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="mt-4 w-full items-center ">
                    <Link href='#' className="block" >
                    <PrimaryButton className='w-full items-center'  disabled={processing}>
                        Email Password Reset Link
                    </PrimaryButton>
                    </Link>
                    <Link href={route('login')} className="block">
                        <SecondaryButton className='w-full mt-1 text-gray-500 items-center'>
                            Back to Login
                        </SecondaryButton>
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
