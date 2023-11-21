const form = document.querySelector("form");
const weatherInfo = document.querySelector(".weather-info-cont");

const getWeatherInfo = async (city)=>{
   const APIKey = `44473c906ff268724944a64022645d3a`

   let geoRes = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`)
   let geoData = await geoRes.json()

   const lat = geoData[0].lat;
   const lon = geoData[0].lon; 

   let weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`)
   return await weatherRes.json()
}

form.addEventListener("submit", (e)=>{
   e.preventDefault()
   const locationInput = e.target.children[0].children[0];
   getWeatherInfo(locationInput.value)
   .then((data)=>{
      console.log(data);
      form.style.display = "none";
      weatherInfo.style.display = "block";
   
      weatherInfo.children[0].textContent = `In ${data.name}, the current temperature is: ${data.main.temp} Fahrenheit`;
      weatherInfo.children[1].textContent = `Feels like ${data.main.feels_like} Fahrenheit`
      weatherInfo.children[2].textContent = `Weather Description: ${data.weather[0].description}`;

      if(data.weather[0].main == "Clouds") {
         weatherInfo.style.backgroundImage = "url(/assets/Clouds.jpg)";
      } else if(data.weather[0].main == "Clear") {
         weatherInfo.style.backgroundImage = "url(/assets/Clear.png)";
      } else if(data.weather[0].main == "Rain") {
         weatherInfo.style.backgroundImage = "url(/assets/Rain.jpg)";
      } else {
         weatherInfo.style.backgroundImage = "none";
      }
   })
   .catch((message)=>{
      form.style.display = "none";
      weatherInfo.style.display = "block";
      weatherInfo.children[0].textContent = `There was an error getting weather data, please try again!`
   })
})