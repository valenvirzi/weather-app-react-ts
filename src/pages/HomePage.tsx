import CurrentWeatherDisplay from "../components/CurrentWeatherDisplay";
import ExtraForecastDisplay from "../components/ExtraForecastDisplay";
import ForecastChart from "../components/ForecastChart";

const HomePage: React.FC = () => {
  return (
    <main className="flex flex-col gap-6 px-3 xl:px-5 2xl:px-7">
      <CurrentWeatherDisplay
        currentWeatherLoading={currentWeatherLoading}
        currentWeatherError={currentWeatherError}
        theme={theme}
      />
      <section
        className={`card flex flex-col gap-4 rounded-lg p-2 md:px-3`}
        style={{ backgroundColor: `${theme.color}` }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              className="w-6 md:w-7"
              src="./img/calendar.svg"
              alt="calendar"
            />
            <h3 className="md:text-lg">5 Day Forecast</h3>
          </div>
          <div className="flex items-center gap-1 px-1 text-xs opacity-70 md:text-sm">
            <span>3</span>
            <span>hours</span>
          </div>
        </div>
        <div>
          <ForecastChart
            gapSize={100}
            forecastError={forecastError}
            forecastLoading={forecastLoading}
          />
        </div>
      </section>
      <section
        className={`card flex flex-col gap-4 rounded-lg p-2 md:px-3`}
        style={{ backgroundColor: `${theme.color}` }}
      >
        <div>
          {/* TODO: New component to show Humidity levels, Wind info, and Rain chances every 3hs */}
          <ExtraForecastDisplay
            forecastLoading={forecastLoading}
            forecastError={forecastError}
            theme={theme}
          />
        </div>
      </section>
    </main>
  );
};

export default HomePage;
