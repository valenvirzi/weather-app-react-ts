import { useSettings } from "../context/SettingsContext";
import useSpeedConversion from "../hooks/useSpeedConversion";
import { ForecastItem } from "../types/types";
import DayHourItem from "./DayHourItem";

interface WindItemProps {
  item: ForecastItem;
  theme: {
    color: string;
    backgroundImage: string;
  };
}

const WindItem: React.FC<WindItemProps> = ({ item, theme }) => {
  const { currentSettings } = useSettings();

  const getColor = (value: number): string => {
    const intensity = Math.min(
      255,
      Math.max(0, Math.round((1 - (value * 0.9) / 14) * 255)),
    ); // Map 0-100 to 0-255
    return `rgba(255, ${intensity}, 0, 1)`; // Blue-green with variable intensity
  };

  const windDirection = item.wind.deg.toString();
  const windSpeedValue = item.wind.speed;

  const convertedWindSpeed = useSpeedConversion(
    windSpeedValue,
    currentSettings.speedUnit,
  );

  return (
    <div className="relative flex flex-col items-center gap-7">
      <div className="flex flex-col items-center text-sm lg:text-base">
        <span>{convertedWindSpeed}</span>
        <span className="text-xs xl:text-sm">{currentSettings.speedUnit}</span>
      </div>

      <div
        className="relative flex h-10 w-10 select-none items-center justify-center rounded-full border-2 border-white"
        style={{ borderColor: `${getColor(item.wind.speed)}` }}
        // style={{ border: `${getColor(item.wind.speed)}` }}
      >
        <span
          className="relative -top-[60%] p-0.5 text-center text-sm"
          style={{ backgroundColor: `${theme.color}` }}
        >
          N
        </span>
        <img
          src="./img/directionArrow.svg"
          alt="direction"
          className="absolute max-w-6"
          style={{
            transform: `rotate(${windDirection}deg)`,
          }}
        />
      </div>
      <DayHourItem dateText={item.dt_txt} />
    </div>
  );
};

export default WindItem;
