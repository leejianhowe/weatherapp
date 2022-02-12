import { WeatherDataType } from "./types";
interface Props {
  weatherData: WeatherDataType;
}
function WeatherData(props: Props) {
  const { name, sys, main, dt, weather } = props.weatherData;
  const { temp_max, temp_min, humidity } = main;

  return (
    <div className="container">
      <div className="city-name">
        {name}, {sys.country}
      </div>
      <div className="d-flex align-items-center">
        <h4>{weather[0].main}</h4>
        <img src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`} alt={weather[0].main} />
      </div>
      <p className="description">Description: {weather[0].description}</p>
      <p className="description">
        Temperature: {temp_min}&#8451;-{temp_max}&#8451;
      </p>
      <p className="description">Humdity: {humidity}%</p>
      <p className="description">
        Time:{" "}
        {new Date(dt * 1000).toLocaleString("en-GB", {
          timeStyle: "medium",
          dateStyle: "short",
          hourCycle: "h12",
        })}
      </p>
    </div>
  );
}

export default WeatherData;
