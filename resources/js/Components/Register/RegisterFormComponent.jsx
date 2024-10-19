import Checkbox from '@/Components/Checkbox';
import SelectInput from '@/Components/SelectInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

const departments = [
  { name: 'consulting', label: 'Consulting' },
  { name: 'ih_lab', label: 'IH Lab' },
  { name: 'marketing', label: 'Marketing' },
  { name: 'top_management', label: 'Top Management' },
  { name: 'esh', label: 'ESH' },
  { name: 'ih_wem', label: 'IH WEM' },
  { name: 'oshms', label: 'OSHMS' },
  { name: 'fad', label: 'FAD' },
  { name: 'ims', label: 'IMS' },
  { name: 'sales', label: 'Sales' },
  { name: 'hr', label: 'HR' },
  { name: 'it', label: 'IT' },
  { name: 'testing', label: 'Testing' },
];

const CheckboxGroup = ({ data, setData, checkboxes }) => {
  return (
    <div className="grid gap-1 grid-cols-4">
      {checkboxes.map((item, index) => (
        <label key={item.name} className="flex items-center">
          <Checkbox
            name={item.name}
            checked={data[item.name]}
            onChange={(e) => setData(item.name, e.target.checked)}
          />
          <span className="ms-2 text-sm text-gray-600">{item.label}</span>
        </label>
      ))}
    </div>
  );
};

export default function RegisterFormComponent({ roles }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: '',
    consulting: false,
    ih_lab: false,
    marketing: false,
    top_management: false,
    esh: false,
    ih_wem: false,
    oshms: false,
    fad: false,
    ims: false,
    sales: false,
    hr: false,
    it: false,
    testing: false,
    dept_head: false,
    appr: false,
  });

  const submit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#f99d35d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        post(route('register'), {
          onFinish: () => reset(),
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
            Swal.fire({
              icon: "success",
              title: "Success!",
              timer: 5000,
              text: "Successfully created !",
            });
          }
        });
      }
    });
  };

  return (
    <>
      <div className="py-4">
        <div className="max-w-12xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <form onSubmit={submit}>
              {/* 1st Row */}
              <div className="grid gap-1 grid-cols-2 mt-2">
                <div className="me-2">
                  <InputLabel htmlFor="name" value="Name" />
                  <TextInput
                    id="name"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    autoComplete="name"
                    placeholder="Enter Fullname"
                    onChange={(e) => setData('name', e.target.value)}
                    required
                  />
                  <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="ms-2">
                  <InputLabel htmlFor="email" value="Email" />
                  <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    autoComplete="username"
                    placeholder="Enter Email"
                    onChange={(e) => setData('email', e.target.value)}
                    required
                  />
                  <InputError message={errors.email} className="mt-2" />
                </div>
              </div>
              {/* 2 Row */}
              <p className="mt-2 block font-medium text-sm text-gray-700">Select Department</p>
              <CheckboxGroup data={data} setData={setData} checkboxes={departments} />
              {/* 3 Row */}
              <div className="grid gap-1 grid-cols-2 mt-2">
                <div className="me-2">
                  <InputLabel htmlFor="password" value="Password" />
                  <TextInput
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                    placeholder="Enter Password"
                    onChange={(e) => setData('password', e.target.value)}
                    required
                  />
                  <InputError message={errors.password} className="mt-2" />
                </div>
                <div className="ms-2">
                  <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                  <TextInput
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                    placeholder="Enter Password Confirm"
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    required
                  />
                  <InputError message={errors.password_confirmation} className="mt-2" />
                </div>
              </div>
              {/* 4 Row */}
              <div className="grid gap-1 grid-cols-2 mt-2">
                <div className="me-4">
                  <InputLabel htmlFor="role" value="Role" />
                  <SelectInput
                    id="role"
                    name="role"
                    value={data.role}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('role', e.target.value)}
                  >
                    <option value="">Select Roles</option>
                    {roles.data.map((role, index) => (
                      <option key={`${role.id}-${index}`} value={role.id}>{role.name}</option>
                    ))}
                  </SelectInput>
                  <InputError message={errors.role} className="mt-2" />
                  {data.role === "2" && (
                    <div className="grid gap-1 grid-cols-2 mt-4">
                      <label className="flex items-center">
                        <Checkbox
                          name="dept_head"
                          checked={data.dept_head}
                          onChange={(e) => setData('dept_head', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600">Department Head</span>
                      </label>
                      <label className="flex items-center">
                        <Checkbox
                          name="appr"
                          checked={data.appr}
                          onChange={(e) => setData('appr', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600">Approver</span>
                      </label>
                    </div>
                  )}
                </div>
                <div>
                  <PrimaryButton className="mt-6 block w-full" disabled={processing}>
                    Register
                  </PrimaryButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}