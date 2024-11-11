import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { useState } from 'react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };
    const [showPassword, setShowPassword] = useState(true);
    const handleTogglePassword = () => {
        setShowPassword(!showPassword)
    }

    const [showConfirmPassword, setShowConfirmPassword] = useState(true);
    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    return (
        <GuestLayout className="sm:max-w-2xl">
            <Head title="Reset Password" />
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type={showPassword ? "password" : "text"}
                        suffixIcon={showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                        togglePassword={handleTogglePassword}
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                    {(!(/[^a-zA-Z0-9]+/.test(data.password)) || !(/[A-Z]+/.test(data.password)) || !(/[0-9]+/.test(data.password)) || data.password.length < 8) && (
                        <div class="mt-2 ms-4 text-xs italic">
                        <ul className='list-disc'>
                            <li className={`${data.password.length >= 8 ? "text-green-500" : "text-red-500"}`}> At least 8 min. </li>
                            <li className={`${/[^a-zA-Z0-9]+/.test(data.password) ? "text-green-500" : "text-red-500"}`}> 1 Special Character </li>
                            <li className={`${/[A-Z]/.test(data.password) ? "text-green-500" : "text-red-500"}`}> 1 Uppercase </li>
                            <li className={`${/[0-9]/.test(data.password) ? "text-green-500" : "text-red-500"}`}> 1 Number </li>
                        </ul>
                        </div>
                    )}
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        type={showConfirmPassword ? "password" : "text"}
                        suffixIcon={showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                        togglePassword={handleToggleConfirmPassword}
                        id="password_confirmation"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className={`mt-1 block w-full ${data.password === data.password_confirmation ? "focus:border-green-500" : "focus:border-red-500"}`}
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="w-full" disabled={processing}>
                        Reset Password
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
