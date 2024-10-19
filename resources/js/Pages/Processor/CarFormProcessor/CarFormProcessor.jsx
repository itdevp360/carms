import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ButtonDataTableLayout from '@/Layouts/Processor/ButtonDataTableLayout';

export default function CarFormProcessor({ auth, users, codetables, forms }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      roles={auth.roles}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">CAR Forms</h2>}
      breadcrumb="CAR Forms / Generated Forms"
    >
      <Head title="CAR Forms" />
      <ButtonDataTableLayout users={users} codetables={codetables} forms={forms} />
    </AuthenticatedLayout>
  );
}
