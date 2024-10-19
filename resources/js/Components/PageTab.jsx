import { Tab } from "@headlessui/react";

export default function PageTab({children, className = '', onClick = () => {}, onChange = () => {}}){
  return(
    <Tab onClick={onClick} onChange={onChange} className={
      'py-2 px-8 text-sm font-medium cursor-pointer ' + 
      'data-[selected]:bg-[#8d8a8a75] data-[selected]:rounded-t ' +
      'data-[selected]:border-1 data-[selected]:border-[#b8b8b8] data-[selected]:text-[#495057] ' + className}>
      {children}
    </Tab>
  );
}