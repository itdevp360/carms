import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import logo from '../../Images/logo.png';
import InputLabel from '@/Components/InputLabel';
import { MdEmail } from 'react-icons/md';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout className="sm:max-w-7xl">
            <Head title="Forgot Password" />

            <div className='flex justify-between -my-4 -ms-6'>
                <div className='w-1/2 bg-custom-gradient'>
                    <img className='mt-16 max-w-80 mx-auto block' src={logo} />
                    <p className="title-p -mb-0.5">Corrective Action Request (CAR)</p>
                    <p className="title-p -mt-0.5">Management System</p>
                </div>
                <div className='className="flex-1 -ms-1 -me-6 basis-[80%] md:basis-[65%] box-border p-8 bg-gradient-login'>
                    <div className='mx-12 mt-16'>
                        <h2 className="title-h2">Forgot Password</h2>
                        <p className='mb-[1rem] text-[17px] leading-[25px] text-[rgb(75,74,74)] body'>Please enter your email to change your password</p>
                    </div>
        
                    {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
        
                    <form onSubmit={submit} className='mx-12 mt-2 mb-2'>
                        <div>
                            <InputLabel htmlFor="email" value="Email"  className='label mb-2'/>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="input-field"
                                prefixIcon={<MdEmail  className="text-gray-400" />}
                                placeholder="Enter your Email"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
            
                            <InputError message={errors.email} className="mt-2" />
                        </div>
        
                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton className="mt-2 w-full h-10" disabled={processing}>
                                Send Reset Link
                            </PrimaryButton>
                        </div>
                        <div className="flex items-center justify-center mt-4">
                                <Link
                                    href={route('login')}
                                    className="ms-4 hover:underline text-md text-gray font-semibold hover:text-[#cf420094] rounded-md focus:outline-none"
                                >
                                    Return to Login
                                </Link>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
