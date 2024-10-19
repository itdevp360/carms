import { TabPanel } from "@headlessui/react";

export default function PageTabPanel({children, className = ""}){
  return (
    <TabPanel className={"px-4 pb-5 flex-grow " + className}>
      {children}
    </TabPanel>
  );
}