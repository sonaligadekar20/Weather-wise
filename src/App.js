import React, { useState } from 'react'
import axios from 'axios'
import "./App.css"
import { useEffect } from 'react';
import ImageCloud from "./img/cloudy.png";
import Card from './components/Card/Card';
import Wind from "./img/wind.png";
import Humidity from "./img/humidity.png"


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
  return (
    <div>
      <h1 className='app-title'>WEATHER WISE</h1>

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

          <img className='img-cloud' src={ImageCloud }/>

          <p className='temperature'>Temperature : {(weatherData?.main?.temp - 273).toFixed(2)} ºC </p>

          <p className='description'> {weatherDescription}</p>


        </div>

        <div className='weather-container1'>

       
          <p  >Wind :{weatherData?.wind?.speed} Km/h</p>
          <p>Humidity :{weatherData?.main?.humidity} F</p>
          <p>Pressure :{weatherData?.main?.pressure} pa</p>
          <p>Visibility : {weatherData?.visibility} meters</p>

        </div>

      </div>

    </div>
  )
}