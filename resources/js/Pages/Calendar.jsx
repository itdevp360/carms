import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CalendarLayout from '@/Layouts/Calendar/CalendarLayout';
import { Head } from '@inertiajs/react';

export default function Calendar({ auth, forms }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            roles={auth.roles}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Calendar</h2>}
            breadcrumb="Calendar"
        >
            <Head title="Calendar" />
            <CalendarLayout forms={forms} roles={auth.roles}/>

        </AuthenticatedLayout>
    );
}
