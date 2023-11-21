const form = document.querySelector("form");
const weatherInfo = document.querySelector(".weather-info-cont");

const getWeatherInfo = async (city)=>{
   const APIKey = `44473c906ff268724944a64022645d3a`

   let geoRes = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`)
   let geoData = await geoRes.json()

   const lat = geoData[0].lat;
   const lon = geoData[0].lon; 

   let weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`)
   let weatherData = await weatherRes.json()

   form.style.display = "none";
   weatherInfo.style.display = "flex";

   console.log(weatherData);

   weatherInfo.children[0].textContent = `In ${weatherData.name}, the current temperature is: ${weatherData.main.temp} Fahrenheit`;
   weatherInfo.children[1].textContent = `Weather Description: ${weatherData.weather[0].main}`;
}

form.addEventListener("submit", (e)=>{
   e.preventDefault()
   const locationInput = e.target.children[0].children[0];
   getWeatherInfo(locationInput.value)
})