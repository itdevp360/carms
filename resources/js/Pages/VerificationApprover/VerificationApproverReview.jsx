import PageLayout from "@/Components/PageLayout";
import PageTab from "@/Components/PageTab";
import PageTabGroup from "@/Components/PageTabGroup";
import PageTablist from "@/Components/PageTablist";
import PageTabPanel from "@/Components/PageTabPanel";
import PageTabPanels from "@/Components/PageTabPanels";
import { VerificationViewModal } from "@/Layouts/Approver/VerificationViewModal";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from "@inertiajs/react";
import React from "react";
import { useState } from "react";
import { FaListCheck } from "react-icons/fa6";

const CountForm = ({ forms, status }) => {
  const count = forms.data.filter(item =>
    item.verification.some(verification => 
      verification.status.includes(status)
    )
  ).length;

  return (
    <span className="ms-2 inline-flex items-center rounded-full bg-[#ffaf54d6] px-2 py-0.5 
      text-xs font-bold text-black ring-1 ring-inset ring-[##a85a00]">
      {count}
    </span>
  );
};

// TableForm displays the filtered list of forms based on their status
const TableForm = ({ title = "", forms, status, users }) => {
  const [openModal, setOpenModal] = useState(false);
  
  const [selectedForm, setSelectedForm] = useState(null);
  
  const openingModal = (form) => {
    setOpenModal(true);
    setSelectedForm(form);
  };

  const closingModal = () => {
    setOpenModal(false)
    setSelectedForm(null);
  };
  return (
    <>
      <div className="bg-[#00000008] py-2 px-4 border-b-2 border-[#00000020] flex items-center text-base mb-3">
        <FaListCheck className="me-2" />
        {title}
      </div>
      <table className="border border-[#dee2e6] mb-2 w-full text-left text-[#212529]">
        <thead className="text-base font-bold">
          <tr>
            <th className="py-1 ps-2">CAR Reference No.</th>
          </tr>
        </thead>
        <tbody>
          {/* Filter forms based on status in verification array */}
          {forms.data.map(form => (
            form.verification.filter(v => v.status === status).map((verification, idx) => (
              <tr key={`${form.id}-${idx}`} onClick={() => openingModal(form)} className="border-t border-[#dee2e6] hover:text-[#5a5af8]">
                <td className="py-1 ps-3 hover:shadow-[0_5px_30px_0_rgba(82,63,105,0.2)] cursor-pointer">
                  <span>{form.car_form_number}</span>
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
      {openModal && (
        <VerificationViewModal
          forms={selectedForm} 
          openModal={openModal}
          closingModal={closingModal}
          title="Verification Review"
          users={users}
        />
      )}
    </>
  );
};

export default function ReviewForm({ auth, forms, users }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      roles={auth.roles}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Review Forms</h2>}
      breadcrumb="CAR Forms / For Review"
    >
      <Head title="CAR Review" />
      <PageLayout>
        <PageTabGroup>
          <PageTablist>
            <PageTab>
              Review <CountForm forms={forms} status="Review" />
            </PageTab>
            <PageTab>
              Revised <CountForm forms={forms} status="Revised" />
            </PageTab>
          </PageTablist>
          <PageTabPanels>
            <PageTabPanel>
              {/* Review forms content */}
              <TableForm title="Verification Review" forms={forms} status="Review" users={users}/>
            </PageTabPanel>
            <PageTabPanel>
              {/* Revised forms content */}
              <TableForm title="Verification Revised" forms={forms} status="Revised" users={users}/>
            </PageTabPanel>
          </PageTabPanels>
        </PageTabGroup>
      </PageLayout>
    </AuthenticatedLayout>
  );
}
