import { useState } from "react";
import CurrentWeatherDisplay from "./components/CurrentWeatherDisplay";
import ForecastChart from "./components/ForecastChart";
import useCurrentWeather from "./hooks/useCurrentWeather";
import useForecast from "./hooks/useForecast";

function App() {
  const [unitSystem, setUnitSystem] = useState<"K" | "C" | "F">("K");
  const threeHoursForecastData = useForecast();
  const currentWeatherData = useCurrentWeather();
  // TODO: Make the ColorTheme depending on the current weather. https://openweathermap.org/weather-conditions
  const [colorTheme, setColorTheme] = useState<string>(
    currentWeatherData.weather[0].main,
  );
  const weather = [
    "Rain",
    "Thenderstorm",
    "Drizzle",
    "Clear",
    "Clouds",
    "Snow",
  ];

  switch (colorTheme) {
    case "Rain":
      break;
    case "Thunderstorm":
      break;
    case "Drizzle":
      break;
    case "Snow":
      break;
    case "Clear":
      break;
    case "Clouds":
      break;

    default:
  }

  const handleSwitchUnit = () => {
    if (unitSystem === "K") {
      setUnitSystem("C");
    } else if (unitSystem === "C") {
      setUnitSystem("F");
    } else {
      setUnitSystem("K");
    }
  };
  {
    /* TODO: Make the BackgroundImage and ColorTheme change depending on the current weather forecast */
  }
  return (
    <div
      className={`flex min-h-screen flex-col gap-4 bg-cover ${currentWeatherData.weather[0].main === "Rain" ? "bg-[url('https://images.unsplash.com/photo-1501691223387-dd0500403074?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFpbnxlbnwwfHwwfHx8MA%3D%3D')]" : ""}`}
    >
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
          unit={unitSystem}
        />
        <section className="flex flex-col gap-2 rounded-2xl bg-[#3b4770] p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img className="w-6" src="./img/clock.svg" alt="clock" />
              <h3 className="font-semibold">Pronóstico Horario</h3>
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
  );
}

export default App;
