import { useEffect, useState } from "react";

export function SameAsCorrection({setData, data}){
  const [sameCorrection, setSameCorrection] = useState(false);

  useEffect(() => {
    if (sameCorrection) {
      setData({
        ...data, 
        deal_consequence: data.correction, 
        date_deal_consequence: data.date_correction,
      });
    }
  }, [sameCorrection, data.correction, data.date_correction, setData]);

  return { sameCorrection, setSameCorrection}
}