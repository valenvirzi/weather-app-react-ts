import { ForecastItem } from "../types/types";
import useTemperatureConversion from "../hooks/useTemperatureConversion";

interface ItemDetailsProps {
  item: ForecastItem;
  unit: "K" | "C" | "F";
}

const ItemDetails: React.FC<ItemDetailsProps> = ({ item, unit }) => {
  const convetedTemp = useTemperatureConversion(item.main.temp, unit);
  const formatDateToDayMonth = (dateString: string): string => {
    const [datePart] = dateString.split(" "); // Extract the date part (YYYY-MM-DD)
    const [year, month, day] = datePart.split("-"); // Split into year, month, and day
    return `${day}/${month}`; // Format as "DD/MM"
  };
  const formattedDate = formatDateToDayMonth(item.dt_txt);
  return (
    <li key={item.dt} className="group flex max-w-14 flex-col items-center">
      <span className="text-xs">{formattedDate}</span>
      <span>{item.dt_txt.slice(11, 16)}</span>
      <img
        className="w-10"
        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
        alt="rain"
      />
      <span className="rounded p-1 px-2 font-semibold group-first:bg-[#36abf8]">
        {convetedTemp}°{unit}
        {/* TODO: Make the conversion to diferent units of measure and be able to change it from the settings */}
      </span>
    </li>
  );
};

export default ItemDetails;
