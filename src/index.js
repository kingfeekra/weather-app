import "./styles.css";

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
            const weatherData = {}
            weatherData.location = response.name;
            weatherData.temp = response.main.temp;
            weatherData.humidity = response.main.humidity;
            weatherData.weather = response.weather[0].main;
            console.log(weatherData);
        })
}

const searchButton = document.querySelector(".searchButton");
searchButton.addEventListener("click", () => {
    getWeather();
})

getWeather();
