import Modal from "@/Components/Modal";
import { FaFlag } from "react-icons/fa6";

export default function DelayFormsModal({forms, openModal, closingModal}){
  let label = "";
    if(forms.at(-1).status === "For Submission" || forms.at(-1).status === "Draft" || forms.at(-1).status === "Revision"){
      label = "Submission Delay (Number of day)";
    }else if(forms.at(-1).status === "Manager's Review" || forms.at(-1).status === "Manager's Revised"){
      label = "Manager Approval Delay (Number of day)";
    }else if(forms.at(-1).status === "Approver's Review" || forms.at(-1).status === "Approver's Revised"){
      label = "IMS Approval Delay (Number of day)";
    }
  return (
    <Modal show={openModal} onClose={closingModal} maxWidth="3xl">
      <div className='p-8 flex items-center'>
        <FaFlag size={28} />
        <h2 className='text-2xl ms-2'>{label}</h2>
      </div>
      <hr className="h-0.5 bg-[#949494] border-none"/>
      <div className='p-4 flex justify-center'>
        <table className="border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 bg-[#f4f4f4]">CAR Reference Number</th>
              <th className="border border-gray-400 bg-[#f4f4f4]">Name of Receiver</th>
              <th className="border border-gray-400 bg-[#f4f4f4]">{label}</th>
            </tr>
          </thead>
          <tbody>
            {forms.filter(form => form.delay_forms && (form.delay_forms.submission_delay !== 0 || form.delay_forms.manager_approval_delay !== 0 || form.delay_forms.ims_approval_delay !== 0)).map((form, index) => (
              <tr key={form.id}>
                <td className="border border-gray-400 font-thin p-1"><p className="flex justify-center">{form.car_form_number}</p></td>
                <td className="border border-gray-400 font-thin p-1"><p className="flex justify-center">{form.received_by.name}</p></td>
                <td className="border border-gray-400 font-thin p-1">
                  <p className="flex justify-center">
                    {
                      (form.status === "For Submission" || form.status === "Draft" || form.status === "Revision") 
                        ? form.delay_forms.submission_delay 
                        : (form.status === "Manager's Review" || form.status === "Manager's Revised") 
                          ? form.delay_forms.manager_approval_delay
                          : form.delay_forms.ims_approval_delay
                    }
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
}