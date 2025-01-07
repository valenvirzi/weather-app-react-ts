import React from "react";
import { CurrentSettings, useSettings } from "../context/SettingsContext";

type Option = { value: string; label: string };

//TODO: Add Dark and Light Themes ¿maybe?

const Settings: React.FC = () => {
  const { currentSettings, setCurrentSettings } = useSettings();

  // Options for each select element
  const options: { [key: string]: Option[] } = {
    tempUnit: [
      { value: "K", label: "Kelvin (°K)" },
      { value: "C", label: "Celsius (°C)" },
      { value: "F", label: "Fahrenheit (°F)" },
    ],
    speedUnit: [
      { value: "m/s", label: "m/s" },
      { value: "Km/h", label: "Km/h" },
      { value: "M/h", label: "M/h" },
    ],
    language: [
      { value: "en", label: "English" },
      { value: "es", label: "Spanish" },
      { value: "pr", label: "Portuguese" },
    ],
  };

  // Labels for each select element
  const labels: { [key: string]: string } = {
    tempUnit: "Temperature unit:",
    speedUnit: "Speed unit:",
    language: "Language:",
  };

  // Handler for select changes
  const handleSelectChange =
    (key: string) => (event: React.ChangeEvent<HTMLSelectElement>) => {
      setCurrentSettings((prev: CurrentSettings) => ({
        ...prev,
        [key]: event.target.value,
      }));
    };

  return (
    <ul className="flex flex-col gap-px">
      {Object.entries(options).map(([key, values]) => (
        <li
          key={key}
          className="flex items-center justify-between gap-2 bg-black bg-opacity-75 px-3 py-4"
        >
          <label htmlFor={key} className="text-sm">
            {labels[key]}
          </label>
          <select
            name={key}
            id={key}
            value={currentSettings[key as keyof CurrentSettings]}
            onChange={handleSelectChange(key)}
            className="rounded border p-2 text-sm text-black"
          >
            {values.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </li>
      ))}
    </ul>
  );
};

export default Settings;
