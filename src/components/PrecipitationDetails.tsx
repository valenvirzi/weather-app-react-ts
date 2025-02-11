import { ForecastItem } from "../types/types";
import DayHourItem from "./DayHourItem";

interface PrecipitationDetailsProps {
  precipitationList: number[] | undefined;
  forecastData: ForecastItem[];
  children: React.ReactNode;
  chartWidth: number;
}

const PrecipitationDetails: React.FC<PrecipitationDetailsProps> = ({
  precipitationList,
  forecastData,
  children,
  chartWidth,
}) => {
  if (!precipitationList) return null;

  return (
    <div className="mb-2">
      <ul
        className="flex justify-between px-[3.75rem] py-2"
        style={{ width: `${chartWidth}px` }}
      >
        {forecastData.map((item, index) => {
          return (
            <li
              key={item.dt}
              className="relative flex max-w-7 flex-col items-center text-center lg:max-w-5"
            >
              <span className="text-sm lg:text-base">
                {precipitationList[index] === 0
                  ? "0.0"
                  : precipitationList[index]}{" "}
              </span>
              <span className="relative -top-1.5 text-sm">mm</span>
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

export default PrecipitationDetails;
