# Animaps

This project was created using React, Node, Express, Knex, ReactLeaflet, Tachyons, and PostgreSQL. Deployed on gh Pages and Render. 

### Idea and Functionality

In addition to exploring the Map, users can use the searchBox to search for cities (change the map's position) or animals (filter the markers shown on the map). Clicking on a marker opens a pop-up with the name of the spot and the option to see more information about it. If a user wants to contribute to the database and add a marker to the map, they can do so by filling out the form in the section Add Spot. 

Want to test it?

1. Explore the functionality in the homepage (map, search bar, markers)
2. Click on Add a spot, fill in the form and click Send. 
3. Go back to the homepage, you will see your spot added to the map. 

### Lessons Learned

* How to build and deploy a full-stack application using React, Node and PSQL. 
* How to use ReactLeaflet to integrate OpenStreetMaps. 
* How to use GET and POST HTTP requests in conjunction to insert and retrieve data from a database.
* How to work with ChatGPT.

### Room for Improvement

At the moment, users cannot upload images, because I haven't figured out how to uploead them to the database. This needs to be solved. Then, besides better styling, the app should have Register and sign-in functions, an Edit feature (using PUT method) to update information about a spot, and it would be nice, if the app could automatically identify a new user's location and render the map accordingly. 
