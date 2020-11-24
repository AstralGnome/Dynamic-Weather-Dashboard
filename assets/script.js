//WHEN the user clicks the search button

function handleSearch(){
    //THEN I get the value entered into the search input

    makeWeatherRequest(search)

}

function makeWeatherRequest(search) {
    
    //NEXT, make the request to the URL with JQuery ajax
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=2aea25a2ba73c351a3ca2212a808cc72";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Printing the entire object to console
        console.log(response);


    //NEXT, make the request to the URL with JQuery ajax
    
//     $.ajax(queryURL).then(function (response){
        
        //START rendering data to the HTML
        
        //THEN get the lat and lng out of the "response" object

        //NEXT call "makeOneCallRequest(lat, lng)" and pass in the lat and lng


    });
}
// function makeOneCallRequest(lat, lng) {

    //NEXT, we need to build the URL for the first API request

    //NEXT, make the request to the URL with JQuery ajax
//     $.ajax(queryURL).then(function (response){
        
        // finish rendering data to HTML
    
//     }); 
// }

//pseudo code the HTML