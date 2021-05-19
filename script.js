let form = document.querySelector("#search-form");

form.addEventListener("submit", search); // call the function after submit

// function that displays the user's current location (city)
function showLocationCity(response) {
  let currentcity = response.data.name;

  let currentlocationcity = document.querySelector(".city");
  currentlocationcity.innerHTML = currentcity;
}

// function that displays the user's current location (country)
function showLocationCountry(response) {
  let currentcountry = response.data.sys.country;

  let currentlocationcountry = document.querySelector(".country");
  currentlocationcountry.innerHTML = currentcountry;
}

// function that displays the user's current location's temperature
function showCurrentTemp(response) {
  let temperature = Math.round(response.data.main.temp);

  let currenttemperature = document.querySelector(".temperature-current");
  currenttemperature.innerHTML = temperature;
}

// function to use API to retrieve data for the current position
function getPosition(position) {
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units = "metric";
  let apiKey = "4f0c3132958148b431199806e8e0d604";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;
  console.log(apiUrl);

  axios.get(apiUrl).then(showCurrentTemp);
  axios.get(apiUrl).then(showLocationCity);
  axios.get(apiUrl).then(showLocationCountry);
}

// get position
navigator.geolocation.getCurrentPosition(getPosition);

//display user's current day and time
let date = document.querySelector("#date");

let currentDate = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[currentDate.getDay()];
let currentHours = currentDate.getHours();
let currentMinutes = currentDate.getMinutes();

date.innerHTML = `${currentDay} ${currentHours}:${currentMinutes}`;

//let city = document.querySelector(".city"); //enter city at top of page
//if (searchInput.value) {
// city.innerHTML = `${searchInput.value}`;
//} else {
//  city.innerHTML = null;
//  alert("Please enter a city.");
//}

//display city entered on search field

function showSearchWeather(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector(".temperature-current").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".humidity-current").innerHTML =
    response.data.main.humidity;
  document.querySelector(".country").innerHTML = response.data.sys.country;
}

function search(event) {
  //add event to function
  event.preventDefault(); //prevent event to reload the page
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let citySearch = document.querySelector("#search-input").value;
  let units = "metric";
  let apiKey = "4f0c3132958148b431199806e8e0d604";
  let apiUrl = `${apiEndpoint}${citySearch}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showSearchWeather);
}
