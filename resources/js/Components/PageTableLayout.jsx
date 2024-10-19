import { OpenModal } from "@/Hooks/OpenModal";
import { FaListCheck } from "react-icons/fa6";
import ModalLayout from "@/Layouts/ModalLayout";
import { useFormData } from "@/Hooks/useFormData";

export default function PageTableLayout({forms, formStatus, title, roles, selectedID = null}){
  const { setData } = useFormData();
  const { openModal, selectedForm, openingModal, closingModal} = OpenModal({setData});
  return (
    <>
      <div className='bg-[#00000008] py-2 px-4 border-b-2 border-[#00000020] flex items-center text-base mb-3'>
        <FaListCheck className='me-2'/>{title}
      </div>
      <table className='border border-[#dee2e6] mb-2 w-full text-left w-full text-[#212529]'>
        <thead className='text-base font-bold'>
          <tr>
            <th className='py-1 ps-2'>CAR Reference No.</th>
          </tr>
        </thead>
        <tbody>
          {forms.data.filter(item => item.status === formStatus).map(form => (
            <tr key={form.id} onClick={() => openingModal(form)} className={`border-t border-[#dee2e6] hover:text-[#5a5af8] ${selectedID == form.id && "font-bold border-0 bg-[#e8e8e8] shadow-lg"}`}>
              <td className={`py-1 ps-3 hover:shadow-[0_5px_30px_0_rgba(82,63,105,0.2)] cursor-pointer `}>
                <span>{form.car_form_number}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {openModal && (
        <ModalLayout 
          openModal={openModal} 
          closingModal={closingModal} 
          title={formStatus === "For Submission" || formStatus === "Draft" ? "Complete CAR Forms" : "Revise the CAR Forms"}
          selectedForm={selectedForm}
          roles={roles}
          forms={forms}
        />
      )}
    </>
  );
}