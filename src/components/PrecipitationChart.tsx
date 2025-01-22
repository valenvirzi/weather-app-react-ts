import { useWeatherData } from "../context/WeatherDataContext";

interface PrecipitationChartProps {
  forecastLoading: boolean;
  forecastError: string | null;
}

const PrecipitationChart: React.FC<PrecipitationChartProps> = ({
  forecastLoading,
  forecastError,
}) => {
  const { weatherData } = useWeatherData();

  const precipitationDisplay = forecastError ? (
    <p className="text-red-800">{forecastError}</p>
  ) : forecastLoading ? (
    <img className="mx-auto w-10 animate-spin" src="./img/loading.svg" />
  ) : weatherData.forecast?.list?.length ? (
    <div></div>
  ) : (
    <h3 className="mx-auto inline-block text-2xl text-white">No Data</h3>
  );
  return (
    <div>
      <div>{precipitationDisplay}</div>
    </div>
  );
};

export default PrecipitationChart;
