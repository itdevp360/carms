import Modal from "@/Components/Modal";
import { FaFolderPlus } from "react-icons/fa6";
import CreateVerificationForm from "../Processor/Form/CreateVerificationForm";
import { CreateOtherVerificationForm } from "../Processor/Form/CreateOtherVerificationForm";
import { CreateRFAVerificationForm } from "../Processor/Form/CreateRFAVerificationForm";

export function VerificationViewModal({forms, openModal, closingModal, title, users}){
  return(
    <>
      <Modal show={openModal} onClose={closingModal} maxWidth="5xl">
        <div className='p-8 flex items-center'>
          <FaFolderPlus size={28} />
          <h2 className='text-2xl ms-2'>{title}</h2>
        </div>
        <hr className="h-0.5 bg-[#949494] border-none"/>
        <div className="p-4">
          {forms.source !== "Request For Action" ? (  
          <>
              {forms.verification.length >= 2 && (
                <CreateOtherVerificationForm form={forms} users={users} closingModal={closingModal} buttonLabel="Approved" secondButtonLabel="Return to Processor"/>
              )}
              {forms.verification.length === 1 && (
                <CreateVerificationForm form={forms} users={users} closingModal={closingModal} buttonLabel="Approved" secondButtonLabel="Return to Proccessor"/>
              )}
          </>
          ) : (
            <CreateRFAVerificationForm form={forms} closingModal={closingModal} users={users} buttonLabel="Approved"/>
          )}
        </div>
      </Modal>
    </>
  );
}