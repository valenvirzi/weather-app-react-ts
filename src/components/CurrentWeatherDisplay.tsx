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
  const windDirection = weatherData.currentWeather?.wind.deg.toString();
  const windSpeedValue = weatherData.currentWeather?.wind.speed ?? 0;
  const convertedWindSpeed = useSpeedConversion(
    windSpeedValue,
    currentSettings.speedUnit,
  );
  return (
    <div className="flex flex-col gap-5 xl:flex-row">
      <section className="flex flex-col items-center gap-4 xl:w-1/2 xl:p-2 2xl:gap-6">
        <div className="flex">
          <h2 className="text-6xl xl:text-7xl">{tempDisplay}</h2>
          <span className="xl:text-lg">
            {tempValue ? `°${currentSettings.tempUnit}` : ""}
          </span>
        </div>
        <h2 className="text-xl xl:text-2xl">{formattedDescription}</h2>
        <div className="flex flex-col items-center gap-1 text-sm md:text-base xl:text-lg">
          <span>{formattedDate.split(" ").slice(-2).join(" ")}</span>
          <span>{formattedDate.slice(0, -12)}</span>
        </div>
      </section>
      <section className="flex flex-col gap-4 xl:w-4/5 xl:justify-evenly">
        <section className="flex items-center justify-between gap-4 xl:h-full xl:items-stretch">
          {/* TODO: Make a card component for every type of info shown to not need to hardcode every single one if more were to be added. */}
          <article
            className={`card flex w-full flex-col gap-2 rounded-lg px-4 py-2 xl:justify-between xl:py-3`}
            style={{ backgroundColor: `${theme.color} ` }}
          >
            <span className="text-sm md:text-base xl:text-xl">Wind</span>

            <div className="relative flex gap-2 xl:gap-4">
              <div className="relative flex h-6 w-6 select-none items-center justify-center rounded-full border-2 border-white md:h-7 md:w-7 2xl:h-9 2xl:w-9">
                <span
                  className="relative -top-[60%] p-px text-center text-xs lg:p-[2px] lg:text-sm"
                  style={{ backgroundColor: `${theme.color}` }}
                >
                  N
                </span>
                <img
                  src="./img/directionArrow.svg"
                  alt="direction"
                  className="absolute max-w-4 md:max-w-5 2xl:max-w-6"
                  style={{
                    transform: `rotate(${windDirection}deg)`,
                  }}
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="md:text-lg xl:text-xl">
                  {convertedWindSpeed}
                </span>
                <span className="text-sm md:text-base xl:text-xl">
                  {currentSettings.speedUnit}
                </span>
              </div>
            </div>
          </article>
          <article
            className={`card flex w-full flex-col gap-2 rounded-lg px-4 py-2 xl:justify-between xl:py-3`}
            style={{ backgroundColor: `${theme.color}` }}
          >
            <span className="text-sm md:text-base xl:text-xl">Feels Like</span>
            <div className="flex items-center gap-2 xl:gap-4">
              <img
                className="w-6 md:w-7 xl:w-8"
                src="./img/feelsLike.svg"
                alt="feelsLike"
              />
              <div className="flex items-center md:text-lg xl:text-xl">
                <span>{convertedFeelsLike}</span>
                <span>
                  {feelsLikeValue ? `°${currentSettings.tempUnit}` : ""}
                </span>
              </div>
            </div>
          </article>
        </section>
        <section className="flex items-center justify-between gap-4 xl:h-full xl:items-stretch">
          <article
            className={`card flex w-full flex-col gap-2 rounded-lg px-4 py-2 xl:justify-between xl:py-3`}
            style={{ backgroundColor: `${theme.color}` }}
          >
            <span className="text-sm md:text-base xl:text-xl">Pressure</span>
            <div className="flex items-center gap-2 xl:gap-4">
              <img
                className="w-6 md:w-7 xl:w-8"
                src="./img/pressure.svg"
                alt="pressure"
              />
              <div className="flex items-center gap-1 md:text-lg xl:text-xl">
                <span>{weatherData.currentWeather?.main.pressure}</span>
                <span>hPa</span>
              </div>
            </div>
          </article>
          <article
            className={`card flex w-full flex-col gap-2 rounded-lg px-4 py-2 xl:justify-between xl:py-3`}
            style={{ backgroundColor: `${theme.color}` }}
          >
            <span className="text-sm md:text-base xl:text-xl">Humidity</span>
            <div className="flex items-center gap-2 xl:gap-4">
              <img
                className="w-6 md:w-7 xl:w-8"
                src="./img/humidity.svg"
                alt="humidity"
              />
              <div className="flex items-center md:text-lg xl:text-xl">
                <span>{weatherData.currentWeather?.main.humidity ?? 0}</span>
                <span>%</span>
              </div>
            </div>
          </article>
        </section>
      </section>
    </div>
  );
};

export default CurrentWeatherDisplay;
