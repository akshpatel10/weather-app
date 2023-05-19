let weather = {
    apikey: "e88c429a5f4e8bce8fee211955f8d9b3",
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=metric&appid=" + this.apikey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        document.querySelector('.city').innerHTML = "Weather in " + name;
        document.querySelector('.temp').innerHTML = temp + "°C";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon +".png";
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".humidity").innerHTML = humidity;
        document.querySelector(".wind").innerHTML = "Wind speed: " +speed + "km/hr";
        document.querySelector(".humidity").innerHTML = "Humidity: " +humidity + "%";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+ name+"')"
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);    
    } 
};



document.querySelector(".search button").addEventListener('click', function(){
    weather.search();
});

document.querySelector(".search-bar").addEventListener('keyup', function(event){
    if(event.key == 'Enter'){
        weather.search();
    }
});


onload(weather.fetchWeather("Seattle"));