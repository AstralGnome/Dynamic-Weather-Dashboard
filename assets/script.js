//WHEN the user clicks the search button

function handleSearch(){
    //THEN I get the value entered into the search input

    makeWeatherRequest(search)

    }

function makeWeatherRequest(search) {
    //NEXT, make the request to the URL with JQuery ajax
    $.ajax(queryURL).then(function (response){
        
        //START rendering data to the HTML
        
        //THEN get the lat and lng out of the "response" object

        //NEXT call "makeOneCallRequest(lat, lng)" and pass in the lat and lng

    });
}

function makeOneCallRequest( lat, lng ) {

    $.ajax(queryURL).then(function (response){
        
        
        
    }); 
}
