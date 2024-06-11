import React, { useEffect, useState } from "react";
import "./weather.css";
import day from "../src/assets/day.jpg";
import night from "../src/assets/night.jpg";
import sun from "../src/assets/sun.png";
import moon from "../src/assets/moon.png";
import { FaTemperatureFull } from "react-icons/fa6";
import { FaWind } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { BsGraphDown } from "react-icons/bs";
import { BsFillDropletFill } from "react-icons/bs";

function Weather() {
  const [status, setStatus] = useState("");
  const [city, setCity] = useState("");
  const [wdetails, setWdetails] = useState();

  const currTime = new Date().toLocaleTimeString();

  const fetchData = (cityName) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=751d66e130befad396405dc13796a57c&units=metric`
    )
      .then((res) => res.json())
      .then((finalRes) => {
        if (finalRes.cod === "404") {
          setWdetails(undefined);
        } else {
          setWdetails(finalRes);
        }
      });
  };

  useEffect(() => {
    fetchData("Ahmedabad");
  }, []);

  const getData = (event) => {
    event.preventDefault();
    fetchData(city);
    setCity("");
  };

  return (
    <div className="outerDiv">
      <div className="show">
        <div className="left">
          <div className="img">
            <img src={sun} alt="" />
            <h4>{currTime}</h4>
          </div>
          <form onSubmit={getData}>
            <div className="title">
              <h1 className="headOne">Weather</h1>
              <h1>Forecast</h1>
            </div>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter the city"
            />
            <button className="btn">Search</button>
          </form>
        </div>
        <div className="right">
          {wdetails ? (
            <>
              <h1>{wdetails.name}</h1>
              <div className="tempp">
                <h3 className="tempIcon">
                  <FaTemperatureFull />
                </h3>
                <h2>{wdetails.main.temp}</h2>
                <h3>°</h3>
              </div>
              <p>{wdetails.weather[0].description}</p>
              <div className="innerRight">
                <div className="tempMax">
                  <h2>Max. Temperature</h2>
                  <h4>
                    <BsGraphUp />
                  </h4>
                  <h3>
                    {wdetails.main.temp_max}
                    <span>°</span>
                  </h3>
                </div>
                <div className="tempMin">
                  <h2>Min. Temperature</h2>
                  <h4>
                    <BsGraphDown />
                  </h4>
                  <h3>
                    {wdetails.main.temp_min}
                    <span>°</span>
                  </h3>
                </div>
                <div className="wind">
                  <h2>
                    Wind <br /> (km/hr)
                  </h2>
                  <h4>
                    <FaWind />
                  </h4>
                  <h3>{wdetails.wind.speed}</h3>
                </div>
                <div className="humidity">
                  <h2>
                    Humidity <br /> (%)
                  </h2>
                  <h4>
                    <BsFillDropletFill />
                  </h4>
                  <h3>{wdetails.main.humidity}</h3>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Weather;
