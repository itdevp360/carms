import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import TextInput from '@/Components/TextInput';
import { FaSearch } from 'react-icons/fa';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { FaCircleCheck, FaPen } from 'react-icons/fa6';
import { Dropdown } from 'primereact/dropdown';
import { CreateNewVerificationModal } from '@/Layouts/Processor/DataTableModal/CreateNewVerificationModal';
import { EditVerificationModal } from '@/Layouts/Processor/DataTableModal/EditVerificationModal';
import { ViewDetailsCarRefNumberModal } from '@/Layouts/Processor/DataTableModal/ViewDetailsCarRefNumModal';

const VerificationCARFormsDataTable = ({ forms, users }) => {
  console.log(forms);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [openModal, setOpenModal] = useState(false); 
  const [openEditModal, setOpenEditModal] = useState(false); 
  const [openFormDetail, setOpenFormDetail] = useState(false); 
  const [selectedForm, setSelectedForm] = useState(null); 
  const [departments] = useState([
    'Consulting', 
    'ESH', 
    'FAD', 
    'HR', 
    'IH Lab', 
    'IH WEM', 
    'IMS', 
    'IT', 
    'Marketing', 
    'OSHMS', 
    'Sales', 
    'Testing'
  ]);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center">
        <span></span>
        <TextInput
          value={globalFilterValue}
          prefixIcon={<FaSearch  className='mt-2'/>}
          className="mt-1 block w-full input-field"
          placeholder="Search"
          onChange={onGlobalFilterChange}
        />
      </div>
    );
  };

  const openVerificationModal = (rowData) => {
    setSelectedForm(rowData);
    setOpenModal(true);
  };

  const closeVerificationModal = () => {
    setOpenModal(false);
    setSelectedForm(null); 
  };
  const openEditVerificationModal = (rowData) => {
    setSelectedForm(rowData);
    setOpenEditModal(true);
  };

  const closeEditVerificationModal = () => {
    setOpenEditModal(false);
    setSelectedForm(null); 
  };
  
  const openDetailModal = (rowData) => {
    setSelectedForm(rowData);
    setOpenFormDetail(true);
  };

  const closeDetailModal = () => {
    setOpenFormDetail(false);
    setSelectedForm(null); 
  };

  const verificationButton = (rowData) => {
    const hasVerification = Array.isArray(rowData.verification) && rowData.verification.length > 0;
    const lastVerificationStatus = hasVerification ? rowData.verification[rowData.verification.length - 1].status : null;
  
    const canEditVerification = hasVerification && ["Revision"].includes(lastVerificationStatus);
    const canOpenVerification = hasVerification && ["Approved"].includes(lastVerificationStatus) || rowData.status === "Approved";
    
    return (
      <div className='flex justify-evenly'>
        {/* Edit Verification Button */}
        <button 
          className={`text-white px-2 py-1 rounded transition-opacity
            ${canEditVerification 
              ? "bg-[#0d6efd] hover:bg-[#0b5ed7]" 
              : "bg-[#0d6efd] opacity-50 cursor-not-allowed"}`} 
          onClick={() => openEditVerificationModal(rowData)}
          disabled={!canEditVerification}
        >
          <FaPen />
        </button>
  
        {/* Open Verification Button */}
        <button 
          className={`text-white px-2 py-1 rounded transition-opacity 
          ${canOpenVerification 
            ? 'bg-[#198754] hover:bg-[#17a34a]' 
            : 'bg-[#198754] opacity-50 cursor-not-allowed'}`} 
          onClick={() => openVerificationModal(rowData)}
          disabled={!canOpenVerification}
        >
          <FaCircleCheck />
        </button>
      </div>
    );
  };
  
  const dateAssigned = (data) => {
    const createdAtDate = new Date(data.created_at);
    createdAtDate.getDate();

    const formattedAssignedDate = createdAtDate.toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric'
    });
    return <p>{formattedAssignedDate}</p>;
  }
  
  const carRefNumber = (data) => {
    return (
      <a onClick={()=> openDetailModal(data)} 
      className ='text-[#c25b17] hover:text-[#d97b3ca6] cursor-pointer underline'>
        {data.car_form_number}
      </a>
    );
  };
  const verificationApproval = (data) => {
    if (Array.isArray(data.verification) && data.verification.length > 0) {
      return data.verification.at(-1).status;
    }
    return "No Verification";
  };

  const verificationResult = (data) => {
    if(data.source === "Request For Action"){
      return data.verification[0]?.rfa_verification.at(-1)?.close_out_follow_up === 1 ? "For Close Out" : "For Follow Up"
    }
    if(Array.isArray(data.verification) && data.verification.length === 1){
      return data.verification[0]?.first_verification?.conclusion;
    }else if(Array.isArray(data.verification) && data.verification.length > 1){
      return data.verification.at(-1)?.other_verification?.conclusion;
    }
    return "No Verification Result";
  };
  
  const nextVerificationDate = (data) => {
    const addDays = (dateStr, days) => {
      const date = new Date(dateStr);
      date.setDate(date.getDate() + days);
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 6){
        date.setDate(date.getDate() + 2)
      } else if (dayOfWeek === 0){
        date.setDate(date.getDate() + 1);
      }
      return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };
  
    if (data.source === "Request For Action") {
      const rfaCreatedAt = data.verification[0]?.rfa_verification.at(-1)?.created_at;
      return rfaCreatedAt ? addDays(rfaCreatedAt, 7) : "No Verification Date";
    }
    
    if (Array.isArray(data.verification) && data.verification.length === 1) {
      const verification = data.verification[0];
      if (verification?.status === "Approved") {
        return addDays(verification?.updated_at, 30);
      }
    } else if (Array.isArray(data.verification) && data.verification.length > 1) {
      const lastVerification = data.verification.at(-1);
      if (lastVerification?.status === "Approved") {
        return addDays(lastVerification?.updated_at, 30);
      }
    }
    
    return "Not yet Approved";
  };
  

  const departmentRowFilterTemplate = (options) => {
    return (
      <Dropdown 
        value={options.value} 
        options={departments} 
        onChange={(e) => options.filterApplyCallback(e.value)} 
        placeholder="Department" 
        className="border" 
      />
    );
  };

  const onPage = (event) => {
    setLoading(true);
    setFirst(event.first);
    setRows(event.rows);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(forms);
      setTotalRecords(forms.total);
      setLoading(false);
    }, 1000);
  }, [forms]);

  return (
    <PrimeReactProvider>
      <DataTable
        value={data}
        rows={rows} 
        dataKey="id"
        size='small'
        globalFilter={globalFilterValue}
        paginator
        paginatorTemplate="PrevPageLink PageLinks NextPageLink RowsPerPageDropdown"
        rowsPerPageOptions={[10, 25, 50, 100]}
        emptyMessage="No CAR forms found."
        stripedRows
        style={{ minWidth: '50rem' }}
        header={renderHeader()}
        scrollable
        scrollHeight="50vh"
        paginatorClassName='custom-paginator'
        className='custom-datatable'
        filterDisplay="row"
        removableSort
        sortField='updated_at'
        sortOrder={-1}
        onPage={onPage}
        loading={loading}
        totalRecords={totalRecords}
        first={first}
      >
        <Column
          body={verificationButton}
          headerStyle={{ backgroundColor: '#f4f4f4', color: '#333', textAlign: 'center' }}
          bodyStyle={{ textAlign: 'center', minWidth: '8rem' }}
          style={{ minWidth: '100px' }}
        />
        <Column
          field='car_form_number'
          header="CAR Reference Number"
          body={carRefNumber}
          sortable
          headerStyle={{ backgroundColor: '#f4f4f4', color: '#333' }}
          style={{ minWidth: '224px' }}
        />
        <Column
          field="concerned_department" 
          header="Assigned To"
          sortable
          headerStyle={{ backgroundColor: '#f4f4f4', color: '#333' }}
          showFilterMenu={false}
          filter
          filterElement={departmentRowFilterTemplate}
        />
        <Column
          field="status"
          header="Verification Stage"
          sortable
          headerStyle={{ backgroundColor: '#f4f4f4', color: '#333' }}
          style={{ minWidth: '200px' }}
        />
        <Column
          header="Verification Result"
          sortable
          body={verificationResult}
          headerStyle={{ backgroundColor: '#f4f4f4', color: '#333' }}
          style={{ minWidth: '200px' }}
        />
        <Column
          header="Verification Approval"
          sortable
          body={verificationApproval}
          headerStyle={{ backgroundColor: '#f4f4f4', color: '#333' }}
          style={{ minWidth: '210px' }}
        />   
        <Column
          field='created_at'
          header="Date Assigned"
          body={dateAssigned}
          sortable
          headerStyle={{ backgroundColor: '#f4f4f4', color: '#333' }}
          style={{ minWidth: '210px' }}
        />   
        <Column
          header="Next Verification Date"
          body={nextVerificationDate}
          sortable
          headerStyle={{ backgroundColor: '#f4f4f4', color: '#333' }}
          style={{ minWidth: '220px' }}
        />   
        <Column
          field="received_by.name"
          header="Name of receiver"
          sortable
          headerStyle={{ backgroundColor: '#f4f4f4', color: '#333' }}
          style={{ minWidth: '200px' }}
        />
      </DataTable>
      
      {/* Modal for CreateNewVerification */}
      {openModal && (
        <CreateNewVerificationModal 
          forms={selectedForm} 
          openModal={openModal}
          closingModal={closeVerificationModal}
          title="Verification"
          users={users}
        />
      )}

      {openEditModal && (
        <EditVerificationModal
          forms={selectedForm} 
          openModal={openEditModal}
          closingModal={closeEditVerificationModal}
          title="Edit Verification"
          users={users}
        />
      )}

      {openFormDetail && (
        <ViewDetailsCarRefNumberModal
          forms={selectedForm} 
          openModal={openFormDetail}
          closingModal={closeDetailModal}
          title="CAR Form Details"
        />
      )}
    </PrimeReactProvider>
  );
};

export default VerificationCARFormsDataTable;