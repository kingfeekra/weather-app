import "./styles.css";

const weatherData = {};

function getWeather() {
    const searchBar = document.querySelector(".searchBar");
    let searchTerm;

    if(searchBar.value == "") {
        searchTerm = "London";
    }
    else {
        searchTerm = searchBar.value;
    }

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&APPID=3392022e755c4c2fdc374c15c9f7e484`, {mode: 'cors'})
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
    const weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("alt", "weather-icon");
    weatherBox.appendChild(weatherIcon);

    for(let i = 0; i < 5; i++) {
        const para = document.createElement("p");
        weatherBox.appendChild(para);
    }
}

function displayWeather() {
    setWeatherIcon();
    const paraList = document.querySelectorAll(".weatherBox > p");
    console.log(paraList);
    paraList[0].classList.add("location");
    paraList[0].textContent = weatherData.location;
    paraList[1].classList.add("temp");
    paraList[1].textContent = Math.round(weatherData.temp) + "℃";
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

const searchButton = document.querySelector(".searchButton");
searchButton.addEventListener("click", () => {
    getWeather();
})

addDOMStuff();
getWeather();
setInterval(currentTime, 1000);
