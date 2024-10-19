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

const CARFormsDataTable = ({ forms, users }) => {
  console.log(window.location.pathname);
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
  
  
  const carRefNumber = (data) => {
    return (
      <a onClick={()=> openDetailModal(data)} 
      className ='text-[#c25b17] hover:text-[#d97b3ca6] cursor-pointer underline'>
        {data.car_form_number}
      </a>
    );
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
          field="status"
          header="Status"
          sortable
          headerStyle={{ backgroundColor: '#f4f4f4', color: '#333' }}
          style={{ minWidth: '170px' }}
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
          field="received_by.name"
          header="Name of receiver"
          sortable
          headerStyle={{ backgroundColor: '#f4f4f4', color: '#333' }}
          style={{ minWidth: '200px' }}
        />
        <Column
          field="auditor_initiator"
          header="Initiator"
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

export default CARFormsDataTable;