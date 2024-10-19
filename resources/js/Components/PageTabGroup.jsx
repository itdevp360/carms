import { TabGroup } from "@headlessui/react";

export default function PageTabGroup({children, setSelectedIndex, className = '', selectedIndex = null}){
  return (
    <TabGroup selectedIndex={selectedIndex} className={'flex flex-col flex-grow ' + className } onChange={setSelectedIndex}>
      {children}
    </TabGroup>
  );
}