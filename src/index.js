//date
let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thurday",
  "Friday",
  "Saturday",
];
let day = days[date.getDay()];
let hour = date.getHours();
let minutes = date.getMinutes();
let displayingDate = document.querySelector("#current-day");
if (minutes < 10) {
  minutes = `0${minutes}`;
} else {
  minutes = `${minutes}`;
}
displayingDate.innerHTML = `${day} ${hour}:${minutes}`;
//form
function changeCity(event) {
  event.preventDefault();
  let searching = document.querySelector("#search-engine");
  let city = document.querySelector("#current-city");
  city.innerHTML = `${searching.value}`;
  console.log(city);
  searchCity(searching.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCity);

function showTemp(response) {
  let temperatureNow = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  let temperatureFeel = Math.round(response.data.main.feels_like);
  let feelsLike = document.querySelector("#feels-like");
  let humidityData = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  let tempMaxData = response.data.main.temp_max;
  let maxTemp = document.querySelector("#max-temp");
  let minTempData = Math.round(response.data.main.temp_min);
  let tempMin = document.querySelector("#min-temp");
  let windData = response.data.wind.speed;
  let wind = document.querySelector("#wind");
  let iconImage = document.querySelector("#icon");
  console.log(temperature);
  console.log(response);
  iconImage.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  wind.innerHTML = `${windData}m/sec`;
  tempMin.innerHTML = `${minTempData}°C`;
  maxTemp.innerHTML = `${tempMaxData}°C`;
  humidity.innerHTML = `${humidityData}%`;
  feelsLike.innerHTML = `${temperatureFeel}°C`;
  temperatureNow.innerHTML = `${temperature}°C`;
}
function searchCity(city) {
  let apiKey = "dc3d0a666859ea962c79a637a11564d0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

//geolocation
function currentLocation(response) {
  let city = document.querySelector("#current-city");
  let temperatureGeol = document.querySelector("#temperature");
  console.log(response);
  let CurrentTemperature = Math.round(response.data.main.temp);
  let feelsLikeData = Math.round(response.data.main.feels_like);
  let feelsLike = document.querySelector("#feels-like");
  let humidityData = response.data.main.humidity;
  let tempMaxData = Math.round(response.data.main.temp_max);
  let maxTemp = document.querySelector("#max-temp");
  let minTempData = Math.round(response.data.main.temp_min);
  let tempMin = document.querySelector("#min-temp");
  let windData = response.data.wind.speed;
  let wind = document.querySelector("#wind");
  let iconImage = document.querySelector("#icon");
  wind.innerHTML = `${windData}m/sec`;
  tempMin.innerHTML = `${minTempData}°C`;
  maxTemp.innerHTML = `${tempMaxData}°C`;
  humidity.innerHTML = `${humidityData}%`;
  feelsLike.innerHTML = `${feelsLikeData}°C`;
  city.innerHTML = `${response.data.name}`;
  temperatureGeol.innerHTML = `${CurrentTemperature}°C`;
  iconImage.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function triggerTheRequest() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let CurrentLocationButton = document.querySelector("#current-location-button");
CurrentLocationButton.addEventListener("click", triggerTheRequest);

function retrievePosition(position) {
  let apiKey = "dc3d0a666859ea962c79a637a11564d0";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(currentLocation);
}
