import { useEffect, useState } from "react";
import CurrentWeatherDisplay from "./components/CurrentWeatherDisplay";
import ForecastChart from "./components/ForecastChart";
import useCurrentWeather from "./hooks/useCurrentWeather";
import useForecast from "./hooks/useForecast";

function App() {
  const [unitSystem, setUnitSystem] = useState<"K" | "C" | "F">("K");
  const threeHoursForecastData = useForecast();
  const currentWeatherData = useCurrentWeather();
  const bgImage =
    "https://images.unsplash.com/photo-1501691223387-dd0500403074?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFpbnxlbnwwfHwwfHx8MA%3D%3D";
  // TODO: Make the BackgroundImage change depending on the current weather, by setting the URL on the tailwind.config file and changing the className dynamically according to the weather. https://openweathermap.org/weather-conditions
  // TODO: Make the user be able to select the location where the forecast will get the data from. https://www.api-ninjas.com/api/geocoding
  {
    /* TODO: Set a proper "Options/Settings" menu for changing: 
    - Temperature measure unit (K, C, F).
    - Speed measure unit (Km/h, M/h, etc.).
    - Dark/Light Mode.
    - Language.
    */
  }
  // TODO: Remove/Find a better use for the selection of the timespan of the forecast, because it makes no sense for it to be shorter, nobody would choose to have less info than the available, in any case they will just choose not to watch it, but still have it displayed anyways.
  // TODO: Make the Desktop design on the app.
  const [theme, setTheme] = useState<{
    color: string;
    backgroundImage: string;
  }>({
    color: "#000000",
    backgroundImage: "/images/default.jpg",
  });

  useEffect(() => {
    if (currentWeatherData?.weather?.[0]?.main) {
      const weatherThemes: Record<
        string,
        { color: string; backgroundImage: string }
      > = {
        Rain: {
          color: "#56668e",
          backgroundImage: bgImage,
        },
        Thunderstorm: {
          color: "#384770",
          backgroundImage: bgImage,
        },
        Drizzle: { color: "#517193", backgroundImage: bgImage },
        Clear: { color: "#4286b0", backgroundImage: bgImage },
        Clouds: { color: "#6f91ae", backgroundImage: bgImage },
        Snow: { color: "#70aacc", backgroundImage: bgImage },
      };
      const weatherMain = currentWeatherData.weather[0].main;
      const newTheme = weatherThemes[weatherMain] || {
        color: "#000000",
        backgroundImage: "/images/default.jpg",
      };

      setTheme((prevTheme) =>
        prevTheme.color !== newTheme.color ||
        prevTheme.backgroundImage !== newTheme.backgroundImage
          ? newTheme
          : prevTheme,
      );
    }
  }, [currentWeatherData]);

  const handleSwitchUnit = () => {
    if (unitSystem === "K") {
      setUnitSystem("C");
    } else if (unitSystem === "C") {
      setUnitSystem("F");
    } else {
      setUnitSystem("K");
    }
  };
  return (
    <div
      className={`app relative min-h-screen bg-cover`}
      style={{ backgroundImage: `url(${theme.backgroundImage})` }}
    >
      <div
        className={`absolute inset-0 z-10 opacity-50`}
        style={{ backgroundColor: `${theme.color}` }}
      ></div>
      <div className="relative z-20 flex flex-col gap-4 text-white">
        <header className="flex items-center justify-between p-2">
          <button className="flex items-center gap-2" type="button">
            <img className="w-6" src="./img/location.svg" alt="location icon" />
            <span>Ituzaingó</span>
          </button>
          <div className="flex items-center gap-4">
            <button type="button">
              <img className="w-6" src="./img/search.svg" alt="search icon" />
            </button>
            <button type="button" onPointerDown={handleSwitchUnit}>
              <img className="w-6" src="./img/options.svg" alt="options icon" />
            </button>
          </div>
        </header>
        <main className="flex flex-col gap-8 px-3">
          <CurrentWeatherDisplay
            currentWeatherData={currentWeatherData}
            theme={theme}
            unit={unitSystem}
          />
          <section
            className={`flex flex-col gap-2 rounded-2xl p-2`}
            style={{ backgroundColor: `${theme.color}` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img className="w-6" src="./img/clock.svg" alt="clock" />
                <h3 className="">Pronóstico Horario</h3>
              </div>
              <div className="flex items-center gap-1">
                <span>48</span>
                <span>hours {">"}</span>
              </div>
            </div>
            <div>
              <ForecastChart
                gapSize={100}
                apiResponse={threeHoursForecastData}
                unit={unitSystem}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
