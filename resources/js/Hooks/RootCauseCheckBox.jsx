import { useState } from "react";

export function RootCauseCheckBox(setData) {
  const [checked, setChecked] = useState({
    manpower: false,
    machinery: false,
    materials: false,
    method: false,
    motherNature: false,
    measurement: false,
    others: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked: isChecked } = e.target;

    setChecked((prevState) => ({
      ...prevState,
      [name]: isChecked,
    }));

    if (isChecked) {
      setData((prevData) => ({
        ...prevData,
        root_cause_analysis: {
          ...prevData.root_cause_analysis,
          [name]: [{ value: "" }],
        },
      }));
    }
  };

  return { checked, setChecked, handleCheckboxChange };
}
