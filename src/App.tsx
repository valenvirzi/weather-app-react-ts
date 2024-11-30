import ForecastChart from "./components/ForecastChart";
import useForecast from "./hooks/useForecast";

function App() {
  const threeHoursForecastData = useForecast();
  return (
    <div className="flex flex-col">
      <header className="flex items-center justify-between p-2">
        <button className="flex items-center gap-2" type="button">
          <img className="w-6" src="./img/location.svg" alt="location icon" />
          <span>Ituzaingó</span>
        </button>
        <div className="flex items-center gap-4">
          <button type="button">
            <img className="w-6" src="./img/search.svg" alt="search icon" />
          </button>
          <button type="button">
            <img className="w-6" src="./img/options.svg" alt="options icon" />
          </button>
        </div>
      </header>
      <main className="flex flex-col gap-4 px-3">
        <section className="flex flex-col items-center gap-2">
          <div className="flex">
            <h2 className="text-6xl">5</h2>
            <span className="font-semibold">°C</span>
          </div>
          <h2 className="text-xl">Moderate Rain</h2>
          <div className="flex flex-col items-center text-sm">
            <span>19:12</span>
            <span>Tuesday, 7 de Nov. 2024</span>
          </div>
        </section>
        <section className="flex items-center justify-between gap-4">
          <article className="flex w-full flex-col gap-2 rounded-2xl bg-[#3b4770] px-4 py-2">
            <span className="text-sm">Wind Speed</span>
            <div className="flex items-center gap-2">
              <img className="w-6" src="./img/wind.svg" alt="wind" />
              <div className="flex items-center font-semibold">
                <span>8,4</span>
                <span>Km/h</span>
              </div>
            </div>
          </article>
          <article className="flex w-full flex-col gap-2 rounded-2xl bg-[#3b4770] px-4 py-2">
            <span className="text-sm">Humidity</span>
            <div className="flex items-center gap-2">
              <img className="w-6" src="./img/humidity.svg" alt="humidity" />
              <div className="flex items-center font-semibold">
                <span>70</span>
                <span>%</span>
              </div>
            </div>
          </article>
        </section>
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
            <ForecastChart gapSize={100} apiResponse={threeHoursForecastData} />
          </div>
        </section>
        <section className="flex flex-col gap-2 p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img className="w-6" src="./img/calendar.svg" alt="calendar" />
              <h3 className="font-semibold">Pronóstico Diario</h3>
            </div>
            <div className="flex items-center gap-1">
              <span>5</span>
              <span>days {">"}</span>
            </div>
          </div>
          <div>
            <ul className="flex items-center justify-evenly">
              <li className="flex flex-col items-center gap-1">
                <span>Lunes</span>
                <span className="text-xs">25/11</span>
                <img className="w-6" src="./img/rain.svg" alt="rain" />
                <span>3°</span>
              </li>
              <li className="flex flex-col items-center gap-1">
                <span>Lunes</span>
                <span className="text-xs">25/11</span>
                <img className="w-6" src="./img/rain.svg" alt="rain" />
                <span>3°</span>
              </li>
              <li className="flex flex-col items-center gap-1">
                <span>Lunes</span>
                <span className="text-xs">25/11</span>
                <img className="w-6" src="./img/rain.svg" alt="rain" />
                <span>3°</span>
              </li>
              <li className="flex flex-col items-center gap-1">
                <span>Lunes</span>
                <span className="text-xs">25/11</span>
                <img className="w-6" src="./img/rain.svg" alt="rain" />
                <span>3°</span>
              </li>
            </ul>
            <div className="text-center">CHART</div>
            <ul className="flex items-center justify-evenly">
              <li className="flex items-center">
                <img className="w-6" src="./img/umbrella.svg" alt="umbrella" />
                <span className="text-xs">70%</span>
              </li>
              <li className="flex items-center">
                <img className="w-6" src="./img/umbrella.svg" alt="umbrella" />
                <span className="text-xs">70%</span>
              </li>
              <li className="flex items-center">
                <img className="w-6" src="./img/umbrella.svg" alt="umbrella" />
                <span className="text-xs">70%</span>
              </li>
              <li className="flex items-center">
                <img className="w-6" src="./img/umbrella.svg" alt="umbrella" />
                <span className="text-xs">70%</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
