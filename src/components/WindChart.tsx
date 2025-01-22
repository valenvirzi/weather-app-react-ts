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
    <ul className="mb-2 flex w-full gap-10 overflow-x-auto p-4 px-8 pt-2">
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
