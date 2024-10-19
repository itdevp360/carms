import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import RegisterFormComponent from '@/Components/Register/RegisterFormComponent';

export default function Register({auth, roles}) {
    console.log(roles);
    return (
        <AuthenticatedLayout
            user={auth.user}
            roles={auth.roles}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Register</h2>}
            breadcrumb="Register"
        >
            <Head title="Register" />
            <RegisterFormComponent roles={roles} />
        </AuthenticatedLayout>
    );
}
