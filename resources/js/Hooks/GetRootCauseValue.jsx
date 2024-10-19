import { rootCauseAnalysisDefaultChecked } from "@/constant";
import { useEffect } from "react";

export function GetRootCauseValue(){
  const [checked, setChecked] = useState(rootCauseAnalysisDefaultChecked);
  const rootCauseAnalysisFormat = () => {
    const items = form.rootCauseAnalysis;
    const transformed = { ...rootCauseAnalysisDefaultFormat };
    const checkedData = { ...rootCauseAnalysisDefaultChecked };
  
    items.forEach(item => {
      if (item.type in transformed) {
        transformed[item.type].push({ value: item.value });
        checkedData[item.type] = true;
      }
    });

    Object.keys(transformed).forEach(type => {
      if (transformed[type].length === 0) {
        transformed[type].push({ value: "" });
      }
    });
  
    return { transformed, checkedData };
  };

  useEffect(() => {
    const rootCauseData = rootCauseAnalysisFormat(form.rootCauseAnalysis);
    setChecked(rootCauseData.checkedData);
  
    if (JSON.stringify(data.root_cause_analysis) !== JSON.stringify(rootCauseData.transformed)) {
      setData((prevData) => ({
        ...prevData,
        root_cause_analysis: rootCauseData.transformed,
      }));
    }
  }, [form.rootCauseAnalysis]);
  
}