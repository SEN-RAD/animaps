# Animaps

This is a personal project and a work in progress.

### Idea and Functionality
It's an app for animal lovers to find and add spots for animal watching. 

* Users can explore the Map or use the search input to search for cities (change the map's position) or animals (filter the markers shown on the map).
* Clicking on a marker opens a pop-up with the name of the spot and the option to see more information about it.
* Users can also contribute to the database and add their own markers to the map by filling out the form in the section Add Spot. 

### Lessons Learned

* How to build and deploy a full-stack application using React, Node and PSQL (PgAdmin4) + Git, Railway, and Render.
* How to integrate maps using ReactLeaflet and OpenStreetMaps. 
* How to use GET and POST HTTP requests to insert and retrieve data from a database.
* How to use event handlers (e.g. onClick, onKeyPress ) to improve the users'experience.
* How to be self-reliant when facing challenges and in the debugging process.
* How to research solutions and work with ChatGPT.

### Room for Improvement

* When searching a keyword that is obviously an animal name (e.g. dogs) but that is not in the database, the app should respond with a message saying that it is not in the database, instead of responding with a location on the map with that name (yes, there are locations called "dogs").
* Users should and will be able to upload images, which will be displayed in the infoBox.
* Only registered users should be able to add spots, so register and sign-in functionality is needed. 
* User should be able to edit their spots and comment on others', so PUT endpoints are needed.
* The app could automatically identify a new user's location and set updatedStartLocation accordingly. 


