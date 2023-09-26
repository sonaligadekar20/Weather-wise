import React, { useState } from 'react'
import axios from 'axios'
import "./App.css"
import { useEffect } from 'react';


export default function App() {

  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("pune");
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
      <h1>Weather App</h1>
      <p>City: {weatherData?.name}</p>
      <p>Temperature: {(weatherData?.main?.temp - 273). toFixed(2)} ºC </p>
      <p>Visibility: {weatherData?.visibility} meters</p>
    </div>
  )
}