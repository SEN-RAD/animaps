# Animaps

This project was created using React, Node, Express, Knex, ReactLeaflet, Tachyons, and PostgreSQL. Deployed on gh Pages and Render. 

### Idea and Functionality

Users can explore the Map or use the search input to search for cities (change the map's position) or animals (filter the markers shown on the map). Clicking on a marker opens a pop-up with the name of the spot and the option to see more information about it. Users can also contribute to the database and add their own markers to the map by filling out the form in the section Add Spot. 

### Lessons Learned

* How to build and deploy a full-stack application using React, Node and PSQL. 
* How to use ReactLeaflet to integrate OpenStreetMaps. 
* How to use GET and POST HTTP requests in conjunction to insert and retrieve data from a database.
* How to work with ChatGPT.

### Room for Improvement

* When dealing with a keyword that is obviously an animal name (e.g. dogs) but that is not in the database, the app should respond with a message saying that the animal is not in the database, instead of responding with a location on the map by that name.
* Users should and will be able to upload images, which will be displayed in the infoBox.
* Only registered users should be able to add spots, so register and sign-in functionality is needed. 
* User should be able to edit their spots and comment on others', so PUT endpoints are needed.
* The app could automatically identify a new user's location and set updatedStartLocation accordingly. 


