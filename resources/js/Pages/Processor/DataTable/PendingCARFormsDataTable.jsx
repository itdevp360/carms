import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import TextInput from '@/Components/TextInput';
import { FaSearch } from 'react-icons/fa';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { Dropdown } from 'primereact/dropdown';
import { ViewDetailsCarRefNumberModal } from '@/Layouts/Processor/DataTableModal/ViewDetailsCarRefNumModal';
import DelayFormsModal from '@/Layouts/Processor/DelayFormsModal/DelayFormsModal';

export default function PendingCARFormsDataTable({ forms }) {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [openFormDetail, setOpenFormDetail] = useState(false);
  const [openDelayForms, setOpenDelayForms] = useState(false);
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

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };
  const openDelayModal = (rowData) => {
    setSelectedForm(rowData);
    setOpenDelayForms(true);
  };

  const closeDelayModal = () => {
    setOpenDelayForms(false);
    setSelectedForm(null); 
  };

  const renderHeader = () => {
    let label = "";
    if(forms.at(-1).status === "For Submission" || forms.at(-1).status === "Draft" || forms.at(-1).status === "Revision"){
      label = "Submission Delay";
    }else if(forms.at(-1).status === "Manager's Review" || forms.at(-1).status === "Manager's Revised"){
      label = "Manager Approval Delay";
    }else if(forms.at(-1).status === "Approver's Review" || forms.at(-1).status === "Approver's Revised"){
      label = "IMS Approval Delay";
    }
    return (
      <div className="flex justify-between items-center">
        <a onClick={()=> openDelayModal()} 
        className ='text-[#c25b17] hover:text-[#d97b3ca6] cursor-pointer underline'>
          {label}
        </a>
        <TextInput
          value={globalFilterValue}
          prefixIcon={<FaSearch />}
          className="mt-1 block w-full input-field"
          placeholder="Search"
          onChange={onGlobalFilterChange}
        />
      </div>
    );
  };
  
  const openDetailModal = () => {
    setOpenFormDetail(true);
  };

  const closeDetailModal = () => {
    setOpenFormDetail(false);
    setSelectedForm(null); 
  };

  const carRefNumber = (data) => {
    return (
      <a onClick={()=> openDetailModal(data)} 
      className ='text-[#c25b17] hover:text-[#d97b3ca6] cursor-pointer underline'>
        {data.car_form_number}
      </a>
    );
  };

  const getHeader = (rowData) => {
    return rowData.props.value[0].status === "Closed" ? "Date Closed" : "Reply Due Date";
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

  const replyDueDate = (data) => {
    const updatedAtDate = new Date(data.updated_at);
    const replyDueDateAdd = new Date(updatedAtDate);
    if(data.status !== "Closed"){
      if(data.status === "For Submission" || data.status === "Draft"){
        replyDueDateAdd.setDate(updatedAtDate.getDate() + 7);
      }else {
        replyDueDateAdd.setDate(updatedAtDate.getDate() + 2);
      }
      const dayOfWeek = replyDueDateAdd.getDay();
    
      if (dayOfWeek === 6) {
        replyDueDateAdd.setDate(replyDueDateAdd.getDate() + 2);
      } else if (dayOfWeek === 0) {
        replyDueDateAdd.setDate(replyDueDateAdd.getDate() + 1);
      }
    }
  
    const formattedReplyDueDate = replyDueDateAdd.toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit', 
      year: 'numeric', 
    });
  
    return <p>{formattedReplyDueDate}</p>;
  };
  

  const departmentRowFilterTemplate = (options) => {
    return (
      <Dropdown 
      value={options.value} 
      options={departments} 
      onChange={(e) => options.filterApplyCallback(e.value)} 
      placeholder="Department" 
      className="border" 
      showClear />
    );
  };

  return (
    <PrimeReactProvider>
      <DataTable
        value={forms}
        rows={10} 
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
      >
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
          field="created_at"
          header="Date Assigned"
          body={dateAssigned}
          sortable
          headerStyle={{ backgroundColor: '#f4f4f4', color: '#333' }}
          style={{ minWidth: '158px' }}
        />
        <Column
          field="updated_at"
          header={getHeader}
          body={replyDueDate}
          sortable
          headerStyle={{ backgroundColor: '#f4f4f4', color: '#333' }}
          style={{ minWidth: '160px' }}
        />
        <Column
          field="received_by.name"
          header="Name of receiver"
          sortable
          headerStyle={{ backgroundColor: '#f4f4f4', color: '#333' }}
          style={{ minWidth: '200px' }}
        />
      </DataTable>
      {openFormDetail && (
        <ViewDetailsCarRefNumberModal
          forms={selectedForm} 
          openModal={openFormDetail}
          closingModal={closeDetailModal}
          title="CAR Form Details"
        />
      )}
      {openDelayForms &&(
        <DelayFormsModal 
          forms={forms}
          openModal={openDelayForms}
          closingModal={closeDelayModal}
        />
      )}
    </PrimeReactProvider>
  );
}
