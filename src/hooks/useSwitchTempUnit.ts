import { useState } from "react";

function initializeTempUnit() {
  const savedUnit = localStorage.getItem("tempUnit");
  return savedUnit ? savedUnit : "K";
}

export function useSwitchTempUnit() {
  const [tempUnit, setTempUnit] = useState<string>(initializeTempUnit);

  //TODO: Put this function on a separate file and export it to be able to use it on every Select element (Temperature, Speed, and Language).
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setTempUnit(newValue);
  };

  return { tempUnit, handleSelectChange };
}
