import React, { useState } from 'react'
import axios from 'axios'
import "./App.css"
import { useEffect } from 'react';


export default function App() {

  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("Pune");
  // const [weatherDescription, setWeatherDescription] = useState("");

  async function loadWeatherData() {

    try{
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q= ${city} &appid=b48aae673370fcbb841898cba8cd7423`)
       setWeatherData(response.data);
    }
    catch(error){
      console.log(error);
    }   
  }

  useEffect(() => {
    loadWeatherData();
  },[])

  useEffect(()=>{
    loadWeatherData();
  }, [city])
  return (
    <div>
      <h1 className='app-title'>Weather Wise</h1>

      <div className='search'>
        <input type = 'text' value={city} onChange={(e) => {
          setCity(e.target.value);
        }}
        placeholder='Search Location'
        />
      </div>
      <div className='container'>
      <p className='cityname'>City : {weatherData?.name}</p>
      <p className='temperature'>Temperature: {(weatherData?.main?.temp - 273). toFixed(2)} ºC </p>
      <p className='visibility'>Visibility: {weatherData?.visibility} meters</p>

      </div>
     
    </div>
  )
}