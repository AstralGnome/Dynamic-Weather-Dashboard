//WHEN the user clicks the search button

$("#search-button").on("click", setText);

var locationArray = []

function setText(event) {
  event.preventDefault();
  
  var textArea = $("#city");
  
  var textAreaValue = textArea.val();
  
  var storageKey = textArea.attr("id");
  
  localStorage.setItem(storageKey, JSON.stringify(textAreaValue));
  
  
  
  locationArray.unshift(textAreaValue)
  
  localStorage.setItem("cities", JSON.stringify(locationArray))
  
  var storedCities = JSON.parse(localStorage.getItem("cities")) || [] //not sure what this does on the end here
  
  console.log(storedCities)
  
  
  for (var i = 0; i < storedCities.length; i++) {
    
    $("#li-"+i).text(storedCities[i])
  }

  for (var i = 0; i < locationArray.length; i++) {
    
    $("#li-"+i).text(locationArray[i])
  }

}

function handleSearch() {
    var storedCity = JSON.parse(localStorage.getItem("city"));
    makeWeatherRequest(storedCity);
    console.log(storedCity)
  };

function makeWeatherRequest(cityName) {
  //NEXT, make the request to the URL with JQuery ajax
      //NEXT, we need to build the URL for the first API request
      
      //NEXT, make the request to the URL with JQuery ajax
      
      // finish rendering data to HTML
  
      // var cityName = localStorage.getItem(storageKey)
  var queryURL =
  `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=2aea25a2ba73c351a3ca2212a808cc72`;
  
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // Printing the entire object to console
    console.log(response.main.temp);
    console.log(response);
    
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    
    //NEXT, make the request to the URL with JQuery ajax
    var forecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=2aea25a2ba73c351a3ca2212a808cc72`
    $.ajax(forecastURL).then(function (forecastResponse) {
      console.log(forecastResponse)
      
      var uv = forecastResponse.current.uvi;
      console.log(uv)
      
      //START rendering data to the HTML. How would I accomplish this with back-ticks?
      
      $("#main-city").text(response.name)
      $("#main-temp").text("Temperature: " + response.main.temp + " °F")
      $("#main-hum").text("Humidity: " + response.main.humidity + "%")
      $("#main-wind").text("Wind speed: " + response.wind.speed + " mph")
      $("#main-uv").text("UV index: " + uv)
      
      //THEN get the lat and lng out of the "response" object
      //NEXT call "makeOneCallRequest(lat, lng)" and pass in the lat and lng
    });
  }); 
}

// var cityName = $("#city-input").text()
// console.log(cityName)
//pseudo code the HTML
handleSearch();