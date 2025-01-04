import useTemperatureConversion from "../hooks/useTemperatureConversion";
import useCapitalizeWords from "../hooks/useCapitalizeWords";
import useFormatDate from "../hooks/useFormatDate";
import { CurrentWeatherResponse } from "../types/types";

interface CurrentWeatherDisplayProps {
  currentWeatherData: CurrentWeatherResponse | null;
  currentWeatherLoading: boolean;
  currentWeatherError: string | null;
  unit: "K" | "C" | "F";
  theme: { color: string; backgroundImage: string };
}

const CurrentWeatherDisplay: React.FC<CurrentWeatherDisplayProps> = ({
  currentWeatherData,
  currentWeatherLoading,
  currentWeatherError,
  unit,
  theme,
}) => {
  const tempValue = currentWeatherData?.main.temp ?? 0;
  const convertedTemp = useTemperatureConversion(tempValue, unit);
  const tempDisplay = currentWeatherError
    ? currentWeatherError
    : currentWeatherLoading
      ? "Loading..."
      : isNaN(Number(tempValue)) || tempValue === 0
        ? "No Data"
        : convertedTemp;

  const dateValue = currentWeatherData?.dt ?? Date.now();
  const formattedDate = useFormatDate(dateValue);
  const formattedDescription = useCapitalizeWords(
    currentWeatherData?.weather[0].description ?? "",
  );
  return (
    <>
      <section className="flex flex-col items-center gap-4">
        <div className="flex">
          <h2 className="text-6xl">
            {/* TODO: Fix this so it first checks if there is current data available, and show "NO DATA" if that was the case, and then check if it's loading the data to show "Loading..." in that other case, otherwise (aka if the data is available and the data is not loading), show the data. */}
            {tempDisplay}
          </h2>
          <span className="">{tempValue ? `°${unit}` : ""}</span>
        </div>
        <h2 className="text-xl">{formattedDescription}</h2>
        <div className="flex flex-col items-center gap-1 text-sm">
          <span>{formattedDate.split(" ").slice(-2).join(" ")}</span>
          <span>{formattedDate.slice(0, -12)}</span>
        </div>
      </section>
      <section className="flex items-center justify-between gap-4">
        <article
          className={`flex w-full flex-col gap-2 rounded-lg px-4 py-2`}
          style={{ backgroundColor: `${theme.color}` }}
        >
          <span className="text-sm">Wind Speed</span>
          <div className="flex items-center gap-2">
            <img className="w-6" src="./img/wind.svg" alt="wind" />
            <div className="flex items-center gap-1">
              <span>
                {(currentWeatherData?.wind.speed ?? 0 * 3.6).toFixed(1)}
              </span>
              <span>Km/h</span>
            </div>
          </div>
        </article>
        <article
          className={`flex w-full flex-col gap-2 rounded-lg px-4 py-2`}
          style={{ backgroundColor: `${theme.color}` }}
        >
          <span className="text-sm">Humidity</span>
          <div className="flex items-center gap-2">
            <img className="w-6" src="./img/humidity.svg" alt="humidity" />
            <div className="flex items-center">
              <span>{currentWeatherData?.main.humidity ?? 0}</span>
              <span>%</span>
            </div>
          </div>
        </article>
      </section>
    </>
  );
};

export default CurrentWeatherDisplay;
