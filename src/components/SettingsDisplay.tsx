import { useSwitchTempUnit } from "../hooks/useSwitchTempUnit";

interface SettingsDisplayProps {
  tempUnit: "K" | "C" | "F";
  speedUnit: "m/s" | "Km/h" | "M/h";
  language: "en" | "es";
}

const SettingsDisplay: React.FC<SettingsDisplayProps> = () => {
  const { tempUnit, handleSelectChange: handleTempUnitChange } =
    useSwitchTempUnit();
  return (
    <div className="flex flex-col">
      <h2 className="self-center text-2xl">Settings</h2>
      <ul className="flex flex-col">
        <li className="flex justify-between p-2">
          <label htmlFor="tempUnit">Temperature unit:</label>
          <select
            name="tempUnit"
            id="tempUnit"
            value={tempUnit}
            onChange={handleTempUnitChange}
          >
            <option selected value="K">
              Kelvin (K)
            </option>
            <option value="C">Celsius (°C)</option>
            <option value="F">Fahrenheit (°F)</option>
          </select>
        </li>
        <li className="flex justify-between p-2">
          <label htmlFor="speedUnit">Speed unit:</label>
          <select name="speedUnit" id="speedUnit">
            <option selected value="m/s">
              Meters per second (m/s)
            </option>
            <option value="Km/h">Kilometers per hour (Km/h)</option>
            <option value="M/h">Miles per hour (M/h)</option>
          </select>
        </li>
        <li className="flex justify-between p-2">
          <label htmlFor="language">Language:</label>
          <select name="language" id="language">
            <option selected value="en">
              English
            </option>
            <option value="es">Spanish</option>
          </select>
        </li>
      </ul>
    </div>
  );
};

export default SettingsDisplay;
