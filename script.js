const API_KEY = "L7A2LDK2A5LDNEGVW3YBBTF5A";

async function getWeather(location) {

const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${API_KEY}`;

  const response = await fetch(url);

  const data = await response.json();

  return data;
}

function processWeather(data){

  const weather = {
    address: data.address,
    temp: data.currentConditions.temp,
    conditions: data.currentConditions.conditions,
    humidity: data.currentConditions.humidity,
    windspeed: data.currentConditions.windspeed,
    datetime: data.currentConditions.datetime,
    sunrise: data.currentConditions.sunrise,
    sunset: data.currentConditions.sunset,
    description: data.days[0].description,
    icon: data.currentConditions.icon
  };

  return weather;
}
function getWeatherIcon(icon){

  const icons = {
    "clear-day": "☀️",
    "clear-night": "🌙",
    "rain": "🌧️",
    "snow": "❄️",
    "fog": "🌫️",
    "wind": "💨",
    "cloudy": "☁️",
    "partly-cloudy-day": "⛅",
    "partly-cloudy-night": "🌙☁️"
  };

  return icons[icon] || "🌍";
}
function changeBackground(condition){

  const body = document.body;

  if(condition.toLowerCase().includes("rain")){
    body.style.background = "linear-gradient(135deg,#4e54c8,#8f94fb)";
  }

  else if(condition.toLowerCase().includes("cloud")){
    body.style.background = "linear-gradient(135deg,#757f9a,#d7dde8)";
  }

  else if(condition.toLowerCase().includes("clear")){
    body.style.background = "linear-gradient(135deg,#fddb92,#d1fdff)";
  }

  else{
    body.style.background = "linear-gradient(135deg,#74ebd5,#ACB6E5)";
  }

}

function displayWeather(weather){

  const container = document.getElementById("weatherResult");

  container.innerHTML = `
  <h2 class="location">${weather.address}</h2>
<h1 class="weather-icon">${getWeatherIcon(weather.icon)}</h1>
  <div class="card-container">

    <div class="card">
      <h3>Current Weather</h3>
      <p>DateTime: ${weather.datetime}</p>
      <p>Temperature: ${weather.temp}°C</p>
      <p>Condition: ${weather.conditions}</p>
      <p>Description: ${weather.description}</p>
    </div>

    <div class="card">
      <h3>Atmosphere</h3>
      <p>Humidity: ${weather.humidity}%</p>
      <p>Wind Speed: ${weather.windspeed} km/h</p>
    </div>

    <div class="card">
      <h3>Sun Cycle</h3>
      <p>Sunrise: ${weather.sunrise}</p>
      <p>Sunset: ${weather.sunset}</p>
    </div>

  </div>
  `;
  changeBackground(weather.conditions);
}

const form = document.getElementById("weatherform");

form.addEventListener("submit", async (e)=>{

  e.preventDefault();

  const location = document.getElementById("location").value;

  const rawData = await getWeather(location);

  const weather = processWeather(rawData);

  displayWeather(weather);

});
