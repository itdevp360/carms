import Modal from "@/Components/Modal";
import { FaFolderPlus } from "react-icons/fa6";
import FormAccordion from "../Accordion/FormAccordion";
import CreateVerificationForm from "../Form/CreateVerificationForm";
import { CreateOtherVerificationForm } from "../Form/CreateOtherVerificationForm";
import { CreateRFAVerificationForm } from "../Form/CreateRFAVerificationForm";

export function CreateNewVerificationModal({forms, openModal, closingModal, title, users}){
  const hasVerification = Array.isArray(forms.verification) && forms.verification.length > 0;
  const lastVerificationStatus = hasVerification ? forms.verification[forms.verification.length - 1].status : null;

  return(
    <>
      <Modal show={openModal} onClose={closingModal} maxWidth="5xl">
        <div className='p-8 flex items-center'>
          <FaFolderPlus size={28} />
          <h2 className='text-2xl ms-2'>{title}</h2>
        </div>
        <hr className="h-0.5 bg-[#949494] border-none"/>
        <div className="p-4">
          <FormAccordion forms={forms}/>
          {forms.source !== "Request For Action" ? (
            <>
              {forms.status === "Approved" && (
                <CreateVerificationForm form={forms} users={users} closingModal={closingModal} buttonLabel="Create Verification"/>
              )}
              {["Approved"].includes(lastVerificationStatus) && (
                <CreateOtherVerificationForm form={forms} closingModal={closingModal} users={users} buttonLabel = "Create Verification"/>
              )}
            </>
          ) : (
            <CreateRFAVerificationForm form={forms} closingModal={closingModal} users={users} buttonLabel="Create RFA Verification"/>
          )}
        </div>
      </Modal>
    </>
  );
}