import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { Link } from '@inertiajs/react';
import { BsList, BsFillPatchCheckFill, BsFillPeopleFill } from "react-icons/bs";
import { FaUser, 
  FaFolderClosed,
  FaChevronDown, 
  FaFilePen, 
  FaListCheck,
  FaFileCircleCheck, 
} from "react-icons/fa6";
import { RiLockUnlockFill, RiDashboard3Fill } from "react-icons/ri";
import { MdOutlineLogin } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";

export default function Authenticated({ user, roles, header, breadcrumb ,children }) {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isOpenProcessor, setIsOpenProcessor] = useState(false);
  const [isOpenDptHead, setIsOpenDptHead] = useState(false);
  const [isOpenApprover, setIsOpenApprover] = useState(false);

  const handleSidebarToggle = () => setShowSidebar(!showSidebar);

  const toggleAccordionProcessor = () => {
    setIsOpenProcessor(!isOpenProcessor);
    if (!isOpenProcessor) {
      setIsOpenDptHead(false);
      setIsOpenApprover(false);
    }
  };

  const toggleAccordionDptHead = () => {
    setIsOpenDptHead(!isOpenDptHead);
    if (!isOpenDptHead) {
      setIsOpenProcessor(false);
      setIsOpenApprover(false);
    }
  };

  const toggleAccordionApprover = () => {
    setIsOpenApprover(!isOpenApprover);
    if (!isOpenApprover) {
      setIsOpenProcessor(false);
      setIsOpenDptHead(false);
    }
  };

  return (
    <div className='min-h-screen'>
      <nav className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-full mx-auto bg-[#e7e7e7]">
          <div className="flex justify-between h-20 shadow-md pl-5">
            <div className="flex items-center">
              <Link href="/">
                <span className="text-[17px] font-bold text-black font-rubik uppercase">
                  CAR Management System
                </span>
              </Link>
              {/* Burger Menu */}
              <button
                className="ml-4 text-4xl cursor-pointer text-[#c16700]"
                onClick={handleSidebarToggle}
              >
                <BsList />
              </button>
            </div>

            <div className="hidden sm:flex sm:items-center sm:ms-6">
              <div className="ms-3 relative">
                <Dropdown>
                  <Dropdown.Trigger>
                    <span className="inline-flex rounded-md me-2 hover:bg-[#b6aeae]">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-base leading-4 font-semibold rounded-md text-black bg-transparent hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                      >
                        <FaUser className='me-1'/>{user.name}
                          <svg
                            className="-me-0.5 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                      </button>
                    </span>
                  </Dropdown.Trigger>
                  <Dropdown.Content>
                    <h6 className='text-md text-center py-2'>{user.name}</h6>
                    <hr className='h-0.5 bg-[#949494] border-none'/>
                    <Dropdown.Link href={route('profile.edit')} className='flex group items-center text-black font-medium py-10 px-15'><RiLockUnlockFill className='me-1 text-xl text-black group-hover:text-[#e65c009f]'/><p className='text-base'>Change Password</p></Dropdown.Link>
                    <Dropdown.Link href={route('logout')} method="post" as="button" className='flex group items-center text-black font-medium py-10 px-15 text-base'>
                      <MdOutlineLogin className='-ms-1 me-2 text-xl text-black group-hover:text-[#e65c009f]'/><p className='text-base'>Sign Out</p>
                    </Dropdown.Link>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            showSidebar ? 'w-[290px] translate-x-0' : '-translate-x-full'
          } fixed top-0 left-0 h-screen bg-[#e7e7e7]`}
          style={{
              transitionProperty: 'transform',
              transitionDuration: '300ms',
              transitionTimingFunction: 'ease-out',
          }}
        >
          <div className="py-6 px-4 mt-[80px]">
            <nav className="flex flex-col">
              {/* Dashboard */}
              <div className='group flex text-xl items-center px-[15px] py-2.5'>
                <RiDashboard3Fill className='text-[#5a525275] text-xl group-hover:text-[#e65c009f] me-2'/>
                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                  Dashboard
                </NavLink>
              </div>
              {/* Calendar */}
              <div className='group flex text-xl items-center px-[15px] py-2.5'>
                <FaCalendarAlt className='text-[#5a525275] text-xl group-hover:text-[#e65c009f] me-2'/>
                <NavLink href={route('calendar')}>
                  Calendar
                </NavLink>
              </div>
              {/* Process Owner */}
              {roles.includes('Process Owner') && (
                <div>
                  <h2 className='px-[15px] font-bold text-[#696969] text-xl'>Processor Owner</h2>
                  <div className='group flex text-xl items-center px-[15px] py-2.5'>
                    <FaListCheck className='text-[#5a525275] text-xl group-hover:text-[#e65c009f] me-2'/>
                    <NavLink href={route('car_form_owner.index')}>
                      Pending
                    </NavLink>
                  </div>
                </div>
              )}
              {/* Processor */}
              {roles.includes('Processor') && (
                <div>
                  <h2 className='px-[15px] font-bold text-[#696969] text-xl'>Processor</h2>
                  <div className='group flex justify-between text-xl items-center px-[15px] py-2.5 cursor-pointer' onClick={toggleAccordionProcessor}>
                    <div className='flex'>
                      <FaFolderClosed className='text-[#5a525275] text-xl group-hover:text-[#e65c009f] me-2'/>
                      <p className='inline-flex items-center px-1 pt-1 border-b-2 text-base font-semibold leading-5 transition duration-150 ease-in-out focus:outline-none border-transparent text-black group-hover:text-[#5a525275]'>
                        CAR Forms
                      </p>
                    </div>
                    <FaChevronDown className={`text-[#5a525275] text-sm transition-transform ${isOpenProcessor ? "rotate-180" : ""} group-hover:text-[#e65c009f]`}/>
                  </div>
                  {isOpenProcessor && (
                    <div>
                      <div className='group flex text-xl items-center ps-12 pe-[15px] py-2.5'>
                        <FaFilePen className='text-[#5a525275] text-base group-hover:text-[#e65c009f] me-2'/>
                        <NavLink href={route('car_form_processors.index')} className='text-sm'>
                          Generated Forms
                        </NavLink>
                      </div>
                      <div className='group flex text-xl items-center ps-12 pe-[15px] py-2.5'>
                        <FaFileCircleCheck className='text-[#5a525275] text-base group-hover:text-[#e65c009f] me-2'/>
                        <NavLink href={route('car_form_approver.index')} className='text-sm'>
                          For Review
                        </NavLink>
                      </div>
                      <div className='group flex text-xl items-center ps-12 pe-[15px] py-2.5'>
                        <FaListCheck className='text-[#5a525275] text-base group-hover:text-[#e65c009f] me-2'/>
                        <NavLink href={route('car_form_owner.index')} className='text-sm'>
                          Pending
                        </NavLink>
                      </div>
                    </div>
                  )}
                  <div className='group flex justify-between text-xl items-center px-[15px] py-2.5'>
                    <div className='flex'>
                      <BsFillPeopleFill className='text-[#5a525275] text-xl group-hover:text-[#e65c009f] me-2'/>
                      <NavLink href={route('register')} className='inline-flex items-center px-1 pt-1 border-b-2 text-base font-semibold leading-5 transition duration-150 ease-in-out focus:outline-none border-transparent text-black group-hover:text-[#5a525275]'>
                        Registered Users
                      </NavLink>
                    </div>
                  </div>
                </div>
              )}
              {/* Department Head */}
              {roles.includes('Department Head') && (
                <div>
                  <h2 className='px-[15px] font-bold text-[#696969] text-xl'>Department Head</h2>
                  <div className='group flex justify-between text-xl items-center px-[15px] py-2.5 cursor-pointer' onClick={toggleAccordionDptHead}>
                    <div className='flex'>
                      <FaFolderClosed className='text-[#5a525275] text-xl group-hover:text-[#e65c009f] me-2'/>
                      <p className='inline-flex items-center px-1 pt-1 border-b-2 text-base font-semibold leading-5 transition duration-150 ease-in-out focus:outline-none border-transparent text-black group-hover:text-[#5a525275]'>
                        CAR Forms
                      </p>
                    </div>
                    <FaChevronDown className={`text-[#5a525275] text-sm transition-transform ${isOpenDptHead ? "rotate-180" : ""} group-hover:text-[#e65c009f]`}/>
                  </div>
                  {isOpenDptHead && (
                    <div>
                      <div className='group flex text-xl items-center ps-12 pe-[15px] py-2.5'>
                        <FaFilePen className='text-[#5a525275] text-base group-hover:text-[#e65c009f] me-2'/>
                        <NavLink href={route('car_form_department_head.index')} className='text-sm'>
                          For Review
                        </NavLink>
                      </div>
                      <div className='group flex text-xl items-center ps-12 pe-[15px] py-2.5'>
                        <FaListCheck className='text-[#5a525275] text-base group-hover:text-[#e65c009f] me-2'/>
                        <NavLink href={route('car_form_owner.index')} className='text-sm'>
                          Pending
                        </NavLink>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* Approver */}
              {roles.includes('Approver') &&(
                <div>
                  <h2 className='px-[15px] font-bold text-[#696969] text-xl'>Approver</h2>
                  <div className='group flex justify-between text-xl items-center px-[15px] py-2.5 cursor-pointer' onClick={toggleAccordionApprover}>
                    <div className='flex'>
                      <FaFolderClosed className='text-[#5a525275] text-xl group-hover:text-[#e65c009f] me-2'/>
                      <p className='inline-flex items-center px-1 pt-1 border-b-2 text-base font-semibold leading-5 transition duration-150 ease-in-out focus:outline-none border-transparent text-black group-hover:text-[#5a525275]'>
                        CAR Forms
                      </p>
                    </div>
                    <FaChevronDown className={`text-[#5a525275] text-sm transition-transform ${isOpenApprover ? "rotate-180" : ""} group-hover:text-[#e65c009f]`}/>
                  </div>
                  {isOpenApprover && (
                    <div>
                      <div className='group flex text-xl items-center ps-12 pe-[15px] py-2.5'>
                        <BsFillPatchCheckFill className='text-[#5a525275] text-base group-hover:text-[#e65c009f] me-2'/>
                        <NavLink href={route('verification_approver.index')} className='text-sm'>
                          Verification
                        </NavLink>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </nav>
          </div>
        </aside>
  
        {/* Main Content */}
        <div className="flex-1 flex flex-col mt-[82px]">
          {header && (
            <header
            style={{
              paddingLeft: showSidebar ? '314px' : '14px',
              transitionProperty: 'padding-left',
              transitionDuration: '300ms',
              transitionTimingFunction: 'ease-out',
            }}
            >
              <div className="max-w-full mx-auto pt-6 pb-2">
              {header}</div>
              <div className="flex bg-[#e7e7e774]">
                <a className='text-[#c25b17] ms-3 me-1' href={route('dashboard')}>Home</a><p className='text-gray-400'>/ {breadcrumb}</p>
              </div>
            </header>
          )}
  
          <main className="flex-1"
            style={{
              paddingLeft: showSidebar ? '284px' : '80px',
              paddingRight: showSidebar ? '0px' : '80px',
              transitionProperty: 'padding-left, padding-right',
              transitionDuration: '300ms',
              transitionTimingFunction: 'ease-out',
            }}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}