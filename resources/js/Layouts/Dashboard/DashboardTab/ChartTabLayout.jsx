import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import { Chart } from "primereact/chart";
import { FaBuildingUser, FaCalendar, FaFile, FaStar } from "react-icons/fa6";
import { useState } from "react";

export default function ChartTabLayout({ forms }) {
  const currentYear = new Date().getFullYear();
  const [startYear, setStartYear] = useState(currentYear - 2);
  const [endYear, setEndYear] = useState(currentYear);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCARType, setSelectedCARType] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(""); // New state for department filter

  // Filter forms by year, status, and department
  const filterFormsByYearStatusAndDepartment = (form, year, status, department) => {
    const formYear = new Date(form.created_at).getFullYear();

    // Check if the form matches the selected department, if any
    const matchesDepartment = department === "" || form.concerned_department === department;

    // Logic for "Open" status selection
    if (status === "Open") {
      return formYear === year && form.status !== "Closed" && form.status !== "Cancelled" && matchesDepartment;
    }
    
    // Logic for specific status ("Closed" or "Cancelled")
    if (status !== "") {
      return formYear === year && form.status === status && matchesDepartment;
    }

    // Default logic for all statuses
    return formYear === year && matchesDepartment;
  };

  // Create chart data based on selected year range, status, and department
  const getChartDataForYearRange = (source) => {
    const years = [];
    const datasetClosed = [];
    const datasetCancelled = [];
    const datasetOpen = [];

    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
      const formsForYear = forms.filter((form) => 
        filterFormsByYearStatusAndDepartment(form, year, selectedStatus, selectedDepartment)
      );
      if(source === "External Audit"){
        datasetClosed.push(formsForYear.filter((form) => form.status === "Closed" && form.source !== "Internal Audit" && form.source !== "Non Audit" && form.source !== "Voice of Customer" && form.source !== "Request For Action").length);
        datasetCancelled.push(formsForYear.filter((form) => form.status === "Cancelled" && form.source !== "Internal Audit" && form.source !== "Non Audit" && form.source !== "Voice of Customer" && form.source !== "Request For Action").length);
        datasetOpen.push(formsForYear.filter((form) => form.status !== "Closed" && form.status !== "Cancelled" && form.source !== "Internal Audit" && form.source !== "Non Audit" && form.source !== "Voice of Customer" && form.source !== "Request For Action").length);
      }else {
        datasetClosed.push(formsForYear.filter((form) => form.status === "Closed" && form.source === source).length);
        datasetCancelled.push(formsForYear.filter((form) => form.status === "Cancelled" && form.source === source).length);
        datasetOpen.push(formsForYear.filter((form) => form.status !== "Closed" && form.status !== "Cancelled" && form.source === source).length);
      }
    }

    return {
      labels: years,
      datasets: [
        {
          type: 'bar',
          label: 'Closed',
          backgroundColor: ['#adb5bd'],
          data: datasetClosed,
        },
        {
          type: 'bar',
          label: 'Cancelled',
          backgroundColor: ['#f2f2f2'],
          data: datasetCancelled,
        },
        {
          type: 'bar',
          label: 'Open',
          backgroundColor: ['red'],
          data: datasetOpen,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
    },
  };

  // Determine which chart to show based on the selected CAR type
  const renderChart = () => {
    switch (selectedCARType) {
      case "ia":
        return (
          <Chart
            type="bar"
            data={getChartDataForYearRange("Internal Audit")}
            options={chartOptions}
            className="h-[300px] col-span-2"
          />
        );
      case "na":
        return (
          <Chart
            type="bar"
            data={getChartDataForYearRange("Non Audit")}
            options={chartOptions}
            className="h-[300px] col-span-2"
          />
        );
      case "voc":
        return (
          <Chart
            type="bar"
            data={getChartDataForYearRange("Voice of Customer")}
            options={chartOptions}
            className="h-[300px] col-span-2"
          />
        );
      case "ea":
        return (
          <Chart
            type="bar"
            data={getChartDataForYearRange("External Audit")}
            options={chartOptions}
            className="h-[300px] col-span-2"
          />
        );
      default:
        // If no CAR type is selected, show all charts
        return (
          <>
            <div className="border">
              <InputLabel htmlFor="internal_audit" value="Internal Audit" className="flex justify-center text-xl font-semibold"/>
              <Chart
                type="bar"
                data={getChartDataForYearRange("Internal Audit")}
                options={chartOptions}
                className="h-[200px]"
              />
            </div>
            <div className="border">
              <InputLabel htmlFor="non_audit" value="Non-Audit" className="flex justify-center text-xl font-semibold"/>
              <Chart
                type="bar"
                data={getChartDataForYearRange("Non Audit")}
                options={chartOptions}
                className="h-[200px]"
              />
            </div>
            <div className="border">
              <InputLabel htmlFor="voice_of_customer" value="Voice of Customer" className="flex justify-center text-xl font-semibold"/>
              <Chart
                type="bar"
                data={getChartDataForYearRange("Voice of Customer")}
                options={chartOptions}
                className="h-[200px]"
              />
            </div>
            <div className="border">
              <InputLabel htmlFor="external_audit" value="External Audit" className="flex justify-center text-xl font-semibold"/>
              <Chart
                type="bar"
                data={getChartDataForYearRange("External Audit")}
                options={chartOptions}
                className="h-[200px]"
              />
            </div>
          </>
        );
    }
  };

  return (
    <div className="px-8 py-4">
      <div className="flex justify-evenly">
        <div>
          <InputLabel htmlFor="status" value="Status" />
          <SelectInput
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)} // Capture the selected status
            prefixIcon={<FaStar className="flex items-center" />}
            className="mt-1 block w-full input-field"
          >
            <option value="">All</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Closed">Closed</option>
            <option value="Open">Open</option>
          </SelectInput>
        </div>
        <div>
          <InputLabel htmlFor="car_type" value="CAR Type" />
          <SelectInput
            prefixIcon={<FaFile className="flex items-center" />}
            value={selectedCARType}
            onChange={(e) => setSelectedCARType(e.target.value)}
            className="mt-1 block w-full input-field"
          >
            <option value="">All</option>
            <option value="ia">IA</option>
            <option value="na">NA</option>
            <option value="voc">VOC</option>
            <option value="ea">EA</option>
          </SelectInput>
        </div>
        <div>
          <InputLabel htmlFor="from" value="From" />
          <SelectInput
            value={startYear}
            onChange={(e) => setStartYear(parseInt(e.target.value))}
            prefixIcon={<FaCalendar className="flex items-center" />}
            className="mt-1 block w-full input-field"
          >
            {Array.from({ length: currentYear - 2018 }, (_, i) => {
              const year = currentYear - i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </SelectInput>
        </div>
        <div>
          <InputLabel htmlFor="to" value="To" />
          <SelectInput
            value={endYear}
            onChange={(e) => setEndYear(parseInt(e.target.value))}
            prefixIcon={<FaCalendar className="flex items-center" />}
            className="mt-1 block w-full input-field"
          >
            {Array.from({ length: currentYear - 2018 }, (_, i) => {
              const year = currentYear - i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </SelectInput>
        </div>
        <div>
          <InputLabel htmlFor="department" value="Department" />
          <SelectInput
            value={selectedDepartment} // Bind department state
            onChange={(e) => setSelectedDepartment(e.target.value)} // Capture department value
            prefixIcon={<FaBuildingUser className="flex items-center" />}
            className="mt-1 block w-full input-field"
          >
            <option value="">All</option>
            <option value="Consulting">Consulting</option>
            <option value="ESH">ESH</option>
            <option value="FAD">FAD</option>
            <option value="HR">HR</option>
            <option value="IH Lab">IH Lab</option>
            <option value="IH WEM">IH WEM</option>
            <option value="IMS">IMS</option>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="OSHMS">OSHMS</option>
            <option value="Sales">Sales</option>
            <option value="Testing">Testing</option>
          </SelectInput>
        </div>
      </div>

      <div className="grid gap-1 grid-cols-2 mt-2">
        {renderChart()}
      </div>
    </div>
  );
}
