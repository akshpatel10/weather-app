let weather = {
    apiKey: "API KEY",
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

        function formatDate(timestamp, format = 'DD/MM/YYYY') { 
            const date = new Date(timestamp * 1000);
        
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
        

            const formatPatterns = {
                'DD/MM/YYYY': `${day}/${month}/${year}`
                // Add more formats as needed
            };
        
         
            return formatPatterns[format] || formatPatterns['DD/MM/YYYY'];
        }

        var arrow = document.querySelector(".arrow");

 
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + description + "')"
        document.querySelector(".temp").innerText = Math.round(temp) + "°C";
        document.querySelector(".feel").innerText = Math.round(feels_like) + "°C";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".humid").innerText = humidity + "%";
        document.querySelector(".wind").innerText = Math.round(wind_speed) + "km/h";
        document.querySelector(".uvi").innerText = uvi;
        document.querySelector(".visibility").innerText = visibility / 1000 + "km";
        arrow.style.webkitTransform = 'rotate(' + wind_deg + 'deg)';



        document.querySelector(".hourly-time1").innerHTML = convertors.epochConvertor(Onecall.hourly[0].dt).hours + ":" + convertors.epochConvertor(Onecall.hourly[0].dt).minutes;
        document.querySelector(".hourly-icon1").src = "https://openweathermap.org/img/wn/" + data.hourly[0].weather[0].icon + ".png";
        document.querySelector(".hourly-temp1").innerText = Math.round(data.hourly[0].temp) + "°C";


        document.querySelector(".hourly-time2").innerHTML = convertors.epochConvertor(Onecall.hourly[1].dt).hours + ":" + convertors.epochConvertor(Onecall.hourly[1].dt).minutes;
        document.querySelector(".hourly-icon2").src = "https://openweathermap.org/img/wn/" + data.hourly[1].weather[0].icon + ".png";
        document.querySelector(".hourly-temp2").innerText = Math.round(data.hourly[1].temp) + "°C";

        document.querySelector(".hourly-time3").innerHTML = convertors.epochConvertor(Onecall.hourly[2].dt).hours + ":" + convertors.epochConvertor(Onecall.hourly[2].dt).minutes;
        document.querySelector(".hourly-icon3").src = "https://openweathermap.org/img/wn/" + data.hourly[2].weather[0].icon + ".png";
        document.querySelector(".hourly-temp3").innerText = Math.round(data.hourly[2].temp) + "°C";

        document.querySelector(".hourly-time4").innerHTML = convertors.epochConvertor(Onecall.hourly[3].dt).hours + ":" + convertors.epochConvertor(Onecall.hourly[3].dt).minutes;
        document.querySelector(".hourly-icon4").src = "https://openweathermap.org/img/wn/" + data.hourly[3].weather[0].icon + ".png";
        document.querySelector(".hourly-temp4").innerText = Math.round(data.hourly[3].temp) + "°C";

        document.querySelector(".hourly-time5").innerHTML = convertors.epochConvertor(Onecall.hourly[4].dt).hours + ":" + convertors.epochConvertor(Onecall.hourly[4].dt).minutes;
        document.querySelector(".hourly-icon5").src = "https://openweathermap.org/img/wn/" + data.hourly[4].weather[0].icon + ".png";
        document.querySelector(".hourly-temp5").innerText = Math.round(data.hourly[4].temp) + "°C";

        
        document.querySelector(".daily-date1").innerHTML = formatDate(data.daily[0].dt * 1000);
        document.querySelector(".daily-temp-max1").innerHTML = Math.round(data.daily[0].temp.max) + "°C";
        document.querySelector(".daily-temp-min1").innerHTML = Math.round(data.daily[0].temp.min) + "°C";
        document.querySelector(".daily-icon1").src = "https://openweathermap.org/img/wn/" + data.daily[0].weather[0].icon + ".png"
        document.querySelector(".daily-description1").innerHTML = data.daily[0].weather[0].description;
        document.querySelector(".daily-humid1").innerHTML = data.daily[0].humidity + "%";
        document.querySelector(".daily-wind1").innerHTML = Math.round(data.daily[0].wind_speed) + "km/h";
        document.querySelector(".daily-uvi1").innerHTML = Math.round(data.daily[0].uvi);
        document.querySelector(".daily-summary1").innerHTML = data.daily[0].summary;


       
        document.querySelector(".daily-temp-max2").innerHTML = Math.round(data.daily[1].temp.max) + "°C";
        document.querySelector(".daily-temp-min2").innerHTML = Math.round(data.daily[1].temp.min) + "°C";
        document.querySelector(".daily-icon2").src = "https://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + ".png"
        document.querySelector(".daily-description2").innerHTML = data.daily[1].weather[0].description;
        document.querySelector(".daily-humid2").innerHTML = data.daily[1].humidity + "%";
        document.querySelector(".daily-wind2").innerHTML = Math.round(data.daily[1].wind_speed) + "km/h";
        document.querySelector(".daily-uvi2").innerHTML = Math.round(data.daily[1].uvi);
        document.querySelector(".daily-summary2").innerHTML = data.daily[1].summary;


        document.querySelector(".daily-temp-max3").innerHTML = Math.round(data.daily[2].temp.max) + "°C";
        document.querySelector(".daily-temp-min3").innerHTML = Math.round(data.daily[2].temp.min) + "°C";
        document.querySelector(".daily-icon3").src = "https://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + ".png"
        document.querySelector(".daily-description3").innerHTML = data.daily[2].weather[0].description;
        document.querySelector(".daily-humid3").innerHTML = data.daily[2].humidity + "%";
        document.querySelector(".daily-wind3").innerHTML = Math.round(data.daily[2].wind_speed) + "km/h";
        document.querySelector(".daily-uvi3").innerHTML = Math.round(data.daily[2].uvi);
        document.querySelector(".daily-summary3").innerHTML = data.daily[2].summary;


        document.querySelector(".daily-temp-max4").innerHTML = Math.round(data.daily[3].temp.max) + "°C";
        document.querySelector(".daily-temp-min4").innerHTML = Math.round(data.daily[3].temp.min) + "°C";
        document.querySelector(".daily-icon4").src = "https://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + ".png"
        document.querySelector(".daily-description4").innerHTML = data.daily[3].weather[0].description;
        document.querySelector(".daily-humid4").innerHTML = data.daily[3].humidity + "%";
        document.querySelector(".daily-wind4").innerHTML = Math.round(data.daily[3].wind_speed) + "km/h";
        document.querySelector(".daily-uvi4").innerHTML = Math.round(data.daily[3].uvi);
        document.querySelector(".daily-summary4").innerHTML = data.daily[3].summary;


        document.querySelector(".daily-temp-max5").innerHTML = Math.round(data.daily[4].temp.max) + "°C";
        document.querySelector(".daily-temp-min5").innerHTML = Math.round(data.daily[4].temp.min) + "°C";
        document.querySelector(".daily-icon5").src = "https://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + ".png"
        document.querySelector(".daily-description5").innerHTML = data.daily[4].weather[0].description;
        document.querySelector(".daily-humid5").innerHTML = data.daily[4].humidity + "%";
        document.querySelector(".daily-wind5").innerHTML = Math.round(data.daily[4].wind_speed) + "km/h";
        document.querySelector(".daily-uvi5").innerHTML = Math.round(data.daily[4].uvi);
        document.querySelector(".daily-summary5").innerHTML = data.daily[4].summary;
    }

};

let convertors = {

    epochConvertor: function (dt) {
        var myDate = new Date(dt * 1000);
        var hours = myDate.getHours();
        var minutes = myDate.getMinutes();

        return { hours, minutes, myDate };

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
        fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + name + "&appid=API KEY")
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
            weather.fetchWeather(data.coords.latitude, data.coords.longitude);
            weather.fetchAqi(data.coords.latitude, data.coords.longitude);
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



document.querySelector(".search-btn").addEventListener("click", function () {
    geocode.fetchGeoCode(document.querySelector(".search-bar").value);
});


document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        geocode.fetchGeoCode(document.querySelector(".search-bar").value);
    }
});

document.querySelector(".get-location-btn").addEventListener("click", function () {
    geocode.getLocation();
})

geocode.fetchGeoCode("sydney");


// Problems: time in hourly, city name