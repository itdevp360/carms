import { useState } from "react";

export function useSelectedTabIndex(){
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  return {selectedTabIndex, setSelectedTabIndex}
}