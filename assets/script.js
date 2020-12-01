//WHEN the user clicks the search button

$("#search-button").on("click", setText);
$(".list-group-item").on("click", function(){
  console.log(this.innerHTML)

  makeWeatherRequest(this.innerHTML)
});

var locationArray = JSON.parse(localStorage.getItem("cities")) || []

function setText(event) {
  event.preventDefault();
  
  var textArea = $("#city");
  var textAreaValue = textArea.val();
  if (locationArray.includes(textAreaValue)) return;

  var storageKey = textArea.attr("id");
  localStorage.setItem(storageKey, JSON.stringify(textAreaValue));
  
  makeWeatherRequest(textAreaValue)
  
  locationArray.unshift(textAreaValue)
  localStorage.setItem("cities", JSON.stringify(locationArray))
  
  for (var i = 0; i < locationArray.length; i++) {
    $("#li-"+i).text(locationArray[i].toUpperCase())
  }
} 

function handleSearch() {
  
  var storedCities = JSON.parse(localStorage.getItem("cities")) || []
  console.log(storedCities)
  
  for (var i = 0; i < storedCities.length; i++) {
    $("#li-"+i).text(storedCities[i])
  }
  
  var storedCity = JSON.parse(localStorage.getItem("city"));
  makeWeatherRequest(storedCity);
    console.log(storedCity)
  };

function makeWeatherRequest(cityName) {

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
      
      //START rendering data to the HTML.
      
      $("#main-city").text(response.name)
      $("#main-temp").text("Temperature: " + response.main.temp + " °F")
      $("#main-hum").text("Humidity: " + response.main.humidity + "%")
      $("#main-wind").text("Wind speed: " + response.wind.speed + " mph")
      $("#main-uv").text("UV index: " + uv)
      
      for (i = 0; i < uv; i++) {

        if (uv <= 2) {
          $("#main-uv").addClass("badge badge-success")
        }
        else if (uv < 8) {
          $("#main-uv").addClass("badge badge-warning")
      }
        else if (uv >= 8) {
          $("#main-uv").addClass("badge badge-danger")
      }
    }
  
    });
  }); 
}

// var cityName = $("#city-input").text()
// console.log(cityName)
//pseudo code the HTML
handleSearch();