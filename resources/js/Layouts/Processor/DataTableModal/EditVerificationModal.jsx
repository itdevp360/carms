import Modal from "@/Components/Modal";
import { FaFolderPlus } from "react-icons/fa6";
import CreateVerificationForm from "../Form/CreateVerificationForm";
import { CreateOtherVerificationForm } from "../Form/CreateOtherVerificationForm";

export function EditVerificationModal({forms, openModal, closingModal, title, users}){
  return(
    <>
      <Modal show={openModal} onClose={closingModal} maxWidth="5xl">
        <div className='p-8 flex items-center'>
          <FaFolderPlus size={28} />
          <h2 className='text-2xl ms-2'>{title}</h2>
        </div>
        <hr className="h-0.5 bg-[#949494] border-none"/>
        <div className="p-4">
          {forms.verification.length > 1 ? (
            <CreateOtherVerificationForm form={forms} users={users} closingModal={closingModal} buttonLabel="Update Verification" />
          ) : (
            <CreateVerificationForm form={forms} users={users} closingModal={closingModal} buttonLabel="Update Verification"/>
          )}
        </div>
      </Modal>
    </>
  );
}