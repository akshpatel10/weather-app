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
        // document.querySelector(".wind-container").innerHTML = "<img src=\"wind.svg\" width=\"20px\" height=\"20px\">" +speed + "km/hr";
        document.querySelector(".wind").innerHTML = +speed + "km/hr";
        document.querySelector(".humidity").innerHTML = +humidity + "%";
        // document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+ description+"')"
        function myFunction(x) {
            if (x.matches) { // If media query matches
              document.body.style.backgroundImage = "url('https://source.unsplash.com/640x1137/?"+ description+"')"
            } else {
                document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+ description+"')"
            }
          }
          
          var x = window.matchMedia("(max-width: 500px)")
          myFunction(x) // Call listener function at run time
          x.addListener(myFunction) // Attach listener function on state changes
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);    
    } 
};

let geoCode = {
    reverseGeoCode: function(latitude, longitude){
        var api_key = 'c9ef353fbdb14967a4285a75c7cf61f8';
        var query = latitude + ',' + longitude;

        // forward geocoding example (address to coordinate)
        // var query = 'Philipsbornstr. 2, 30165 Hannover, Germany';
        // note: query needs to be URI encoded (see below)

        var api_url = 'https://api.opencagedata.com/geocode/v1/json'

        var request_url = api_url
            + '?'
            + 'key=' + api_key
            + '&q=' + encodeURIComponent(query)
            + '&pretty=1'
            + '&no_annotations=1';

        // see full list of required and optional parameters:
        // https://opencagedata.com/api#forward

        var request = new XMLHttpRequest();
        request.open('GET', request_url, true);

        request.onload = function() {
            // see full list of possible response codes:
            // https://opencagedata.com/api#codes

            if (request.status === 200){
            // Success!
            var data = JSON.parse(request.responseText);
            weather.fetchWeather(data.results[0].components.city);
            } else if (request.status <= 500){
            // We reached our target server, but it returned an error

            console.log("unable to geocode! Response code: " + request.status);
            var data = JSON.parse(request.responseText);
            console.log('error msg: ' + data.status.message);
            } else {
            console.log("server error");
            }
        };

        request.onerror = function() {
            // There was a connection error of some sort
            console.log("unable to connect to server");
        };

        request.send();  // make the request
    },

    getLocation: function(){
        function success(data){
            geoCode.reverseGeoCode(data.coords.latitude, data.coords.longitude);
            
        }
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(success, console.error);
        }
        else{
            weather.fetchWeather("Los Angeles");
        }
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



geoCode.getLocation();
