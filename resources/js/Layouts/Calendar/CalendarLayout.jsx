import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { FaBarsProgress, FaCalendarWeek, FaClipboardCheck, FaMagnifyingGlass, FaStar, FaUser } from "react-icons/fa6";
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

export default function CalendarLayout({ forms, roles }) {
  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const adjustForWeekend = (date) => {
    const day = date.getDay();
    if (day === 0) { 
      date.setDate(date.getDate() + 1);
    } else if (day === 6) {
      date.setDate(date.getDate() + 2);
    }
    return date;
  };

  const eventContent = (arg) => {
    let formLink = "";
    if(roles.includes('Processor')){
      formLink = route('car_form_processors.index');
    }else if(roles.includes('Process Owner')){
      formLink = route('car_form_owner.selected', {status: arg.event.extendedProps.status, id: arg.event.extendedProps.id});
    }else if(roles.includes('Department Head')){
      formLink = route('car_form_department_head.selected', {status: arg.event.extendedProps.status, id: arg.event.extendedProps.id});
    }else if (roles.includes('Approver')){
      formLink = route('car_form_approver.selected', {status: arg.event.extendedProps.status, id: arg.event.extendedProps.id});
    }
    return (
      <Popover className={`relative`}>
        <PopoverButton className={`flex items-center justify-center w-full`}> 
          <p className='text-xs'>{arg.event.title}</p>
        </PopoverButton>
        <PopoverPanel transition anchor="left" className="flex flex-col z-50 bg-white border border-gray-300 rounded transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0">
          <div className={`border-b-2 border-gray-200 p-1`}>
            <p className={`bg-[${arg.event.backgroundColor}] rounded w-full flex justify-center`}>{arg.event.title}</p>
          </div>
          <div className='grid grid-cols-2 w-[20vw] p-2'>
            <div className='flex items-center'>
              <FaStar className='me-1'/><p>Status:</p>
            </div>
            <div>
              {arg.event.extendedProps.status}
            </div>
            <div className='flex items-center mt-2'>
              <FaUser className='me-1'/><p>Responsible Person:</p>
            </div>
            <div className='mt-2'>
              {arg.event.extendedProps.responsiblePerson}
            </div>
          </div>
          <div className='flex justify-center mt-2 py-2 px-4'>
            <a href={formLink} className={`p-[5px] flex justify-center rounded w-full bg-[${arg.event.backgroundColor}] hover:opacity-80`}>Go To Forms</a>
          </div>
        </PopoverPanel>
      </Popover>
    );
  };

  const events = forms.filter(form => form.status !== "Closed").map(form => {
    const updatedDate = new Date(form.updated_at); 
    let eventDate = updatedDate;
    let eventColor;
    let eventBorderColor;
    let responsiblePerson;

    const formatDate = (date) => {
        return date ? new Date(date.includes('T') ? date : `${date}T00:00:00`) : null;
    };

    if (form.status === "For Submission" || form.status === "Draft") {
      eventDate = addDays(formatDate(form.created_at), 7);
      eventColor = '#FDD38B';
      eventBorderColor = "#FDD184";
      responsiblePerson = form.received_by.name;

    } else if (form.status === "Manager's Review" || form.status === "Manager's Revised") {
      eventDate = addDays(updatedDate, 2);
      eventColor = '#DDA0DD';
      eventBorderColor = "#D8BFD8";
      responsiblePerson = form.dpt_head.name;

    } else if (form.status === "Revision") {
      eventDate = addDays(updatedDate, 3);
      eventColor = '#FF9191';
      eventBorderColor = "#FF8383";
      responsiblePerson = form.received_by.name;

    } else if (form.status === "Approver's Review" || form.status === "Approver's Revised") {
      eventDate = addDays(updatedDate, 3);
      eventColor = '#FFFF83';
      eventBorderColor = "#FFFF7A";
      responsiblePerson = form.approved_by.name;

    } else if (form.status === "Approved") {
      eventDate = addDays(
        form.source === "Request For Action" ? formatDate(form.car_form_owner.date_correction) : formatDate(form.car_form_owner.date_corrective_action),
        form.source === "Request For Action" ? 8 : 31
      );
      eventColor = "#FFB6C7"; 
      eventBorderColor = "#FFAEC1";
      responsiblePerson = form.created_by.name;

    } else if (form.status.includes("Verification")) {
      eventDate = addDays(form.verification?.at(-1)?.created_at, form.source === "Request For Action" ? 7 : 30)
      eventColor = "#FFB6C7"; 
      eventBorderColor = "#FFAEC1";
      responsiblePerson = form.created_by.name;
    }
    eventDate = adjustForWeekend(eventDate);

    const formattedDate = eventDate.toISOString().slice(0, 10);

    return {
      title: form.car_form_number,
      start: formattedDate,
      end: formattedDate,
      backgroundColor: eventColor,
      borderColor: eventBorderColor,
      textColor: 'black',
      extendedProps: {
        status: form.status,
        responsiblePerson: responsiblePerson,
        id: form.id,
      },
    };
  });


  return (
    <div className="py-4">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow sm:rounded-lg">
          <div className="px-8 py-2">
            <p className="text-lg font-medium font-sans">CAR Forms Status Legend</p>
            <div className="flex justify-start items-center mt-2">
              <span className="flex justify-start items-center bg-[#FDD38B] border-[#FDD184] px-2 text-sm rounded me-2 font-semibold">
                <FaBarsProgress className="me-2" />Submission
              </span>
              <span className="flex justify-start items-center bg-[#DDA0DD] border-[#D8BFD8] px-2 text-sm rounded me-2 font-semibold">
                <FaMagnifyingGlass className="me-2" />Manager's Review
              </span>
              <span className="flex justify-start items-center bg-[#FF9191] border-[#FF8383] px-2 text-sm rounded me-2 font-semibold">
                <BsFillExclamationTriangleFill className="me-2" />Revision
              </span>
              <span className="flex justify-start items-center bg-[#FFFF83] border-[#FFFF7A] px-2 text-sm rounded me-2 font-semibold">
                <FaClipboardCheck className="me-2" />Approver's Review
              </span>
              <span className="flex justify-start items-center bg-[#FFB6C7] border-[#FFAEC1] px-2 text-sm rounded me-2 font-semibold">
                <FaStar className="me-2" />Verification
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow sm:rounded-lg mt-6">
          <div>
            <div className='py-2 flex items-center justify-center text-xl font-semibold border-b-[1px] mb-2'>
              <FaCalendarWeek className='me-2'/><p>Corrective Action Request (CAR) Forms Schedule</p>
            </div>
            <div className='px-8 py-2'>
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                height="100vh"
                headerToolbar={{
                  left: 'today',
                  center: 'title',
                  right: 'prev,next'
                }}
                buttonText={{
                  today: 'Today',
                }}
                // dayMaxEvents={true}
                events={events}
                eventContent={eventContent}
                eventClassNames={`cursor-pointer`}
                dayHeaderClassNames={'bg-[#eeebebb3] leading-10'}
                viewClassNames={`text-[#c25b17] `}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
