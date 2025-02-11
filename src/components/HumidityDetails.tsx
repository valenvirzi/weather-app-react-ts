import { ForecastItem } from "../types/types";
import DayHourItem from "./DayHourItem";

interface HumidityDetailsProps {
  forecastData: ForecastItem[];
  children: React.ReactNode;
  chartWidth: number;
}

const HumidityDetails: React.FC<HumidityDetailsProps> = ({
  forecastData,
  children,
  chartWidth,
}) => {
  return (
    <div className="mb-2">
      <ul
        className="flex justify-between px-[3.75rem]"
        style={{ width: `${chartWidth}px` }}
      >
        {forecastData.map((item) => {
          return (
            <li
              key={item.dt}
              className="relative flex max-w-7 flex-col items-center text-center"
              style={{
                top: `${item.main.humidity >= 90 ? -(item.main.humidity - 90) : Math.max(0, Math.min(110, 1400 / item.main.humidity))}px`,
              }}
            >
              <span className="text-sm lg:text-base">
                {item.main.humidity}%
              </span>
            </li>
          );
        })}
      </ul>
      {children}
      <ul
        className="flex justify-between px-14"
        style={{ width: `${chartWidth}px` }}
      >
        {forecastData.map((item) => {
          return <DayHourItem key={item.dt} dateText={item.dt_txt} />;
        })}
      </ul>
    </div>
  );
};

export default HumidityDetails;
