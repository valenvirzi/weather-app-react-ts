import { useWeatherData } from "../context/WeatherDataContext";
import WindItem from "./WindItem";

interface WindChartProps {
  forecastLoading: boolean;
  forecastError: string | null;
  theme: {
    color: string;
    backgroundImage: string;
  };
}

const WindChart: React.FC<WindChartProps> = ({
  forecastLoading,
  forecastError,
  theme,
}) => {
  const { weatherData } = useWeatherData();

  const windDisplay = forecastError ? (
    <p className="text-red-800">{forecastError}</p>
  ) : forecastLoading ? (
    <img className="mx-auto w-10 animate-spin" src="./img/loading.svg" />
  ) : weatherData.forecast?.list?.length ? (
    <ul className="flex h-60 w-full items-center gap-10 overflow-x-auto px-10">
      {weatherData.forecast.list.map((item) => {
        return <WindItem key={item.dt} item={item} theme={theme} />;
      })}
    </ul>
  ) : (
    <h3 className="mx-auto inline-block text-2xl text-white">No Data</h3>
  );
  return (
    <div>
      <div>{windDisplay}</div>
    </div>
  );
};

export default WindChart;
