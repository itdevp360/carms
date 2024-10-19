import { useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { FaEye, FaEyeSlash } from "react-icons/fa";


export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const [showCurrentPassword, setShowCurrentPassword] = useState(true);
    const [showNewPassword, setShowNewPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);

    const handleToggleCurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword)
    }
    const handleToggleNewPassword = () => {
        setShowNewPassword(!showNewPassword)
    }
    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const uppercase = /[A-Z]/.test(data.password);
    const number = /[0-9]/.test(data.password);
    const spclchar = /[!@#$%^&*(),.?":{}|<>]/.test(data.password);
    const longEnough = data.password.length >= 8;

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Update Password</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="current_password" value="Current Password" />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type={showCurrentPassword ? "password" : "text"}
                        suffixIcon={showCurrentPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                        togglePassword={handleToggleCurrentPassword}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                    />

                    <InputError message={errors.current_password} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="New Password" />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type={showNewPassword ? "password" : "text" }
                        suffixIcon={showNewPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                        togglePassword={handleToggleNewPassword}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password} className="mt-2" />
                    <ul className='list-disc ms-4 mt-2'>
                        <li className={`text-xs italic ${data.password && (longEnough ? "text-green-600" : "text-red-600")}`}>at least 8 min.</li>
                        <li className={`text-xs italic ${data.password && (spclchar ? "text-green-600" : "text-red-600")}`}>1 special character</li>
                        <li className={`text-xs italic ${data.password && (uppercase ? "text-green-600" : "text-red-600")}`}>1 uppercase</li>
                        <li className={`text-xs italic ${data.password && (number ? "text-green-600" : "text-red-600")}`}>1 number</li>
                    </ul>
                </div>

                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type={showConfirmPassword ? "password" : "text"}
                        suffixIcon={showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                        togglePassword={handleToggleConfirmPassword}
                        className={`mt-1 block w-full 
                            ${data.password_confirmation && (
                                data.password != data.password_confirmation 
                                ? "border-red-500 focus:border-red-500" 
                                : "border-green-500 focus:border-green-500"
                            )}`
                        }
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing} className='w-full'>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
