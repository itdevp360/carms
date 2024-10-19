import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import { useState } from "react";
import { FaCalendar } from "react-icons/fa6";

export default function DashboardTabLayout({ dataCount }) {
  const currentYear = new Date().getFullYear();
  const [startYear, setStartYear] = useState(currentYear - 2);
  const [endYear, setEndYear] = useState(currentYear);

  // Generate an array of years from startYear to endYear
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  // Function to calculate totals for each category
  const calculateTotals = () => {
    const totals = {
      internalAudit: { closed: 0, open: 0, cancelled: 0 },
      nonAudit: { closed: 0, open: 0, cancelled: 0 },
      voiceOfCustomer: { closed: 0, open: 0, cancelled: 0 },
      externalAudit: { closed: 0, open: 0, cancelled: 0 },
    };

    years.forEach((year) => {
      totals.internalAudit.closed += dataCount.filter(data => data.source === "Internal Audit" && data.status === "Closed" && new Date(data.created_at).getFullYear() === year).length;
      totals.internalAudit.open += dataCount.filter(data => data.source === "Internal Audit" && !["Closed", "Cancelled"].includes(data.status) && new Date(data.created_at).getFullYear() === year).length;
      totals.internalAudit.cancelled += dataCount.filter(data => data.source === "Internal Audit" && data.status === "Cancelled" && new Date(data.created_at).getFullYear() === year).length;

      totals.nonAudit.closed += dataCount.filter(data => data.source === "Non Audit" && data.status === "Closed" && new Date(data.created_at).getFullYear() === year).length;
      totals.nonAudit.open += dataCount.filter(data => data.source === "Non Audit" && !["Closed", "Cancelled"].includes(data.status) && new Date(data.created_at).getFullYear() === year).length;
      totals.nonAudit.cancelled += dataCount.filter(data => data.source === "Non Audit" && data.status === "Cancelled" && new Date(data.created_at).getFullYear() === year).length;

      totals.voiceOfCustomer.closed += dataCount.filter(data => data.source === "Voice of Customer" && data.status === "Closed" && new Date(data.created_at).getFullYear() === year).length;
      totals.voiceOfCustomer.open += dataCount.filter(data => data.source === "Voice of Customer" && !["Closed", "Cancelled"].includes(data.status) && new Date(data.created_at).getFullYear() === year).length;
      totals.voiceOfCustomer.cancelled += dataCount.filter(data => data.source === "Voice of Customer" && data.status === "Cancelled" && new Date(data.created_at).getFullYear() === year).length;

      totals.externalAudit.closed += dataCount.filter(data => !["Voice of Customer", "Internal Audit", "Non Audit", "Request For Action"].includes(data.source) && data.status === "Closed" && new Date(data.created_at).getFullYear() === year).length;
      totals.externalAudit.open += dataCount.filter(data => !["Voice of Customer", "Internal Audit", "Non Audit", "Request For Action"].includes(data.source) && !["Closed", "Cancelled"].includes(data.status) && new Date(data.created_at).getFullYear() === year).length;
      totals.externalAudit.cancelled += dataCount.filter(data => !["Voice of Customer", "Internal Audit", "Non Audit", "Request For Action"].includes(data.source) && data.status === "Cancelled" && new Date(data.created_at).getFullYear() === year).length;
    });

    return totals;
  };

  const totals = calculateTotals();

  return (
    <>
      <div className="px-8 py-4">
        <div className="flex justify-center">
          <div className="me-2">
            <InputLabel htmlFor="start_year" value="Start Year" />
            <SelectInput
              prefixIcon={<FaCalendar />}
              className="mt-1 block w-full input-field"
              value={startYear}
              onChange={(e) => setStartYear(parseInt(e.target.value))}
            >
              {/* Options from current year to 2019 */}
              {Array.from({ length: currentYear - 2018 }, (_, i) => currentYear - i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </SelectInput>
          </div>
          <div className="ms-2">
            <InputLabel htmlFor="end_year" value="End Year" />
            <SelectInput
              prefixIcon={<FaCalendar />}
              className="mt-1 block w-full input-field"
              value={endYear}
              onChange={(e) => setEndYear(parseInt(e.target.value))}
            >
              {/* Options from current year to 2019 */}
              {Array.from({ length: currentYear - 2018 }, (_, i) => currentYear - i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </SelectInput>
          </div>
        </div>
        <div>
          <table className="border-gray-400 w-full">
            <thead>
              <tr>
                <th className="border border-gray-400 bg-[#f4f4f4]" rowSpan={2}>Year</th>
                <th className="border border-gray-400 bg-[#f4f4f4]" colSpan={3}>Internal Audit</th>
                <th className="border border-gray-400 bg-[#f4f4f4]" colSpan={3}>Non-Audit</th>
                <th className="border border-gray-400 bg-[#f4f4f4]" colSpan={3}>Voice of Customer</th>
                <th className="border border-gray-400 bg-[#f4f4f4]" colSpan={3}>External Audit</th>
              </tr>
              <tr>
                <th className="border border-gray-400 bg-[#f4f4f4] text-[10px]">Closed</th>
                <th className="border border-gray-400 bg-[#f4f4f4] text-[10px]">Open</th>
                <th className="border border-gray-400 bg-[#f4f4f4] text-[10px]">Cancelled</th>
                <th className="border border-gray-400 bg-[#f4f4f4] text-[10px]">Closed</th>
                <th className="border border-gray-400 bg-[#f4f4f4] text-[10px]">Open</th>
                <th className="border border-gray-400 bg-[#f4f4f4] text-[10px]">Cancelled</th>
                <th className="border border-gray-400 bg-[#f4f4f4] text-[10px]">Closed</th>
                <th className="border border-gray-400 bg-[#f4f4f4] text-[10px]">Open</th>
                <th className="border border-gray-400 bg-[#f4f4f4] text-[10px]">Cancelled</th>
                <th className="border border-gray-400 bg-[#f4f4f4] text-[10px]">Closed</th>
                <th className="border border-gray-400 bg-[#f4f4f4] text-[10px]">Open</th>
                <th className="border border-gray-400 bg-[#f4f4f4] text-[10px]">Cancelled</th>
              </tr>
            </thead>
            <tbody>
              {years.map((year, index) => (
                <tr 
                  key={index}
                  style={{
                    backgroundColor:
                      index % 3 === 0
                        ? "#fff2cc"
                        : index % 3 === 1
                        ? "#cfe2f3"
                        : index % 3 === 2
                        ? "#d9d2e9"
                        : "white",
                  }}
                >
                  <td className="border border-gray-400 font-bold"><p className="flex justify-center">{year}</p></td>
                  <td className="border border-gray-400 font-thin"><p className="flex justify-center">{dataCount.filter(data => data.source === "Internal Audit" && data.status === "Closed" && new Date(data.created_at).getFullYear() === year).length}</p></td>
                  <td className="border border-gray-400 font-thin"><p className="flex justify-center">{dataCount.filter(data => data.source === "Internal Audit" && !["Closed", "Cancelled"].includes(data.status) && new Date(data.created_at).getFullYear() === year).length}</p></td>
                  <td className="border border-gray-400 font-thin"><p className="flex justify-center">{dataCount.filter(data => data.source === "Internal Audit" && data.status === "Cancelled" && new Date(data.created_at).getFullYear() === year).length}</p></td>
                  <td className="border border-gray-400 font-thin"><p className="flex justify-center">{dataCount.filter(data => data.source === "Non Audit" && data.status === "Closed" && new Date(data.created_at).getFullYear() === year).length}</p></td>
                  <td className="border border-gray-400 font-thin"><p className="flex justify-center">{dataCount.filter(data => data.source === "Non Audit" && !["Closed", "Cancelled"].includes(data.status) && new Date(data.created_at).getFullYear() === year).length}</p></td>
                  <td className="border border-gray-400 font-thin"><p className="flex justify-center">{dataCount.filter(data => data.source === "Non Audit" && data.status === "Cancelled" && new Date(data.created_at).getFullYear() === year).length}</p></td>
                  <td className="border border-gray-400 font-thin"><p className="flex justify-center">{dataCount.filter(data => data.source === "Voice of Customer" && data.status === "Closed" && new Date(data.created_at).getFullYear() === year).length}</p></td>
                  <td className="border border-gray-400 font-thin"><p className="flex justify-center">{dataCount.filter(data => data.source === "Voice of Customer" && !["Closed", "Cancelled"].includes(data.status) && new Date(data.created_at).getFullYear() === year).length}</p></td>
                  <td className="border border-gray-400 font-thin"><p className="flex justify-center">{dataCount.filter(data => data.source === "Voice of Customer" && data.status === "Cancelled" && new Date(data.created_at).getFullYear() === year).length}</p></td>
                  <td className="border border-gray-400 font-thin"><p className="flex justify-center">{dataCount.filter(data => !["Voice of Customer", "Internal Audit", "Non Audit", "Request For Action"].includes(data.source) && data.status === "Closed" && new Date(data.created_at).getFullYear() === year).length}</p></td>
                  <td className="border border-gray-400 font-thin"><p className="flex justify-center">{dataCount.filter(data => !["Voice of Customer", "Internal Audit", "Non Audit", "Request For Action"].includes(data.source) && !["Closed", "Cancelled"].includes(data.status) && new Date(data.created_at).getFullYear() === year).length}</p></td>
                  <td className="border border-gray-400 font-thin"><p className="flex justify-center">{dataCount.filter(data => !["Voice of Customer", "Internal Audit", "Non Audit", "Request For Action"].includes(data.source) && data.status === "Cancelled" && new Date(data.created_at).getFullYear() === year).length}</p></td>
                </tr>
              ))}
              {/* Total Row */}
              <tr className="bg-[#ead1dc] border-t-2 border-black">
                <td className="border border-gray-400 font-extrabold text-2xl"><p className="flex justify-center">Total</p></td>
                <td className="border border-gray-400 font-extrabold text-2xl"><p className="flex justify-center">{totals.internalAudit.closed}</p></td>
                <td className="border border-gray-400 font-extrabold text-2xl"><p className="flex justify-center">{totals.internalAudit.open}</p></td>
                <td className="border border-gray-400 font-extrabold text-2xl"><p className="flex justify-center">{totals.internalAudit.cancelled}</p></td>
                <td className="border border-gray-400 font-extrabold text-2xl"><p className="flex justify-center">{totals.nonAudit.closed}</p></td>
                <td className="border border-gray-400 font-extrabold text-2xl"><p className="flex justify-center">{totals.nonAudit.open}</p></td>
                <td className="border border-gray-400 font-extrabold text-2xl"><p className="flex justify-center">{totals.nonAudit.cancelled}</p></td>
                <td className="border border-gray-400 font-extrabold text-2xl"><p className="flex justify-center">{totals.voiceOfCustomer.closed}</p></td>
                <td className="border border-gray-400 font-extrabold text-2xl"><p className="flex justify-center">{totals.voiceOfCustomer.open}</p></td>
                <td className="border border-gray-400 font-extrabold text-2xl"><p className="flex justify-center">{totals.voiceOfCustomer.cancelled}</p></td>
                <td className="border border-gray-400 font-extrabold text-2xl"><p className="flex justify-center">{totals.externalAudit.closed}</p></td>
                <td className="border border-gray-400 font-extrabold text-2xl"><p className="flex justify-center">{totals.externalAudit.open}</p></td>
                <td className="border border-gray-400 font-extrabold text-2xl"><p className="flex justify-center">{totals.externalAudit.cancelled}</p></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
