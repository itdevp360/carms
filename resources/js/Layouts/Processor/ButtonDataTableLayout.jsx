import ProcessorCountForm from "@/Components/ProcessorCountForm";
import PageTab from "@/Components/PageTab";
import PageTabGroup from "@/Components/PageTabGroup";
import PageTablist from "@/Components/PageTablist";
import PageTabPanel from "@/Components/PageTabPanel";
import PageTabPanels from "@/Components/PageTabPanels";
import CARFormsDataTable from "@/Pages/Processor/DataTable/CARFormsDataTable";
import PendingCARFormsDataTable from "@/Pages/Processor/DataTable/PendingCARFormsDataTable";
import { useState } from 'react';
import { FaFolderPlus } from "react-icons/fa";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import CreateNewReceiver from "@/Pages/Processor/CreatingNewNavTab/CreateNewReceiver";
import CreateNewCARForm from "@/Pages/Processor/CreatingNewNavTab/CreateNewCARForm";
import VerificationCARFormsDataTable from "@/Pages/Processor/DataTable/VerificationCARFormsDataTable";
import { csrfToken } from "@/constant";

export default function ButtonDataTableLayout({forms, users, codetables}) {
  const { data, setData, post, errors, processing, reset } = useForm({
    issue_type: '',
    source: '',
    other_source: '',
    nonconformance_classification: '',
    nonconformance_observation: '',
    auditor_initiator: '',
    date_reported_to_ims: '',
    concerned_department: '',
    approver_id: '',
    receiver_id: '',
    email_receiver: '',
    status: 'For Submission',
    groups: [{reference: "", isoClauses:[{clause: "", subClause: ""}]}],
    email_cc: [],
  });

  const [creatingNewForm, setCreatingForm] = useState(false);
  const createNewForm = () => {
    setCreatingForm(true);
  };

  const closeModal = () => {
    setCreatingForm(false);
    reset();
    setData({
      issue_type: '',
      related_issue_type: '',
      source: '',
      other_source: '',
      nonconformance_classification: '',
      nonconformance_observation: '',
      auditor_initiator: '',
      date_reported_to_ims: '',
      concerned_department: '',
      approver_id: '',
      receiver_id: '',
      email_receiver: '',
      status: 'For Submission',
      groups: [{ reference: "", isoClauses: [{ clause: "", subClause: '' }] }],
      email_cc: [],
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#f99d35d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        post(route('car_form_processors.store'),{
          _token: csrfToken,
          onError: (error) => {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Please Try Again!",
              timer: 5000,
              text: "Some Input Fields are empty!",
            });
          },
          onSuccess: () => {
            closeModal();
            setData({
              issue_type: '',
              related_issue_type: '',
              source: '',
              other_source: '',
              nonconformance_classification: '',
              nonconformance_observation: '',
              auditor_initiator: '',
              date_reported_to_ims: '',
              concerned_department: '',
              approver_id: '',
              receiver_id: '',
              email_receiver: '',
              status: 'For Submission',
              groups: [{ reference: "", isoClauses: [{ clause: "", subClause: '' }] }],
              email_cc: [],
            });
            Swal.fire({
              icon: "success",
              title: "Success!",
              timer: 5000,
              text: "Successfully Add New CAR Form!",
            });
          }
        });
      }
    });
  };
  const nonconformanceClassification = data.source && (data.source !== "Request For Action" ? "CLASSIFICATION" : "RFA_CLASSIFICATION");
  const departmentOption = codetables.data.filter(item => item.codename === "DEPARTMENT");
  const isoClauseOption = codetables.data
    .filter(item => item.codename === "CLAUSE")
    .sort((a, b) => parseInt(a.id) - parseInt(b.id));
  const classificationOption = codetables.data.filter(item => item.codename === nonconformanceClassification).sort((a, b) => a.description1 - b.description1);
  const formOption = forms.sort((a, b) => a.id - b.id);
  return (
    <>
      <div>
        <button onClick={createNewForm} className='ms-8 bg-[#ffaf54d6] hover:bg-[#feb35fd6] mt-4 px-4 py-2 rounded'>Create Form</button>
        <div className="py-4">
          <div className="max-w-[80vw] mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow sm:rounded-lg">
              <div className="text-gray-800">
                <PageTabGroup>
                  <PageTablist>
                    <PageTab>
                      All
                      <ProcessorCountForm forms={forms} formStatus={[""]}/>
                    </PageTab>
                    <PageTab>
                      Submission
                      <ProcessorCountForm forms={forms} formStatus={["For Submission", "Draft"]}/>
                    </PageTab>
                    <PageTab>
                      Manager's Review
                      <ProcessorCountForm forms={forms} formStatus={["Manager's Review", "Manager's Revised"]} />
                    </PageTab>
                    <PageTab>
                      Revision
                      <ProcessorCountForm forms={forms} formStatus={["Revision"]}/>
                    </PageTab>
                    <PageTab>
                      Approver's Review
                      <ProcessorCountForm forms={forms} formStatus={["Approver's Review", "Approver's Revised"]}/>
                    </PageTab>
                    <PageTab>
                      Verification
                      <ProcessorCountForm forms={forms} formStatus={["Approved", "Verification"]}/>
                    </PageTab>
                    <PageTab>
                      Closed
                      <ProcessorCountForm forms={forms} formStatus={["Closed"]}/>
                    </PageTab>
                  </PageTablist>
                  <PageTabPanels>
                    <PageTabPanel>
                      <CARFormsDataTable forms={forms} users={users}/>
                    </PageTabPanel>
                    <PageTabPanel>
                      <PendingCARFormsDataTable forms={forms.filter(form => ["For Submission", "Draft"].some(status => form.status.includes(status)))}/>
                    </PageTabPanel>
                    <PageTabPanel>
                      <PendingCARFormsDataTable forms={forms.filter(form => ["Manager's Review", "Manager's Revised"].some(status => form.status.includes(status)))}/>
                    </PageTabPanel>
                    <PageTabPanel>
                      <PendingCARFormsDataTable forms={forms.filter(form => ["Revision"].some(status => form.status.includes(status)))}/>
                    </PageTabPanel>
                    <PageTabPanel>
                      <PendingCARFormsDataTable forms={forms.filter(form => ["Approver's Review", "Approver's Revised"].some(status => form.status.includes(status)))}/>
                    </PageTabPanel>
                    <PageTabPanel>
                      <VerificationCARFormsDataTable forms={forms.filter(form => ["Approved", "Verification"].some(status => form.status.includes(status)))} users={users}/>
                    </PageTabPanel>
                    <PageTabPanel>
                      <PendingCARFormsDataTable forms={forms.filter(form => ["Closed"].some(status => form.status.includes(status)))}/>
                    </PageTabPanel>
                  </PageTabPanels>
                </PageTabGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={creatingNewForm} onClose={closeModal} maxWidth='4xl'>
        <div className='p-8 flex items-center'>
          <FaFolderPlus size={28} />
          <h2 className='text-2xl ms-2'>Create CAR Forms</h2>
        </div>
        <hr className='h-0.5 bg-[#949494] border-none' />
        <form onSubmit={handleSubmit} className='flex flex-col h-[calc(89vh-6rem)]'>
          <TabGroup className='flex flex-col flex-grow'>
            <TabList className="pt-4 px-4 border-b-2 border-gray-300">
              <Tab className="py-2 px-8 text-sm font-medium cursor-pointer
              data-[selected]:bg-[#8d8a8a75] data-[selected]:rounded-t
              data-[selected]:border-1 data-[selected]:border-[#b8b8b8] data-[selected]:text-[#495057]">CAR</Tab>
              <Tab className="py-2 px-8 text-sm font-medium cursor-pointer
              data-[selected]:bg-[#8d8a8a75] data-[selected]:rounded-t
              data-[selected]:border-1 data-[selected]:border-[#b8b8b8] data-[selected]:text-[#495057]">Receiver</Tab>
            </TabList>
            <TabPanels className='flex-grow flex flex-col'>
              <TabPanel className="flex-grow">
                <div className="px-8 py-4">
                  <CreateNewCARForm
                    data={data} 
                    setData={setData}
                    errors={errors}
                    users={users}
                    departmentOption={departmentOption}
                    isoClauseOption={isoClauseOption}
                    codetables={codetables}
                    classificationOption={classificationOption}
                    formOption={formOption}
                  />
                </div>
              </TabPanel>
              <TabPanel className="flex flex-col flex-grow">
                <div className="px-8 py-4 flex-grow">
                  <CreateNewReceiver
                    data={data}
                    setData={setData}
                    errors={errors}
                    users={users}
                  />
                </div>
                <div className="p-8 mt-auto flex justify-end">
                  <button type="submit" disabled={processing} className="bg-[#ffaf54d6] hover:bg-[#f99d35d6] mt-4 px-4 py-2 rounded">
                    Create
                  </button>
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </form>
      </Modal>
    </>
  );
}