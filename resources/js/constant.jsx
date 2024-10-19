export const rootCauseAnalysisDefaultChecked = {
  manpower: false,
  machinery: false,
  materials: false,
  method: false,
  motherNature: false,
  measurement: false,
  others: false,
};

export const rootCauseAnalysisDefaultFormat = {
  manpower: [],
  machinery: [],
  materials: [],
  method: [],
  motherNature: [],
  measurement: [],
  others: [],
};
export const categories = [
  { name: "manpower", label: "Manpower" },
  { name: "machinery", label: "Machinery" },
  { name: "materials", label: "Materials" },
  { name: "method", label: "Method" },
  { name: "motherNature", label: "Mother Nature" },
  { name: "measurement", label: "Measurement" },
  { name: "others", label: "Others" },
];
export const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');