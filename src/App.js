import React, { useState } from 'react'
import axios from 'axios'
import "./App.css"
import { useEffect } from 'react';
import ImageCloud from "./img/cloudy.png";
import Card from './components/Card/Card';
import Wind from "./img/wind.png";
import Humidity from "./img/humidity.png"
import Pressure from "./img/pressure.png"
import Visibility from "./img/visibility.png"


export default function App() {

  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("Pune");
  const [weatherDescription, setWeatherDescription] = useState("");

  async function loadWeatherData() {

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q= ${city} &appid=b48aae673370fcbb841898cba8cd7423`)
      setWeatherData(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadWeatherData();
  }, [])

  useEffect(() => {
    loadWeatherData();
  }, [city])

  useEffect(() => {
    setWeatherDescription(`${weatherData?.weather?.[0]?.main}(${weatherData?.weather?.[0]?.description})`)
  })

  //Date

  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: 'short' });
  let day = d.toLocaleString("default", { weekday: 'long' });

  //Time
  let time = d.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'

  });

  return (
    <div>
      <h1 className='app-title'>WEATHER WISE</h1>

      <p className="date-time ">
        {day}, {month}, {date}, {year}
        <br />
        {time}
      </p>

      <div className='search'>
        <input type='text' value={city} onChange={(e) => {
          setCity(e.target.value);
        }}
          placeholder='Search Location...'
        />
      </div>

      <div className='weather-flex-container'>

        <div className='weather-container'>

          <p className='cityname'>{weatherData?.name}</p>

          <img className='img-cloud' src={ImageCloud} />

          <p className='temperature'>Temperature : {(weatherData?.main?.temp - 273).toFixed(2)} ºC </p>

          <p className='description'> {weatherDescription}</p>


        </div>

        <div className='weather-container-card'>
          <div className='container-card'>
            <div> <Card head={'Wind'} Img={Wind} report={(weatherData?.wind?.speed)} unit="km/h" /> </div>
            <div><Card head={'Humidity'} Img={Humidity} report={(weatherData?.main?.humidity)} unit="°F" /></div>

          </div>

          <div className='container-card'>
            <div><Card head={'Pressure'} Img={Pressure} report={(weatherData?.main?.pressure)} unit="pa" /></div>
            <div><Card head={'Visibility'} Img={Visibility} report={(weatherData?.visibility)} unit="meters" /></div>

          </div>

          {/* <p  >Wind :{weatherData?.wind?.speed} Km/h</p> */}
          {/* <p>Humidity :{weatherData?.main?.humidity} F</p> */}
          {/* <p>Pressure :{weatherData?.main?.pressure} pa</p> */}
          {/* <p>Visibility : {weatherData?.visibility} meters</p> */}

        </div>

      </div>

    </div>
  )
}