# F28WP-Lab1
week 1-recreared website (Wanderlust Travel)
week 2- Changed properties in CSS. 
imported google fonts and applied to the body and header.
 * Made the header sticky.
 * style.css changed for CTA section
 * completed  all  3 tasks from the task page of travel agency.
 * Dispalyed two pictures per row for "Our Service Container".
week 3-
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
