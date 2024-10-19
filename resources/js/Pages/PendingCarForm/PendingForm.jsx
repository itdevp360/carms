import { Head } from "@inertiajs/react";
import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageLayout from "@/Components/PageLayout";
import PageTabGroup from "@/Components/PageTabGroup";
import PageTab from "@/Components/PageTab";
import PageTablist from "@/Components/PageTablist";
import CountForm from "@/Components/CountForm";
import PageTabPanels from "@/Components/PageTabPanels";
import PageTabPanel from "@/Components/PageTabPanel";
import PageTableLayout from "@/Components/PageTableLayout";
import { useSelectedTabIndex } from "@/Hooks/useSelectedTabIndex";

export default function PendingForm({ auth, forms }) {
  const {selectedTabIndex, setSelectedTabIndex} = useSelectedTabIndex();
  const [selectedID, setSelectedID] = useState(null);
  useEffect(() => {
    const path = window.location.pathname;

    const pathParts = path.split('/');
    const id = pathParts[pathParts.length - 1];
    const status = pathParts[pathParts.length - 2];

    if (status === "For%20Submission") {
      setSelectedTabIndex(0);
      setSelectedID(id);
    } else if (status === "Revision") {
      setSelectedTabIndex(1);
      setSelectedID(id);
    } else if (status === "Draft") {
      setSelectedTabIndex(2);
      setSelectedID(id);
    }
  }, []);

  return (
    <AuthenticatedLayout
      user={auth.user}
      roles={auth.roles}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">CAR Form</h2>}
      breadcurmb="CAR Forms / Pending"
    >
      <Head title="Pending Car Form" />
      <PageLayout>
        <PageTabGroup selectedIndex={selectedTabIndex} setSelectedIndex={setSelectedTabIndex}>
          <PageTablist>
            <PageTab>
              Pending CAR Forms
              <CountForm forms={forms} formStatus={["For Submission"]} />
            </PageTab>
            <PageTab>
              Revision
              <CountForm forms={forms} formStatus={["Revision"]} />
            </PageTab>
            <PageTab>
              Draft
              <CountForm forms={forms} formStatus={["Draft"]} />
            </PageTab>
          </PageTablist>
          <PageTabPanels>
            <PageTabPanel>
              <PageTableLayout forms={forms} formStatus="For Submission" title="Pending CAR Forms" roles={auth.roles} selectedID={selectedID} />
            </PageTabPanel>
            <PageTabPanel>
              <PageTableLayout forms={forms} formStatus="Revision" title="Revision CAR Forms" roles={auth.roles} selectedID={selectedID}/>
            </PageTabPanel>
            <PageTabPanel>
              <PageTableLayout forms={forms} formStatus="Draft" title="Pending CAR Forms(Drafts)" roles={auth.roles} selectedID={selectedID}/>
            </PageTabPanel>
          </PageTabPanels>
        </PageTabGroup>
      </PageLayout>
    </AuthenticatedLayout>
  );
}
