
//assigning variable that get the id from html
var btn=document.getElementById("btn")
var cityInput=document.getElementById("cityInput")
var weatherInfo=document.getElementById("weather-info");
// API key from OpenWeatherMap 
var apiKey='b796172def36072a7d1fdef2aa0e5e0e';

//Button which on click will create a request and get the link containing the city and the apiKey
btn.addEventListener("click",function(){
    //get the value fromCityInput
    var city = cityInput.value;
    // Steps to follow if the user entered the city name 
    if (city) {
// create an XML request to interact to the server 
var ourRequest = new XMLHttpRequest();
//Gets the API link and also converts the temp in Kelvin to  Celcius using '&units=metric'
ourRequest.open('GET','https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apiKey+'&units=metric');
//Load the function when the request is succefully complete 
ourRequest.onload = function() {
    // checking if we are sucessfully connected to the server 
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
        // parse the JSON data from the response text
        var ourData = JSON.parse(ourRequest.responseText);
        //calling the renderHtml function 
        renderHTML(ourData,city);}
    else{
        //  error statement if not connected 
        console.log("We connected to the server, but it returned an error.");
    }
};
// function to check if there is error while making the request
ourRequest.onerror = function() {
    console.log("Connection error");
  };
  // Send the request to the server.
  ourRequest.send();
}
  else {
    // Alert the user if a name of the city is not entered 
    alert("Enter city name")
  }
});
//function to add the data from the JSON  to the DOM

function renderHTML(data,city){
    // when code =200 ;API is correct and procedes to get the data
    if (data.cod==200){
     //assigining variables to get the value from the JSON file.Get the  current weather,temp in celcius ,wind speed
    var weatherDescription = data.weather[0].description;
    var  mainTemperature = data.main.temp;
    var  windSpeed = data.wind.speed;
    // creating an Html string 
    var htmlString = "";
    // adding all the values to Html string 
    htmlString += "<p>" + "The weather of " + city + " is " + weatherDescription + ".</br> The temperature is " + mainTemperature + "°C with a wind speed of " + windSpeed + "m/s.</p>";
    //Insert the HTML into our weatherInfo container , just before the end of its content.The html contains the string and a horizontal line .
    weatherInfo.insertAdjacentHTML('beforeend', htmlString+ '<hr width =50% />');}
else{
    // error message for API error 
    alert("API error:"+ data.message);
}}

