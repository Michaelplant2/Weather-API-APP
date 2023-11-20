const input = document.getElementById("input");
const searchBtn = document.getElementById("search");

const getWeatherInfo = async (city)=>{
   const APIKey = `44473c906ff268724944a64022645d3a`

   let geoRes = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`)
   let geoData = await geoRes.json()

   const lat = geoData[0].lat;
   const lon = geoData[0].lon; 

   let weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`)
   let weatherData = await weatherRes.json()
}

searchBtn.addEventListener("submit", (e)=>{
   e.preventDefault()
})