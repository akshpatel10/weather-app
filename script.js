let weather = {
    apiKey: "OWM_API_KEY",
    fetchWeather: function (latitude, longitude) {
        fetch(
            "https://api.openweathermap.org/data/3.0/onecall?lat="
            + latitude
            + "&lon="
            + longitude
            + "&exclude=minutely&units=metric&appid="
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },

    fetchAqi: function (latitude, longitude) {
        fetch(
            "http://api.openweathermap.org/data/2.5/air_pollution?lat="
            + latitude
            + "&lon="
            + longitude
            + "&appid="
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayAQI(data));
    },

    displayAQI: function (data) {
        const aqidata = data;
        const { aqi } = aqidata.list[0].main;

        if (aqi == 1) {
            document.querySelector(".aqi").innerText = "Good";
        }
        else if (aqi == 2) {
            document.querySelector(".aqi").innerText = "Fair";
        }
        else if (aqi == 3) {
            document.querySelector(".aqi").innerText = "Moderate";
        }
        else if (aqi == 4) {
            document.querySelector(".aqi").innerText = "Poor";
        }
        else {
            document.querySelector(".aqi").innerText = "Very Poor";
        }
    },

    displayWeather: function (data) {
        const Onecall = data;
        console.log(Onecall);
        const { temp, feels_like, humidity, uvi, visibility, wind_speed, wind_deg } = data.current;
        const { id, description, icon } = data.current.weather[0];
        // const dt = Onecall.daily;
        // const date1 = data.daily[0].dt*100;
        // const date2 = data.daily[1].dt*100;
        // const date3 = data.daily[2].dt*100;
        // const date4 = data.daily[3].dt*100;
        // const date5 = data.daily[4].dt*100;
        // const date = new Date(date1, date2. date3, date4, date5);
        function formatDate(timestamp, format = 'DD/MM/YYYY') {
            // Assuming timestamp is in seconds, convert to milliseconds
            const date = new Date(timestamp * 1000);

            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();

            // Define the format patterns
            const formatPatterns = {
                'DD/MM/YYYY': `${day}/${month}/${year}`
                // Add more formats as needed
            };

            // Use the specified format or default to 'DD/MM/YYYY'
            return formatPatterns[format] || formatPatterns['DD/MM/YYYY'];
        }

        var arrow = document.querySelector(".arrow");

        // Main data
        fetch(`https://api.unsplash.com/photos/random?query=${encodeURIComponent(description)}&orientation=landscape&client_id=UNSPLASH_API_KEY`)
            .then(response => response.json())
            .then(data => {
                if (data.urls && data.urls.regular) {
                    document.body.style.backgroundImage = `url('${data.urls.regular}')`;
                }
            })
            .catch(error => console.error("Error fetching background image:", error));
        document.querySelector(".temp").innerText = Math.round(temp) + "°C";
        document.querySelector(".feel").innerText = Math.round(feels_like) + "°C";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".humid").innerText = humidity + "%";
        document.querySelector(".wind").innerText = Math.round(wind_speed) + "km/h";
        document.querySelector(".uvi").innerText = uvi;
        document.querySelector(".visibility").innerText = visibility / 1000 + "km";
        arrow.style.webkitTransform = 'rotate(' + wind_deg + 'deg)';


        // Hourly data
        for (let i = 0; i < 5; i++) {
            let hourlyTime = convertors.epochConvertor(data.hourly[i].dt);
            // Pad minutes with 0 if it's less than 10
            let minutes = hourlyTime.minutes < 10 ? '0' + hourlyTime.minutes : hourlyTime.minutes;

            document.querySelector(`.hourly-time${i + 1}`).innerHTML = `${hourlyTime.hours}:${minutes}`;
            document.querySelector(`.hourly-icon${i + 1}`).src = `https://openweathermap.org/img/wn/${data.hourly[i].weather[0].icon}.png`;
            document.querySelector(`.hourly-temp${i + 1}`).innerText = `${Math.round(data.hourly[i].temp)}°C`;
        }

        // Daily data
        for (let i = 0; i < 5; i++) {
            let dailyData = data.daily[i];

            document.querySelector(`.daily-date${i + 1}`).innerHTML = formatDate(dailyData.dt * 1000);
            document.querySelector(`.daily-temp-max${i + 1}`).innerHTML = `${Math.round(dailyData.temp.max)}°C`;
            document.querySelector(`.daily-temp-min${i + 1}`).innerHTML = `${Math.round(dailyData.temp.min)}°C`;
            document.querySelector(`.daily-icon${i + 1}`).src = `https://openweathermap.org/img/wn/${dailyData.weather[0].icon}.png`;
            document.querySelector(`.daily-description${i + 1}`).innerHTML = dailyData.weather[0].description;
            document.querySelector(`.daily-humid${i + 1}`).innerHTML = `${dailyData.humidity}%`;
            document.querySelector(`.daily-wind${i + 1}`).innerHTML = `${Math.round(dailyData.wind_speed)}km/h`;
            document.querySelector(`.daily-uvi${i + 1}`).innerHTML = Math.round(dailyData.uvi);
            document.querySelector(`.daily-summary${i + 1}`).innerHTML = dailyData.summary;
        }
    }

};

let convertors = {

    epochConvertor: function (dt) {
        var myDate = new Date(dt * 1000);
        var hours = myDate.getHours();
        var minutes = myDate.getMinutes();
        // return myDate;
        return { hours, minutes, myDate };
        // console.log(myDate.getMonth());
    },

    windSpeed: function (speed) {
        return speed * 3.6;
    },

    unitConvertor: function (c) {
        return (c * 9 / 5) + 32;
    }


};

let geocode = {

    fetchGeoCode: function (name) {
        fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + name + "&appid=OWM_API_KEY")
            .then((response) => response.json())
            .then((data) => this.geoCoding(data));
    },

    geoCoding: function (data) {
        weather.fetchWeather(data[0].lat, data[0].lon);
        weather.fetchAqi(data[0].lat, data[0].lon);
        console.log("geoCoding: ");
        console.log(data);

        const name = data[0].name;
        document.querySelector(".city").innerText = "Weather in " + name;
    },

    getLocation: function () {
        function sucess(data) {
            const lat = data.coords.latitude;
            const lon = data.coords.longitude;
            weather.fetchWeather(lat, lon);
            weather.fetchAqi(lat, lon);

            // Reverse geocode: coords → city name
            fetch(
                "https://api.openweathermap.org/geo/1.0/reverse?lat=" + lat
                + "&lon=" + lon
                + "&limit=1&appid=OWM_API_KEY"
            )
                .then((response) => response.json())
                .then((geoData) => {
                    if (geoData && geoData.length > 0) {
                        document.querySelector(".city").innerText = "Weather in " + geoData[0].name;
                    }
                });

            console.log(data);
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(sucess, console.error);
        }
        else {
            this.fetchGeoCode("sydney");
        }
    }
};

// Search button listener

document.querySelector(".search-btn").addEventListener("click", function () {
    geocode.fetchGeoCode(document.querySelector(".search-bar").value);
});

// Enter Key press listener
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        geocode.fetchGeoCode(document.querySelector(".search-bar").value);
    }
});

document.querySelector(".get-location-btn").addEventListener("click", function () {
    geocode.getLocation();
})

geocode.fetchGeoCode("sydney");




// https://api.openweathermap.org/data/3.0/onecall?lat=22.31&lon=73.15&exclude=minutely&units=metric&appid=OWM_API_KEY

// AirQ: https://api.openweathermap.org/data/2.5/air_pollution?lat=22.30&lon=73.18&appid=OWM_API_KEY

// Problems: time in hourly, city name