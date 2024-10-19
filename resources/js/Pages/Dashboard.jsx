import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { DashboardLayout } from '@/Layouts/Dashboard/DashboardLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, dataCount }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            roles={auth.roles}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            breadcrumb="Dashboard"
        >
            <Head title="Dashboard" />

            <DashboardLayout dataCount={dataCount} />
        </AuthenticatedLayout>
    );
}
