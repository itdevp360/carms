import PageTab from "@/Components/PageTab";
import PageTabGroup from "@/Components/PageTabGroup";
import PageTablist from "@/Components/PageTablist";
import PageTabPanel from "@/Components/PageTabPanel";
import PageTabPanels from "@/Components/PageTabPanels";
import DashboardTabLayout from "./DashboardTab/DashboardTabLayout";
import ChartTabLayout from "./DashboardTab/ChartTabLayout";

export function DashboardLayout({dataCount}){
  return (
    <>    
      <div className="py-4">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="bg-white overflow-hidden shadow sm:rounded-lg">
                  <PageTabGroup>
                    <PageTablist>
                      <PageTab>
                        Dashboard
                      </PageTab>
                      <PageTab>
                        Chart
                      </PageTab>
                    </PageTablist>
                    <PageTabPanels>
                      <PageTabPanel>
                        <DashboardTabLayout dataCount={dataCount}/>
                      </PageTabPanel>
                      <PageTabPanel>
                        <ChartTabLayout forms={dataCount}/>
                      </PageTabPanel>
                    </PageTabPanels>
                  </PageTabGroup>
              </div>
          </div>
      </div>
    </>
  );
}