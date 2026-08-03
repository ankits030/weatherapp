const API_KEY = "L7A2LDK2A5LDNEGVW3YBBTF5A";

async function getWeather(location) {

const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`;

const response = await fetch(url);

const data = await response.json();

console.log(data);

return data;
}

getWeather("Mumbai");
