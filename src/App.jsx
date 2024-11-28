import React, {useState} from 'react';

// CssFile
import './App.css';

// Components
import Navbar from './Components/Navbar/Navbar';

// Animation For Weather
import Lottie from "lottie-react";

// Import Location Material UI icon
import LocationOnIcon from '@mui/icons-material/LocationOn';


// Import Animation For weather result
import SunAnimation from "./WeatherAnimation/Sun.json";
import CloudAnimation from "./WeatherAnimation/Clouds.json";
import RainAnimation from "./WeatherAnimation/Rain.json";
import MistAnimation from "./WeatherAnimation/Mist.json";
import ThunderstormAnimation from "./WeatherAnimation/Thunderstorm.json";
import SnowAnimation from "./WeatherAnimation/SnowAnimation.json";

// Import Material UI ICON for weather
import WbSunnyIcon from '@mui/icons-material/WbSunny'; // Sun
import CloudIcon from '@mui/icons-material/Cloud'; // Cloud
import OpacityIcon from '@mui/icons-material/Opacity'; // Rain
import ThunderstormIcon from '@mui/icons-material/Thunderstorm'; // Thunderstorm
import FoggyIcon from '@mui/icons-material/BlurOn'; // Mist
import AcUnitIcon from '@mui/icons-material/AcUnit';




function App() {

  
  const capitalizeEachWord = (sentence) => {
    return sentence
      .split(" ") // დავყოთ წინადადება სიტყვებად
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // თითოეული სიტყვის პირველი ასო დიდი
      .join(" "); // სიტყვების გაერთიანება
  };


  const getWeatherDescriptionIcon = (weatherIcon) =>{
    switch(weatherIcon){
      case 'Rain':
        return <OpacityIcon sx={{color:"white"}} />;
      case 'Clouds':
        return <CloudIcon sx={{color:"white"}} /> ;
      case 'Mist':
        return  <FoggyIcon sx={{color:"white"}} />;
      case 'Clear':
        return <WbSunnyIcon sx={{color:"white"}} />;
      case 'Thunderstorm':
        return <ThunderstormIcon  sx={{color:"white"}}/>;
      case 'Snow':
        return <AcUnitIcon sx={{color:"white"}} />
      default: return null;
           
    }
  }
  

  const getWeatherAnimation = (weatherMain, weatherDescription) => {
    switch (weatherMain) {
      case 'Rain':
        return RainAnimation;
      case 'Clouds': // OpenWeatherMap-ში Clouds გამოიყენება Cloud-ის ნაცვლად
        if (
          weatherDescription.includes('overcast clouds') || 
          weatherDescription.includes('broken clouds')
        ) {
          return MistAnimation; // ღრუბლიანი ამინდისთვის
        }
        return MistAnimation; // აქ შეიძლება სხვანაირი ანიმაცია დაამატო თუ საჭიროა
      case 'Mist':
        return CloudAnimation;
      case 'Thunderstorm':
        return ThunderstormAnimation;
      case 'Clear':
        return SunAnimation; // მზიანი ამინდისთვის
      case 'Snow':
        return SnowAnimation
      default:
        return MistAnimation; // უცნობი ან სტანდარტული ანიმაცია
    }
  };
  

  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (city) => {
    const ApiKey = '84f3d42879ee8a4ed13b5e14640e4381';
    const Url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`;
    console.log(Url); 

    try {
      const response = await fetch(Url);
      if (!response.ok) {
        throw new Error("City Not Found");
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setError(error.message);
    }
  };

  return (
    <div>
      {/* Navbar component */}
      <Navbar onSearch={fetchWeatherData} />

      {/* Error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Weather data display */}
      {weatherData && (
        <div className='WeatherData-Info'>
            <div className="WeatherAnimation">
            <Lottie 
              animationData={getWeatherAnimation(weatherData.weather[0].main, weatherData.weather[0].description)}
              style={{ height: 160, width: 160 }}
            />
          </div>
          <div className="WeatherIcon">
    {getWeatherDescriptionIcon(weatherData.weather[0].main)}
  </div>
          <h2 className='CityTemperature'>
            {Math.ceil(weatherData.main.temp - 273.15)}°C
          </h2>
          <h3 className='CityWeather'>{capitalizeEachWord(weatherData.weather[0].description)}</h3>
          <hr className='Hr'></hr>
          <h1 className='CityName'>
            {weatherData.name}
            </h1>
            <LocationOnIcon  sx={{fontSize:"50px", transform:"translateX(-11rem) translateY(-5.7rem)",color:"white",fontWeight:"bold"}}/>
         
          {/* ამინდის ანიმაციები */}
        </div>
      )}

    </div>
  );
}


export default App;