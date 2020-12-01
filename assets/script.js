//WHEN the user clicks the search button

$("#search-button").on("click", setText);
$(".list-group-item").on("click", function(){

  makeWeatherRequest(this.innerHTML)
});

var locationArray = JSON.parse(localStorage.getItem("cities")) || []

function setText(event) {
  event.preventDefault();
  
  var textArea = $("#city");
  var textAreaValue = textArea.val();

  // if (locationArray.includes(textAreaValue)) return //this is broken

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
  
  for (var i = 0; i < storedCities.length; i++) {
    $("#li-"+i).text(storedCities[i].toUpperCase())
  }
  
  var storedCity = JSON.parse(localStorage.getItem("city"));
  makeWeatherRequest(storedCity);
  };

function makeWeatherRequest(cityName) {

  var queryURL =
  `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=2aea25a2ba73c351a3ca2212a808cc72`;
  
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // Printing the entire object to console
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

    $("#date-1").text("Date: " + moment().add(1, "days").format('MM/DD'));
    $("#icon-1").attr("src", "https://openweathermap.org/img/w/" + forecastResponse.daily[0].weather[0].icon + ".png")     
    $("#temp-1").text("High temp: " + forecastResponse.daily[0].temp.max + " °F")
    $("#hum-1").text("Humidity: " + forecastResponse.daily[0].humidity + "%")
 
    $("#date-2").text("Date: " + moment().add(2, "days").format('MM/DD'))
    $("#icon-2").attr("src", "https://openweathermap.org/img/w/" + forecastResponse.daily[1].weather[0].icon + ".png")     
    $("#temp-2").text("High temp: " + forecastResponse.daily[1].temp.max + " °F")
    $("#hum-2").text("Humidity: " + forecastResponse.daily[1].humidity + "%")
 
    $("#date-3").text("Date: " + moment().add(3, "days").format('MM/DD'))
    $("#icon-3").attr("src", "https://openweathermap.org/img/w/" + forecastResponse.daily[2].weather[0].icon + ".png")     
    $("#temp-3").text("High temp: " + forecastResponse.daily[2].temp.max + " °F")
    $("#hum-3").text("Humidity: " + forecastResponse.daily[2].humidity + "%")
 
    $("#date-4").text("Date: " + moment().add(4, "days").format('MM/DD'))
    $("#icon-4").attr("src", "https://openweathermap.org/img/w/" + forecastResponse.daily[3].weather[0].icon + ".png")     
    $("#temp-4").text("High temp: " + forecastResponse.daily[3].temp.max + " °F")
    $("#hum-4").text("Humidity: " + forecastResponse.daily[3].humidity + "%")
 
    $("#date-5").text("Date: " + moment().add(5, "days").format('MM/DD'))
    $("#icon-5").attr("src", "https://openweathermap.org/img/w/" + forecastResponse.daily[4].weather[0].icon + ".png")     
    $("#temp-5").text("High temp: " + forecastResponse.daily[4].temp.max + " °F")
    $("#hum-5").text("Humidity: " + forecastResponse.daily[4].humidity + "%")
 
    });
  }); 
}

handleSearch();