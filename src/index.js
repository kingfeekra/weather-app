import "./styles.css";
import "./toggleStyles.css"

const weatherData = {};
let units;

function getWeather() {
    const searchBar = document.querySelector(".searchBar");
    const toggle = document.querySelector(".switch > input");

    let searchTerm;

    if(searchBar.value == "") {
        searchTerm = "Dublin";
    }
    else {
        searchTerm = searchBar.value;
    }

    if(toggle.checked == true) {
        units = "imperial";
    }
    else if(toggle.checked != true) {
        units = "metric";
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=${units}&APPID=3392022e755c4c2fdc374c15c9f7e484`, {mode: 'cors'})
        .then(function(response) {
        return response.json();
        })
        .then(function(response) {
            console.log(response);
            weatherData.location = response.name;
            weatherData.temp = parseInt(response.main.temp);
            weatherData.weather = response.weather[0].main;
            weatherData.humidity = response.main.humidity;
            weatherData.icon = response.weather[0].icon;
            console.log(weatherData);
        })
        .then(function(response) {
            displayWeather();
        })
}

function addDOMStuff() {
    const weatherBox = document.querySelector(".weatherBox");
    for(let i = 0; i < 5; i++) {
        const para = document.createElement("p");
        weatherBox.insertBefore(para, weatherBox.children[0]);
    }
    const weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("alt", "weather-icon");
    weatherBox.insertBefore(weatherIcon, weatherBox.children[0]);
}

function displayWeather() {
    setWeatherIcon();
    const paraList = document.querySelectorAll(".weatherBox > p");
    console.log(paraList);
    paraList[0].classList.add("location");
    paraList[0].textContent = weatherData.location;
    paraList[1].classList.add("temp");
    if(units == "metric") {
        paraList[1].textContent = Math.round(weatherData.temp) + "℃";
    }
    else if(units == "imperial") {
        paraList[1].textContent = Math.round(weatherData.temp) + "°F";
    }
    paraList[2].classList.add("weatherType");
    paraList[2].textContent = weatherData.weather;
    paraList[3].classList.add("humidity");
    paraList[3].textContent = "Humidity: " + weatherData.humidity + "%";
    paraList[4].classList.add("currentTime");
    currentTime();
}

function setWeatherIcon() {
    const img = document.querySelector(".weatherBox > img");
    const icon = weatherData.icon;
    img.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`)
}

function currentTime() {
    const timeDiv = document.querySelector(".currentTime")
    const time = new Date().toLocaleTimeString();
    timeDiv.textContent = time;
}

function cToF(celsius) {
    let cTemp = celsius;
    let fahrenheit = cTemp * 9 / 5 + 32;
    return fahrenheit;
}

function fToC(fahrenheit) {
    let fTemp = fahrenheit;
    let celsius = (fTemp -32) * (5/9);
    return celsius;
}

/*function tempConvert() {
    const temp = document.querySelector(".temp");
    if(temp.textContent.includes("℃")) {
        temp.textContent = cToF(weatherData.temp) + "°F";
    }
    else if(temp.textContent.includes("°F")) {
        temp.textContent = weatherData.temp + "℃";
    }
}*/
function tempConvert() {
    const temp = document.querySelector(".temp")
    const toggle = document.querySelector(".switch > input");
    if(toggle.checked != true) {
        let fahrenheit = cToF(parseInt(temp.textContent));
        temp.textContent = Math.round(fahrenheit)+ "°F";
    }
    else if(toggle.checked == true) {
        let celsius = fToC(parseInt(temp.textContent));
        temp.textContent = Math.round(celsius) + "℃";
    }
}

addDOMStuff();
getWeather();
setInterval(currentTime, 1000);

const toggle = document.querySelector(".slider");

toggle.addEventListener("click", () => {
    tempConvert();
})

const searchButton = document.querySelector(".searchButton");
searchButton.addEventListener("click", () => {
    getWeather();
});
