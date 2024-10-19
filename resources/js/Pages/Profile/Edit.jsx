import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            roles={auth.roles}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
            breadcrumb="Profile"
        >
            <Head title="Profile" />

            <div className="py-4">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
