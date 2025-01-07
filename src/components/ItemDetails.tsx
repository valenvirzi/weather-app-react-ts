import { ForecastItem } from "../types/types";
import useTemperatureConversion from "../hooks/useTemperatureConversion";
import { useSettings } from "../context/SettingsContext";

// TODO: Export type to types.ts file
interface ItemDetailsProps {
  item: ForecastItem;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({ item }) => {
  const { currentSettings } = useSettings();
  const convetedTemp = useTemperatureConversion(
    item.main.temp,
    currentSettings.tempUnit,
  );
  const formatDateToDayMonth = (dateString: string): string => {
    const [datePart] = dateString.split(" "); // Extract the date part (YYYY-MM-DD)
    const [year, month, day] = datePart.split("-"); // Split into year, month, and day
    return `${day}/${month}`; // Format as "DD/MM"
  };
  const formattedDate = formatDateToDayMonth(item.dt_txt);
  return (
    <li key={item.dt} className="group flex max-w-10 flex-col items-center">
      <span className="text-xs">{formattedDate}</span>
      <span>{item.dt_txt.slice(11, 16)}</span>
      <img
        className="w-10"
        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
        alt="rain"
      />
      <span className="rounded p-1 px-2 group-first:bg-[#36abf8]">
        {convetedTemp}°{currentSettings.tempUnit}
      </span>
    </li>
  );
};

export default ItemDetails;
