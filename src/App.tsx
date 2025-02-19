import { useEffect, useState } from "react";
import CurrentWeatherDisplay from "./components/CurrentWeatherDisplay";
import ForecastChart from "./components/ForecastChart";
import useCurrentWeather from "./hooks/useCurrentWeather";
import useForecast from "./hooks/useForecast";
import LocationSearchDisplay from "./components/LocationSearchDisplay";
import useGeocoding from "./hooks/useGeocoding";
import SettingsDisplay from "./components/SettingsDisplay";
import { SettingsProvider } from "./context/SettingsContext";
import { useWeatherData } from "./context/WeatherDataContext";
import ExtraForecastDisplay from "./components/ExtraForecastDisplay";

function App() {
  // TODO: Hide the ApiKeys in a .env file
  // TODO: Change Geocoding API to the one on the link because the current one only supports search by exact name instad of partial name.
  // https://docs.mapbox.com/playground/geocoding/?search_text=orla&limit=10&proximity=ip&searchType=forward
  // https://docs.mapbox.com/api/search/geocoding/?utm_medium=pricing&utm_content=temporary-api#geocoding-api-pricing
  const geocodingApiKey = "heRF6kJUGfGXsgT7lpj2sA==DAabcgoiFqoC7lK5";
  const weatherApiKey = "19460d6e8004c61debf07d5ca332ee8d";

  const [displaySearch, setDisplaySearch] = useState<boolean>(false);
  const [displaySettings, setDisplaySettings] = useState<boolean>(false);

  const { weatherData } = useWeatherData();

  const toggleSettingsDisplay = () => {
    setDisplaySettings(!displaySettings);
  };

  const {
    loading: forecastLoading,
    error: forecastError,
    fetchForecast,
  } = useForecast(weatherApiKey);

  const {
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

  useEffect(() => {
    const storedWeather = localStorage.getItem("weatherData");
    if (storedWeather) {
      const parsedWeather = JSON.parse(storedWeather);
      const city = parsedWeather.city;
      const lastUpdated = parsedWeather.timestamp;
      if (Date.now() - lastUpdated > 10800000) {
        fetchCurrentWeather({
          latitude: city.latitude,
          longitude: city.longitude,
        });
        fetchForecast({ latitude: city.latitude, longitude: city.longitude });
      }
    }
  }, [fetchCurrentWeather, fetchForecast]);

  // TODO: Think about a better way to display different screens (such as LocationSearchDisplay or SettingsDisplay), maybe by setting up React.Router for navigation between screens instead of rendering conditionally based on a state for every possible page like it is now.
  {
    /* 
    TODO: Add new features to the app such as:
    - a display for the sunrise and sunset times for the current date.
    {weatherData.currentWeather.sys.sunrise, weatherData.currentWeather.sys.sunset}
    */
  }
  // TODO: Export everything that can be exported to clean the code and separate it depending on its functionality.
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
    if (weatherData.currentWeather?.weather?.[0]?.main) {
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
        Mist: {
          color: "#8a8b8e",
          backgroundImage:
            "https://lik.com/cdn/shop/products/Peter-Lik-Into-the-Mist-Framed-Recess-Mount_1800x.jpg?v=1654815739",
        },
        Haze: {
          color: "#8a8b8e",
          backgroundImage:
            "https://lik.com/cdn/shop/products/Peter-Lik-Into-the-Mist-Framed-Recess-Mount_1800x.jpg?v=1654815739",
        },
      };
      const weatherMain = weatherData.currentWeather.weather[0].main;
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
  }, [weatherData.currentWeather]);

  return (
    <SettingsProvider>
      <div
        className={`app relative min-h-screen bg-cover bg-fixed bg-center bg-no-repeat pb-6`}
        style={{ backgroundImage: `url(${theme.backgroundImage})` }}
      >
        <div
          className={`absolute inset-0 opacity-55`}
          style={{ backgroundColor: `${theme.color}` }}
        ></div>
        <div className="relative z-10 flex flex-col gap-4 text-white">
          <header className="sticky top-0 z-20 flex items-center justify-between bg-opacity-55 bg-gradient-to-b from-black to-transparent p-3 xl:px-5 2xl:px-7">
            <button
              className="flex items-center gap-2"
              type="button"
              onPointerDown={() => setDisplaySearch(!displaySearch)}
            >
              <img
                className="w-6 md:w-7 xl:w-8"
                src="./img/locationPin.svg"
                alt="location icon"
              />
              <span className="xl:text-lg">{weatherData.city?.name}</span>
            </button>
            {!displaySearch ? (
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onPointerDown={() => setDisplaySearch(!displaySearch)}
                >
                  <img
                    className="w-6 md:w-7 xl:w-8"
                    src="./img/search.svg"
                    alt="search icon"
                  />
                </button>
                {/* TODO: Make a proper display for the Settings screen, so that it only shows the settings when opened and the main screen when closed. */}
                {!displaySettings ? (
                  <button type="button" onPointerDown={toggleSettingsDisplay}>
                    <img
                      className="w-6 md:w-7 xl:w-8"
                      src="./img/options.svg"
                      alt="options icon"
                    />
                  </button>
                ) : (
                  <button type="button" onPointerDown={toggleSettingsDisplay}>
                    <img
                      className="w-6 md:w-7 xl:w-8"
                      src="./img/close.svg"
                      alt="close icon"
                    />
                  </button>
                )}
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
          {displaySettings ? <SettingsDisplay /> : <></>}
          {displaySearch ? (
            <LocationSearchDisplay
              cities={cityList}
              citiesLoading={citiesLoading}
              citiesError={citiesError}
              goecodingApiKey={geocodingApiKey}
              fetchCityList={fetchCityList}
              fetchCurrentWeather={fetchCurrentWeather}
              fetchForecast={fetchForecast}
              setDisplaySearch={setDisplaySearch}
            />
          ) : (
            <></>
          )}
          {!displaySearch ? (
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
          ) : (
            <></>
          )}
        </div>
      </div>
    </SettingsProvider>
  );
}

export default App;
