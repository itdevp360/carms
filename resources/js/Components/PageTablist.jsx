import { TabList } from "@headlessui/react";

export default function PageTablist({children, className = ''}){
  return (
    <TabList className={'border-b-2 border-gray-300 ' + className}>
      {children}
    </TabList>
  );
}