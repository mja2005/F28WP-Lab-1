# F28WP-Lab1
week 1-recreared website (Wanderlust Travel)
week 2- Changed properties in CSS. 
imported google fonts and applied to the body and header.
 * Made the header sticky.
 * style.css changed for CTA section
 * completed  all  3 tasks from the task page of travel agency.
 * Dispalyed two pictures per row for "Our Service Container".


*week 3-
Added an Image carousel slider for the banner in index.html which changes the images within the time set.
*The slider uses the images download from Canva.
* In Javascript
* Function is created for changing the images.DOM is used to get the source of the images used in the html document.
* COndition are set . If the images is less than the range of the images,change it to next image.
* if it reaches the end reset it to  show the first image.
* time is set to changes to the next image.
* Everytime the pageloads the slider starts from the beginning.
* In Css
* Proived radius to the image.
* Added animation which transforms from one image to another with the given time limit.
Creating form.html
*in the <body> tag form is created using the <form> tag .
*The form has username,email,password and password-valid .Each of these inputs have id's that is used to get their value using DOM and a class="error" which is used to show the error if any input dosent match the condition. it also has a Submit button.
*In Javascript
*get all the element from the Form using document.getElementById()
* form.addEventListener activates when the button Submit is clicked. If the form is empty it prevent the form from reloading and only submits if all the input are valid.
* InputValid() function has the condition for validity of all the inputs.
* all the input has two condition: if the input is valid call setSuccess () function else call setError(element,message)function.
* setError= (element,message) function is called when the input is invalid .It print an error message,adds the class .error and removes the class .success.
* setSuccess= (element) function is called when the input is valid .It adds the class .sucess and removes the class .error.
* If any of the input is invalid the input box will become red and if  the input is correct the box will change to green.
* The the submit button will only work when all the input box are green.


*Week 4- 
* index.html file includes the basic layout of the Weather Finder , css.css file ans the app.js file.
* css.css file contains the syling of the website.
* app.js -
  ** Javascript code added  to get the weather,temperature and windseepd of a given city.
  ** getting the API code  from the OpenWeatherMap 
  ** Added a function to the button which on click will send an XML request to the server , get the link with the city input, API key and converting the temp to celcius.
  ** Parsing the data from the JSON file.
  ** renderHtml function takes the data from the Json files and the city name as the arguments. Gets the required data ,stores it in variables and insert it in the Html.
  ** Error condition checked
  • HTTP Status Code Error- when ourRequest.Status is not between 200 and 400 
  • API-Specific Error - when the data.cod is not equal to  200 
  • Network Error - ourRequest.onerror  runs a function  when we have network error
  * Run the html page on the browser .On entering a city name the city name,weather,temp in C and windspped in m/s is displayed.
  * write another city name and the information will be displayed below speration them with a horizontal line 

* Week 5
*  installed and loaded express for the generating HTML and use other inbuild modules.
*  Created a database in mysql.Created a table "USERS" ,containing id,name,email and passwords.
* Create index.js. Set up Express to Use Handlebars as templating engine .Use dotenv to manage database credentials.
* create a folder routes which containd auth.js and pages.js to implement routes for  /register, /login,/profile and /logout.
* Create views folder.It contains all the .hbs files of resister,login,logout,profile pages.
* Use bcrypt to hash ans salt the  passwords before storing them in the database.
* Create controller folder which performs the function specific to the pages ,send response and renders it on the pages.
* ADDITIONAL TASK
* creating a isLoggedIn middleware function which  uses JWT (JSON Web Tokens) for authentication.
* VIDEO ADDED IN WEEK  5 FOLDER
* after the authentication tokens are created and display the Mysql data of user who logged in .
