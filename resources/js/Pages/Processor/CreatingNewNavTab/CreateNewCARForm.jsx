import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextareaInput from '@/Components/TextareaInput';
import TextInput from '@/Components/TextInput';
import { FaComments } from "react-icons/fa";
import { FaInbox, FaFileCircleQuestion, FaMagnifyingGlass, FaUserTie, FaBuildingUser, FaUser, FaCalendar  } from "react-icons/fa6";
import React from 'react';
import { IsoClauseAddChangeRemove } from '@/Hooks/IsoClauseAddChangeRemove';

export default function CreateNewCARForm({
  data, setData, errors, isoClauseOption, users, departmentOption, codetables, classificationOption, formOption
}) {
  const {
    handleAddGroup,
    handleRemoveGroup,
    handleReferenceChange,  
    handleAddIsoClause,
    handleRemoveIsoClause,
    handleClauseChange
  } = IsoClauseAddChangeRemove(data, setData, codetables); 
  
  return (
    <>
      <div>
        <div>
          <InputLabel htmlFor="source" value="Source" />
          <SelectInput
            required
            name="source"
            value={data.source}
            prefixIcon={<FaInbox size={18} className='items-center' />}
            onChange={(e) => setData('source', e.target.value)}
            className="mt-1 block w-full input-field"
          >
            <option value="">Select Source</option>
            <option value="Internal Audit">Internal Audit</option>
            <option value="Non Audit">Non-Audit</option>
            <option value="Voice of Customer">Voice of Customer</option>
            <option value="Request For Action">Request For Action</option>
            <option value="others">Others</option>
          </SelectInput>
          <InputError message={errors.source} className="mt-2" />
        </div>
        {data.source === 'others' && (
          <div className="mt-2">
            <InputLabel htmlFor="other_source" value="Source (Others)" />
            <TextInput
              name="other_source"
              value={data.other_source}
              prefixIcon={<FaInbox size={18} className='items-center' />}
              placeholder="Enter the Source (Others)"
              onChange={(e) => setData('other_source', e.target.value)}
              className="mt-1 block w-full input-field"
            />
            <InputError message={errors.other_source} className="mt-2" />
          </div>
        )}
        {data.source !== "Request For Action" && (
          <div>
            <div className='mt-2'>
              <InputLabel htmlFor="issue_type" value="Issue Type" />
              <SelectInput
                name="issue_type"
                value={data.issue_type}
                prefixIcon={<FaFileCircleQuestion size={18} className='items-center' />}
                onChange={(e) => setData('issue_type', e.target.value)}
                className="mt-1 block w-full input-field"
              >
                <option value="">Select Issue Type</option>
                <option value="First Issue">First Issue</option>
                <option value="Re-Issue">Re-Issue</option>
              </SelectInput>
              <InputError message={errors.issue_type} className="mt-2" />
            </div>
            {data.issue_type === 'Re-Issue' &&(
              <div className='mt-2'>
                <InputLabel htmlFor="related_issue_type" value="Related Re-Issue" />
                <SelectInput
                  name="related_issue_type"
                  value={data.related_issue_type}
                  prefixIcon={<FaFileCircleQuestion size={18} className='items-center' />}
                  onChange={(e) => setData('related_issue_type', e.target.value)}
                  className="mt-1 block w-full input-field"
                >
                  <option value="">Choose Related Re-issue</option>
                  {formOption.map((formOptionItem) => (
                    <option key={formOptionItem.id} value={formOptionItem.car_form_number}>{formOptionItem.car_form_number}</option>
                  ))}
                </SelectInput>
                <InputError message={errors.related_issue_type} className="mt-2" />
              </div>
            )}
            {data.groups.map((group, groupIndex) => (
              <React.Fragment key={`group-${groupIndex}`}>
                <div className='border rounded-lg p-4 mt-4'>
                  <div>
                    <InputLabel htmlFor="reference" value="Reference" />
                    <SelectInput
                      name={`reference-${groupIndex}`}
                      value={group.reference}
                      prefixIcon={<FaFileCircleQuestion size={18} className='items-center' />}
                      onChange={(e) => handleReferenceChange(groupIndex, e.target.value)}
                      className="mt-1 block w-full input-field"
                    >
                      <option value="">Choose Reference</option>
                      <option value="ISO 9001">ISO 9001</option>
                      <option value="ISO 14001">ISO 14001</option>
                      <option value="ISO 45001">ISO 45001</option>
                    </SelectInput>
                    <InputError message={errors.reference} className="mt-2" />
                  </div>
                  
                  {group.isoClauses.map((isoClause, isoClauseIndex) => (
                    <div key={`isoClause-${groupIndex}-${isoClauseIndex}`} className='grid gap-1 grid-cols-12 mt-4'>
                      <div className='col-span-4'>
                        <InputLabel htmlFor={`clause-${groupIndex}-${isoClauseIndex}`} value="ISO Clause" />
                        <SelectInput
                          name={`clause-${groupIndex}-${isoClauseIndex}`}
                          value={isoClause.clause}
                          prefixIcon={<FaFileCircleQuestion size={18} className='items-center' />}
                          onChange={(e) => handleClauseChange(groupIndex, isoClauseIndex, 'clause', e.target.value)}
                          className="mt-1 block w-full input-field"
                        >
                          <option value="">Choose ISO Clause</option>
                          {isoClauseOption.map((isoClauseOptionItem, index) => (
                            <option key={`isoClause_${index}`} value={isoClauseOptionItem.description1}>{isoClauseOptionItem.description1}</option>
                          ))}
                        </SelectInput>
                        <InputError message={errors.iso_clause} className="mt-2" />
                      </div>
                      <div className='col-span-4'>
                        <InputLabel htmlFor={`subClause-${groupIndex}-${isoClauseIndex}`} value="ISO Sub Clause" />
                        <SelectInput
                          name={`subClause-${groupIndex}-${isoClauseIndex}`}
                          value={isoClause.subClause}
                          prefixIcon={<FaFileCircleQuestion size={18} className='items-center' />}
                          onChange={(e) => handleClauseChange(groupIndex, isoClauseIndex, 'subClause', e.target.value)}
                          className="mt-1 block w-full input-field"
                        >
                          <option value="">Choose ISO Sub Clause</option>
                          {isoClause.subClauseOptions && isoClause.subClauseOptions.map((subClause, index) => (
                            <option key={index} value={subClause.description1}>{subClause.description1}</option>
                          ))}
                        </SelectInput>
                        <InputError message={errors.sub_clause} className="mt-2" />
                      </div>
                      {group.isoClauses.length !== 1 && (
                        <div className='mt-3 flex justify-end items-center col-span-2'>
                          <span onClick={() => handleRemoveIsoClause(groupIndex, isoClauseIndex)} className='bg-red-500 rounded py-2 px-2 cursor-pointer'>Delete Clause</span>
                        </div>
                      )}
                      {group.isoClauses.length - 1 === isoClauseIndex && (
                        <div className='mt-3 flex justify-end items-center col-span-2'>
                          <span onClick={() => handleAddIsoClause(groupIndex)} className='bg-orange-400 rounded py-2 px-2 cursor-pointer'>Add Clause</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="grid gap-1 grid-cols-3 mt-2">
                  {data.groups.length !== 1 && (
                    <div className='flex justify-start items-center'>
                      <span onClick={() => handleRemoveGroup(groupIndex)} className='bg-red-500 rounded py-2 px-6 cursor-pointer'>Delete Reference</span>
                    </div>
                  )}
                  {data.groups.length - 1 === groupIndex && (
                    <div className='flex justify-start items-center'>
                      <span onClick={handleAddGroup} className='bg-orange-400 rounded py-2 px-6 cursor-pointer'>Add Reference</span>
                    </div>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
        <div className='mt-4'>
          <InputLabel htmlFor="nonconformance_classification" value="Nonconformance Classification" />
          <SelectInput
            required
            name="nonconformance_classification"
            value={data.nonconformance_classification}
            prefixIcon={<FaMagnifyingGlass size={18} className='items-center'/>}
            onChange={(e) => setData('nonconformance_classification', e.target.value)}
            className="mt-1 block w-full input-field"
          >
            <option value="">Choose Nonconformance Classification</option>
            {classificationOption.map(classification => (
              <option key={classification.id} value={classification.description1}>{classification.description1}</option>
            ))}
          </SelectInput>
          <InputError message={errors.nonconformance_classification} className="mt-2" />
        </div>
        <div className='mt-4'>
          <InputLabel htmlFor="nonconformance_observation" value="Nonconformance Observation" />
          <TextareaInput
            required
            name="nonconformance_observation"
            value={data.nonconformance_observation}
            prefixIcon={<FaComments size={18} className='items-center'/>}
            placeholder="Enter the Nonconformance Observation"
            onChange={(e) => setData('nonconformance_observation', e.target.value)}
            className="mt-1 block w-full input-field"
          />
          <InputError message={errors.nonconformance_observation} className="mt-2" />
        </div>
        <div className='mt-4'>
          <InputLabel htmlFor="auditor_initiator" value="Auditor / Initiator" />
          <TextInput
            required
            name="auditor_initiator"
            value={data.auditor_initiator}
            prefixIcon={<FaUserTie size={18} className='items-center'/>}
            placeholder="Enter the Auditor / Initiator"
            onChange={(e) => setData('auditor_initiator', e.target.value)}
            className="mt-1 block w-full input-field"
          />
          <InputError message={errors.auditor_initiator} className="mt-2" />
        </div>
        <div className='mt-4'>
          <InputLabel htmlFor="date_reported_to_ims" value="Date Reported to IMS" />
          <TextInput
            required
            name="date_reported_to_ims"
            type="date"
            prefixIcon={<FaCalendar size={18} className='items-center'/>}
            value={data.date_reported_to_ims}
            onChange={(e) => setData('date_reported_to_ims', e.target.value)}
            className="mt-1 block w-full input-field"
          />
          <InputError message={errors.date_reported_to_ims} className="mt-2" />
        </div>
        <div className='mt-4'>
          <InputLabel htmlFor="concerned_department" value="Concerned Department" />
          <SelectInput
            required
            name="concerned_department"
            value={data.concerned_department}
            prefixIcon={<FaBuildingUser size={18} className='items-center'/>}
            onChange={(e) => setData('concerned_department', e.target.value)}
            className="mt-1 block w-full input-field"
          >
            <option value="">Choose Department</option>
            {departmentOption.map((department, index) => (
              <option key={`department_${index}`} value={department.description1}>{department.description1}</option>
            ))}
          </SelectInput>
          <InputError message={errors.concerned_department} className="mt-2" />
        </div>
        <div className='mt-4'>
          <InputLabel htmlFor="approver_id" value="Approver" />
          <SelectInput
            required
            name="approver_id"
            value={data.approver_id}
            prefixIcon={<FaUser size={18} className='items-center'/>}
            onChange={(e) => setData('approver_id', e.target.value)}
            className="mt-1 block w-full input-field"
          >
            <option value="">Choose Approver</option>
            {users.data.filter(item => {
                return Array.isArray(item.rolesName) && item.rolesName.some(role => role.name === 'Processor');
              })
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
          </SelectInput>
          <InputError message={errors.approver_id} className="mt-2" />
        </div>
      </div>
    </>
  )
}
