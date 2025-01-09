import useTemperatureConversion from "../hooks/useTemperatureConversion";
import useCapitalizeWords from "../hooks/useCapitalizeWords";
import useFormatDate from "../hooks/useFormatDate";
import { useSettings } from "../context/SettingsContext";
import { useWeatherData } from "../context/WeatherDataContext";
import useSpeedConversion from "../hooks/useSpeedConversion";

// TODO: Export type to types.ts file
interface CurrentWeatherDisplayProps {
  currentWeatherLoading: boolean;
  currentWeatherError: string | null;
  theme: { color: string; backgroundImage: string };
}

const CurrentWeatherDisplay: React.FC<CurrentWeatherDisplayProps> = ({
  currentWeatherLoading,
  currentWeatherError,
  theme,
}) => {
  const { weatherData } = useWeatherData();
  const { currentSettings } = useSettings();
  const tempValue = weatherData.currentWeather?.main.temp ?? 0;
  const convertedTemp = useTemperatureConversion(
    tempValue,
    currentSettings.tempUnit,
  );
  const tempDisplay = currentWeatherError
    ? currentWeatherError
    : currentWeatherLoading
      ? "Loading..."
      : isNaN(Number(tempValue)) || tempValue === 0
        ? "No Data"
        : convertedTemp;
  const feelsLikeValue = weatherData.currentWeather?.main.feels_like ?? 0;
  const convertedFeelsLike = useTemperatureConversion(
    feelsLikeValue,
    currentSettings.tempUnit,
  );

  const dateValue = weatherData.currentWeather?.dt ?? Date.now();
  const formattedDate = useFormatDate(dateValue);
  const formattedDescription = useCapitalizeWords(
    weatherData.currentWeather?.weather[0].description ?? "",
  );
  const windSpeedValue = weatherData.currentWeather?.wind.speed ?? 0;
  const convertedWindSpeed = useSpeedConversion(
    windSpeedValue,
    currentSettings.speedUnit,
  );
  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col items-center gap-4">
        <div className="flex">
          <h2 className="text-6xl">{tempDisplay}</h2>
          <span className="">
            {tempValue ? `°${currentSettings.tempUnit}` : ""}
          </span>
        </div>
        <h2 className="text-xl">{formattedDescription}</h2>
        <div className="flex flex-col items-center gap-1 text-sm">
          <span>{formattedDate.split(" ").slice(-2).join(" ")}</span>
          <span>{formattedDate.slice(0, -12)}</span>
        </div>
      </section>
      <section className="flex items-center justify-between gap-4">
        {/* TODO: Make a card component for every type of info shown to not need to hardcode every single one if more were to be added. */}
        <article
          className={`flex w-full flex-col gap-2 rounded-lg px-4 py-2`}
          style={{ backgroundColor: `${theme.color}` }}
        >
          <span className="text-sm">Wind Speed</span>
          <div className="flex items-center gap-2">
            <img className="w-6" src="./img/wind.svg" alt="wind" />
            <div className="flex items-center gap-1">
              <span>{convertedWindSpeed}</span>
              <span>{currentSettings.speedUnit}</span>
            </div>
          </div>
        </article>
        <article
          className={`flex w-full flex-col gap-2 rounded-lg px-4 py-2`}
          style={{ backgroundColor: `${theme.color}` }}
        >
          <span className="text-sm">Feels Like</span>
          <div className="flex items-center gap-2">
            <img className="w-6" src="./img/feelsLike.svg" alt="feelsLike" />
            <div className="flex items-center">
              <span>{convertedFeelsLike}</span>
              <span>
                {feelsLikeValue ? `°${currentSettings.tempUnit}` : ""}
              </span>
            </div>
          </div>
        </article>
      </section>
      <section className="flex items-center justify-between gap-4">
        <article
          className={`flex w-full flex-col gap-2 rounded-lg px-4 py-2`}
          style={{ backgroundColor: `${theme.color}` }}
        >
          <span className="text-sm">Pressure</span>
          <div className="flex items-center gap-2">
            <img className="w-6" src="./img/pressure.svg" alt="pressure" />
            <div className="flex items-center gap-1">
              <span>{weatherData.currentWeather?.main.pressure}</span>
              <span>hPa</span>
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
              <span>{weatherData.currentWeather?.main.humidity ?? 0}</span>
              <span>%</span>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default CurrentWeatherDisplay;
