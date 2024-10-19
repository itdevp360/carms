import { TabPanels } from "@headlessui/react";

export default function PageTabPanels({children, className = ""}){
  return (
    <TabPanels className={'flex-grow flex flex-col ' + className}>
      {children}
    </TabPanels>
  );
}
