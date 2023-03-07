const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weather = document.querySelector(".weather-box");
const weatherDetail = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKey = "0a49250c45e9e9a97215ffa8e79146fc";

  const city = document.querySelector(".search-box input").value;

  if (city == "") {
    return;
  }
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod == "404") {
        container.style.height = "400px";
        weather.style.display = "none";
        weatherDetail.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");

        return;
      }
      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");

      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "img/clear.png";
          weather.style.src = "img/ClearW.jpg";
          break;
        case "Rain":
          image.src = "img/rain.png";
          break;
        case "Snow":
          image.src = "img/snow.png";
          break;
        case "Clouds":
          image.src = "img/cloud.png";
          break;
        case "Haze":
          image.src = "img/haze.png";
          break;
        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;

      description.innerHTML = `${json.weather[0].description}`;

      humidity.innerHTML = `${json.main.humidity}%`;

      wind.innerHTML = `${parseInt(json.wind.speed)}Km/hr`;

      weather.style.display = "";
      weatherDetail.style.display = "";
      weather.classList.add("fadeIn");
      weatherDetail.classList.add("fadeIn");

      container.style.height = "500px";
    });
});
