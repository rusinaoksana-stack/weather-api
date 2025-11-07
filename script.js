const citiesId = {
    "Kyiv": 703447,
    "Lviv": 702550,
    "Odesa": 698740,
    "Kharkiv": 706483,
    "Dnipro": 709930,
    "Zaporizhia": 687700,
    "Vinnytsia": 689558,
    "Ternopil": 691650,
    "Ivano-Frankivsk": 707471,
    "Lutsk": 702569,
    "Rivne": 695365,
    "Zhytomyr": 686967,
    "Khmelnytskyi": 706369,
    "Cherkasy": 710791,
    "Chernigiv": 710735,
    "Chernivtsi": 710719,
    "Sumy": 692194,
    "Poltava": 696643,
    "Kropyvnytskyi": 705812,
    "Mykolaiv": 2962308,
    "Kherson": 700568,
    "Uzhgorod": 690548
};

const imgIco = document.getElementById('weather-icon');
const cityName = document.querySelector('.city-name b');
const tempElement = document.querySelector('.temperature');
const weatherInfoElement = document.querySelector('.weather-info');
const infoParagraphs = weatherInfoElement.querySelectorAll('p');
const select = document.getElementById('city-select');

function showWeatherDetails() {
    tempElement.style.display = 'block';
    weatherInfoElement.style.display = 'flex';
    imgIco.style.display = 'block'; // Додати цей рядок
}

function fetchWeather(cityValue) {
    const cityId = citiesId[cityValue];
    if (!cityId) {
        console.error('Не знайдено ID для міста:', cityValue);
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=a4ef13c8ee9b165674bca5827f832101`)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            console.log(data);
            cityName.textContent = data.name;
            tempElement.innerHTML = Math.round(data.main.temp - 273) + '&deg;';
            
            infoParagraphs[0].textContent = `Хмарність: ${data.weather[0]['description']}`;
            infoParagraphs[1].textContent = `Вітер: ${data.wind.speed} м/с`;
            infoParagraphs[2].textContent = `Вологість: ${data.main.humidity}%`;
            
            imgIco.src = `https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png`;
            imgIco.alt = data.weather[0]['description'];

            showWeatherDetails();
        })
        .catch(function (error) {
            console.error('Помилка при отриманні погоди:', error);
        });
}

select.onchange = function() {
    fetchWeather(this.value);
};

for (const city in citiesId) {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    select.appendChild(option);
}

fetchWeather('Kyiv');