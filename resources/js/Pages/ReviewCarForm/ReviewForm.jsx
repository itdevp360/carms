import CountForm from "@/Components/CountForm";
import PageLayout from "@/Components/PageLayout";
import PageTab from "@/Components/PageTab";
import PageTabGroup from "@/Components/PageTabGroup";
import PageTableLayout from "@/Components/PageTableLayout";
import PageTablist from "@/Components/PageTablist";
import PageTabPanel from "@/Components/PageTabPanel";
import PageTabPanels from "@/Components/PageTabPanels";
import { useSelectedTabIndex } from "@/Hooks/useSelectedTabIndex";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function ReviewForm({auth, forms}){
  const {selectedTabIndex, setSelectedTabIndex} = useSelectedTabIndex();
  const [selectedID, setSelectedID] = useState(null);
  useEffect(() => {
    const path = window.location.pathname;

    const pathParts = path.split('/');
    const id = pathParts[pathParts.length - 1];
    const status = pathParts[pathParts.length - 2];

    if (status === "Manager's%20Review") {
      setSelectedTabIndex(0);
      setSelectedID(id);
    } else if (status === "Manager's%20Revised") {
      setSelectedTabIndex(1);
      setSelectedID(id);
    }
  }, []);
  return(
    <AuthenticatedLayout
      user={auth.user}
      roles={auth.roles}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Review Forms</h2>}
      breadcrumb="CAR Forms / For Review"
    >
      <Head title="CAR Review"/>
        <PageLayout>
          <PageTabGroup selectedIndex={selectedTabIndex} setSelectedIndex={setSelectedTabIndex}>
            <PageTablist>
              <PageTab>
                Review
                <CountForm forms={forms} formStatus={["Manager's Review"]}/>
              </PageTab>
              <PageTab>
                Revised
                <CountForm forms={forms} formStatus={["Manager's Revised"]}/>
              </PageTab>
            </PageTablist>
            <PageTabPanels>
              <PageTabPanel>
                <PageTableLayout forms={forms} formStatus="Manager's Review" title="Review the CAR Forms" roles={auth.roles} selectedID={selectedID}/>
              </PageTabPanel>
              <PageTabPanel>
                <PageTableLayout forms={forms} formStatus="Manager's Revised" title="Review the CAR Forms (Revised)" roles={auth.roles} selectedID={selectedID}/>
              </PageTabPanel>
            </PageTabPanels>
          </PageTabGroup>
        </PageLayout>
    </AuthenticatedLayout>
  );
}