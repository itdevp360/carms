export default function ProcessorCountForm({ forms, formStatus = [] }) {
  const count = forms.filter(item =>
    formStatus.some(status => item.status.includes(status))
  ).length;

  return (
    <span className="ms-2 inline-flex items-center rounded-full bg-[#ffaf54d6] px-2 py-0.5 
      text-xs font-bold text-black ring-1 ring-inset ring-[##a85a00]">
      {count}
    </span>
  );
}
