// date and time display
let now = new Date();
let dateS = now.toDateString();
let timeS = now.toLocaleTimeString();
let today = document.querySelector("#date");
today.innerHTML = `${dateS} ${timeS}`;

// search city
//Geolocation API
function showWeather(response) {
  //let h1 = document.querySelector("h1");
  let weather = response.data.weather[0].main;
  let weatherType = document.querySelector("h3");
  let temperatureCurrent = Math.round(response.data.main.temp);
  let temperatureCelcious = document.querySelector("#current-temp");
  temperatureCelcious.innerHTML = temperatureCurrent;
  weatherType.innerHTML = weather;
  document.querySelector("#current-precipitation").innerHTML =
    response.data.main.precipitation;
  document.querySelector("#current-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#current-wspeed").innerHTML = Math.round(
    response.data.wind.speed
  );
}
function enteredCity(event) {
  event.preventDefault();
  let cInput = document.querySelector(".enter-city");
  let h2 = document.querySelector("#city");
  h2.innerHTML = `${cInput.value}`;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", enteredCity);

/*//🙀 Bonus feature
function tempCelcius() {
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = "14";
}

function tempFahrenheit() {
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = "57.2";
}

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", tempCelcius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", tempFahrenheit); */

function currentLocationTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let buttonCurrent = document.querySelector("#current-location-button");
  buttonCurrent.addEventListener("click", showCurrentLocationTemperature);

  function showCurrentLocationTemperature(event) {
    event.preventDefault();

    let cityName = response.data.name;
    let temperatureCelsius = document.querySelector("#current-temp");
    let h2 = document.querySelector("#city");

    temperatureCelsius.innerHTML = temperature;
    h2.innerHTML = cityName;
  }
}

function retrieveCurrentPosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lati = position.coords.latitude;
  let long = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&units=metric&appid=${apiKey}`;
  axios.get(url).then(currentLocationTemperature);
}

navigator.geolocation.getCurrentPosition(retrieveCurrentPosition);
