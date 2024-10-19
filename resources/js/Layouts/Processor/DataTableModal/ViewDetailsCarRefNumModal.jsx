import Modal from "@/Components/Modal";
import { FaEye, } from "react-icons/fa6";
import FormAccordion from "../Accordion/FormAccordion";

export function ViewDetailsCarRefNumberModal({forms, openModal, closingModal, title}){
  return(
    <>
      <Modal show={openModal} onClose={closingModal} maxWidth="5xl">
        <div className='p-8 flex items-center'>
          <FaEye size={28} />
          <h2 className='text-2xl ms-2'>{title}</h2>
        </div>
        <hr className="h-0.5 bg-[#949494] border-none"/>
        <div className="p-4">
          <FormAccordion forms={forms} selectedIndex={0}/>
        </div>
      </Modal>
    </>
  );
}