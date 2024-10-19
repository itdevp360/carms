import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { FaUserTie  } from "react-icons/fa6";

export default function CreateNewReceiver({ data, setData, errors, users }) {
  const handleValueChange = (index, event) => {
    const values = [...data.email_cc];
    values[index].value = event.target.value;
    setData('email_cc', values);
  };

  const handleAddFields = () => {
    const values = [...data.email_cc, { value: "" }];
    setData('email_cc', values);
  };

  const handleRemoveFields = (index) => {
    const values = [...data.email_cc];
    values.splice(index, 1);
    setData('email_cc', values);
  };

  const handleReceiverEmailChange = (e) => {
    const receiverName = e.target.value;
    const receiverEmail = users.data.filter(item => {
      return Array.isArray(item.rolesName) && item.rolesName.some(role => role.name === 'Process Owner' || role.name === "Processor" || role.name === "Department Head");
    }).find((receiver) => receiverName == receiver.id);
    setData(prevData => ({...prevData, receiver_id: receiverName, email_receiver: receiverEmail ? receiverEmail.email || '' : ''}))
  }

  return (
    <div>
      <div>
        <InputLabel htmlFor="receiver_id" value="Name of Receiver" />
        <SelectInput
          required
          name="receiver_id"
          value={data.receiver_id}
          prefixIcon={<FaUserTie size={18} className='items-center' />}
          onChange={handleReceiverEmailChange}
          className="mt-1 block w-full input-field"
        >
          <option value="">Select Name of Receiver</option>
          {users.data.filter(item => {
                return Array.isArray(item.rolesName) && item.rolesName.some(role => role.name === 'Process Owner' || role.name === "Processor" || role.name === "Department Head");
              })
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
        </SelectInput>
        <InputError message={errors.receiver_id} className="mt-2" />
      </div>
      <div>
        <InputLabel htmlFor="email_receiver" value="Email of Receiver" />
        <TextInput
          required
          name="email_receiver"
          value={data.email_receiver}
          placeholder="Enter the email of Receiver"
          prefixIcon={<FaUserTie size={18} className='items-center' />}
          onChange={(e) => setData('email_receiver', e.target.value)}
          className="mt-1 block w-full input-field"
        />
        <InputError message={errors.email_receiver} className="mt-2" />
      </div>
      {data.email_cc.map((inputField, index) => (
        <div key={index} className="grid gap-1 grid-cols-8">
          <div className="col-span-7">
            <InputLabel htmlFor={`email_cc_${index}`} value="Email CC" />
            <TextInput
              name={`email_cc_${index}`}
              value={inputField.value}
              placeholder="Enter the email CC"
              prefixIcon={<FaUserTie size={18} className='items-center' />}
              onChange={(e) => handleValueChange(index, e)}
              className="mt-1 block w-full input-field"
            />
          </div>
          <div className="mt-4 flex items-center justify-end">
            <span onClick={() => handleRemoveFields(index)} className='bg-red-500 rounded py-1 px-6 cursor-pointer'>Delete</span>
          </div>
        </div>
      ))}
      <div className="grid gap-1 grid-cols-4">
        <div className='flex justify-start items-center'>
          <span onClick={handleAddFields} className='bg-orange-400 rounded py-1 px-6 cursor-pointer'>Add CC</span>
        </div>
      </div>
    </div>
  );
}
