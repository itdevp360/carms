import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import logo from '../../Images/logo.png';
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import { csrfToken } from '@/constant';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'),{
            _token: csrfToken,
            onFinish: () => reset('password'),
        });
    };
    
    const [showPassword, setShowPassword] = useState(true);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <div className='flex justify-between -my-6 -ms-6'>
                <div className='w-1/2 bg-custom-gradient'>
                    <img className='mt-16 max-w-80 mx-auto block' src={logo} />
                    <p className="title-p -mb-0.5">Corrective Action Request (CAR)</p>
                    <p className="title-p -mt-0.5">Management System</p>
                </div>
                <div className="flex-1 -me-6 basis-[80%] md:basis-[65%] box-border p-8 bg-gradient-login">
                    <div className='mx-12'>
                        <h2 className="title-h2">Login</h2>
                        <p className='mb-[1rem] text-[17px] leading-[25px] text-[rgb(75,74,74)] body'>Please enter your credentials to access the system</p>
                    </div>
                    <form onSubmit={submit} className='mx-12 mt-2 mb-2'>
                        <div>
                            <InputLabel htmlFor="email" value="Email"  className='label mb-2'/>
        
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                placeholder="Enter your email"
                                prefixIcon={<MdEmail  size={18}/>}
                                className="input-field"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
        
                            <InputError message={errors.email} className="mt-2" />
                        </div>
        
                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" className='label mb-2'/>
        
                            <TextInput
                                id="password"
                                type={showPassword ? "password" : "text"}
                                suffixIcon={showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                togglePassword={handleTogglePassword}
                                name="password"
                                value={data.password}
                                placeholder="Enter your password"
                                prefixIcon={<FaKey  size={18} />}
                                className="input-field"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
        
                            <InputError message={errors.password} className="mt-2" />
                        </div>
        
                        <div className="flex justify-end block mt-4 label">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ms-2 text-sm text-gray-600">Remember me</span>
                            </label>
                        </div>
        
                        <div className="flex items-center justify-center mt-4">
                            <PrimaryButton disabled={processing} className='w-full h-10'>
                                Log in
                            </PrimaryButton>
                        </div>
                        <div className="flex items-center justify-center mt-4">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="ms-4 hover:underline text-md text-gray font-semibold hover:text-[#cf420094] rounded-md focus:outline-none"
                                >
                                    Forgot your password?
                                </Link>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
