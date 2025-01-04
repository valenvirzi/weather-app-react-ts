import { useEffect, useState } from "react";
import CurrentWeatherDisplay from "./components/CurrentWeatherDisplay";
import ForecastChart from "./components/ForecastChart";
import useCurrentWeather from "./hooks/useCurrentWeather";
import useForecast from "./hooks/useForecast";
import LocationSearchDisplay from "./components/LocationSearchDisplay";
import useGeocoding from "./hooks/useGeocoding";

function App() {
  const geocodingApiKey = "heRF6kJUGfGXsgT7lpj2sA==DAabcgoiFqoC7lK5";
  const weatherApiKey = "19460d6e8004c61debf07d5ca332ee8d";
  const [currentCityName, setCurrentCityName] = useState<string>("");
  const [unitSystem, setUnitSystem] = useState<"K" | "C" | "F">("K");
  // TODO: Make the unitSystem come from the LocalStorage if the user already chose one and make it be Kelvin otherwise.
  const [displaySearch, setDisplaySearch] = useState<boolean>(false);
  const threeHoursForecastData = useForecast();
  const {
    currentWeather: currentWeatherData,
    loading: currentWeatherLoading,
    error: currentWeatherError,
    fetchCurrentWeather,
  } = useCurrentWeather(weatherApiKey);
  const {
    cityList,
    loading: citiesLoading,
    error: citiesError,
    fetchCityList,
  } = useGeocoding(geocodingApiKey);

  // TODO: Make the user be able to select the location where the forecast will get the data from. https://www.api-ninjas.com/api/geocoding
  // TODO: Use the Geocoding API to get the Latitude and Longitude of the city that the user wants to get the forecast of. That will requiere
  {
    /* TODO: Set a proper "Options/Settings" menu for changing: 
    - Temperature measure unit (K, C, F).
    - Speed measure unit (Km/h, M/h, etc.).
    - Dark/Light Mode.
    - Language.
    */
  }
  // TODO: Export everything that can be exported to clean the code and separate it depending on its functionality.
  // TODO: Remove/Find a better use for the selection of the timespan of the forecast, because it makes no sense for it to be shorter, nobody would choose to have less info than the available, in any case they will just choose not to watch it, but still have it displayed anyways.
  // TODO: Make the Desktop design on the app.
  const [theme, setTheme] = useState<{
    color: string;
    backgroundImage: string;
  }>({
    color: "#000000",
    backgroundImage:
      "https://images.foxtv.com/static.q13fox.com/www.q13fox.com/content/uploads/2020/06/764/432/clouds-mostly-sunny.jpg?ve=1&tl=1",
  });

  useEffect(() => {
    if (currentWeatherData?.weather?.[0]?.main) {
      const weatherThemes: Record<
        string,
        { color: string; backgroundImage: string }
      > = {
        Rain: {
          color: "#56668e",
          backgroundImage:
            "https://www.wkbn.com/wp-content/uploads/sites/48/2021/02/rain-raining-raindrops-wet-spring-summer-fall-weather-generic.jpg?w=1280",
        },
        Thunderstorm: {
          color: "#384770",
          backgroundImage:
            "https://images.unsplash.com/photo-1630961769307-4b0463f51c26?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        Drizzle: {
          color: "#517193",
          backgroundImage:
            "https://plus.unsplash.com/premium_photo-1666726664307-707a74015ca4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        Clear: {
          color: "#4286b0",
          backgroundImage:
            "https://images.unsplash.com/photo-1717446586299-41283dbe7e87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        Clouds: {
          color: "#6f91ae",
          backgroundImage:
            "https://images.unsplash.com/photo-1566010503302-2564ae0d47b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        Snow: {
          color: "#70aacc",
          backgroundImage:
            "https://images.unsplash.com/photo-1478265409131-1f65c88f965c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      };
      const weatherMain = currentWeatherData.weather[0].main;
      const newTheme = weatherThemes[weatherMain] || {
        color: "#000000",
        backgroundImage:
          "https://images.foxtv.com/static.q13fox.com/www.q13fox.com/content/uploads/2020/06/764/432/clouds-mostly-sunny.jpg?ve=1&tl=1",
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
      className={`app relative min-h-screen bg-cover bg-fixed bg-center bg-no-repeat`}
      style={{ backgroundImage: `url(${theme.backgroundImage})` }}
    >
      <div
        className={`absolute inset-0 z-10 opacity-55`}
        style={{ backgroundColor: `${theme.color}` }}
      ></div>
      <div className="relative z-20 flex flex-col gap-4 text-white">
        <header className="sticky top-0 flex items-center justify-between bg-opacity-55 bg-gradient-to-b from-black to-transparent p-3">
          <button
            className="flex items-center gap-2"
            type="button"
            onPointerDown={() => setDisplaySearch(!displaySearch)}
          >
            <img className="w-6" src="./img/location.svg" alt="location icon" />
            <span>{currentCityName}</span>
          </button>
          {!displaySearch ? (
            <div className="flex items-center gap-4">
              <button
                type="button"
                onPointerDown={() => setDisplaySearch(!displaySearch)}
              >
                <img className="w-6" src="./img/search.svg" alt="search icon" />
              </button>
              <button type="button" onPointerDown={handleSwitchUnit}>
                <img
                  className="w-6"
                  src="./img/options.svg"
                  alt="options icon"
                />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onPointerDown={() => setDisplaySearch(!displaySearch)}
            >
              <img className="w-6" src="./img/close.svg" alt="close icon" />
            </button>
          )}
        </header>
        {displaySearch ? (
          <LocationSearchDisplay
            cities={cityList}
            citiesLoading={citiesLoading}
            citiesError={citiesError}
            fetchCityList={fetchCityList}
            fetchWeather={fetchCurrentWeather}
            setCurrentCityName={setCurrentCityName}
            setDisplaySearch={setDisplaySearch}
          />
        ) : (
          <></>
        )}
        {!displaySearch ? (
          <main className="flex min-h-[1000px] flex-col gap-8 px-3">
            <CurrentWeatherDisplay
              currentWeatherData={currentWeatherData}
              currentWeatherLoading={currentWeatherLoading}
              currentWeatherError={currentWeatherError}
              theme={theme}
              unit={unitSystem}
            />
            <section
              className={`flex flex-col gap-4 rounded-lg p-2`}
              style={{ backgroundColor: `${theme.color}` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img className="w-6" src="./img/clock.svg" alt="clock" />
                  <h3 className="">Pronóstico 5 días</h3>
                </div>
                <div className="flex items-center gap-1 px-1 text-xs opacity-70">
                  <span>3</span>
                  <span>hours</span>
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
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default App;
