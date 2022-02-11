import { useState } from "react";
import { FormState, WeatherDataType, ErrorMessage } from "./types";
import useSearchHistory from "./useSearchHistory";
import WeatherData from "./WeatherData";
import "./App.css";

const initialFormState = {
  city: "",
  country: "",
};

function App() {
  const { saveSearch, searchHistory, deleteSearchItem } = useSearchHistory();
  const [form, setForm] = useState<FormState>(initialFormState);
  const [weatherData, setWeatherData] = useState<WeatherDataType>();
  const [error, setError] = useState("");
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation();
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!form.city && !form.country) {
      handleError(ErrorMessage.NO_INPUT);
      return;
    }
    getWeather(form);
  };
  const handleClear: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setForm(initialFormState);
  };
  const handleError = (code: ErrorMessage) => {
    setError(code);
    setTimeout(() => {
      setError("");
    }, 3000);
  };
  const getWeather = async (form: FormState) => {
    const queryValue = Object.values(form).join(",");
    try {
      const response = await fetch(
        encodeURI(
          `https://api.openweathermap.org/data/2.5/weather?q=${queryValue}&appid=${process.env.REACT_APP_APPID}&units=metric`
        )
      );
      if (response.status === 200) {
        const data = await response.json();
        setWeatherData(data);
      } else if (response.status >= 400 && response.status < 500) {
        handleError(ErrorMessage.NOT_FOUND);
      } else {
        handleError(ErrorMessage.SNA);
      }
    } catch (error) {}
  };
  return (
    <div className="container">
      <h2>Today's Weather</h2>
      <hr />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-between d-flex mb-2">
            <div className="col-lg-3 col-md-6 col-sm-12 form-group ">
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                value={form.city}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                id="country"
                value={form.country}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-lg-3 col-md-12 col-sm-12 align-items-center d-flex">
              <button type="submit" className="btn btn-primary mr-2">
                Search
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="btn btn-secondary"
              >
                Clear
              </button>
            </div>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
        </form>
      </div>
      {weatherData && <WeatherData weatherData={weatherData} />}
    </div>
  );
}

export default App;
