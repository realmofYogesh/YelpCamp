
<!-- PROJECT LOGO -->
<!-- <br /> -->
<!-- <p align="center">
  <a href="https://github.com/iRONiCBAT7/YelpCamp">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>
 -->
  <h2  align="center" >YelpCamp</h2>

  <p align="center">
    Discover, Create and Review amazing places!   </p>
<!--     <br /> -->
<!--     <a href="https://github.com/your_username/repo_name"><strong>Explore the docs »</strong></a> -->
<!--     <br /> -->
<!--     · -->
<!--     <a href="https://github.com/your_username/repo_name/issues">Report Bug</a> -->
<!--     · -->
<!--     <a href="https://github.com/your_username/repo_name/issues">Request Feature</a> -->

  
  
<!--     <h1   align="center">  <a  href="https://campyelp.cyclic.app" target="_blank"> View Demo  » </a> </h1> -->
  
  # The demo link isn't working  

  - Previously I hosted it on cyclic.com but this service is not availabe anymore.
  - Demo link expired https://campyelp.cyclic.app
  - Though locally it is runnable with some configuration.


<!-- TOC is ceated using https://luciopaiva.com/markdown-toc/ -->

<!-- ## Table of contents
- [About The Project](#about-the-project)
- [Technology Used](#technology-used)
  - [API used](#api-used)
- [How to Use it](#how-to-use-it)
- [Features](#features)
  - [Core Features](#core-features)
  - [Functionalities features](#functionalities-features)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Steps:](#steps)
- [Credits](#credits) -->


## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

- YelpCamp is a dynamic __full-stack__ web application that allows users to create, discover and review places. 
- It provides a platform for camping enthusiasts to share their experiences, explore new destinations.
- Users can explore detailed place listings, __read, write and delete__ reviews.
- And even __upload images__ to enhance their camping experiences.
- __Interactive Maps:__ places are displayed on maps for easy visualization and exploration.
- This **project is a part of Colt Steele's web dev bootcamp course on udemy**.
- Deployed using <a href="https://www.cyclic.sh/" target="_blank"> Cyclic</a> (Cyclic is not in service)

<br/>

## Technology Used


| __Frontend__                         |             | | __Backend__                          |             |
|-----------------------------------|-------------|- |---------------------------------|-------------|
| Technology                        | Feature     | | Technology                        | Feature     |
|----                                |--           |- |----                              |--           |
| HTML5                             | Markup language | | NodeJS                            | Runtime environment |
| CSS3                              | Styling         | | NoSQL databases (MongoDB)         | Database |
| JavaScript (ES6)                  | Programming language | |ExpressJS                         | Web application framework |
| Bootstrap 4 and 5                 | CSS framework    | |EJS Templating                    | Templating engine |
|                                   |                 | | Mongoose (to connect with MongoDB)| Object Data Modeling (ODM) |

<bt/>

<!-- 
| Frontend                          | Backend                                 |
|-----------------------------------|-----------------------------------------|
| HTML5                             | NodeJS                                  |
| CSS3                              | NoSQL databases (MongoDB)               |
| JavaScript (ES6)                  | ExpressJS                               |
|  Bootstrap 4 and 5                | EJS Templating                          |
|                                   | Mongoose (ODM to connect with MongoDB)      | -->





<!-- 


#### Frontend
- HTML5
- CSS3
- JavaScript (ES6)
- Asynchronous JavaScript (Promises, async/await, etc.)
- Bootstrap 4 and 5

#### Backend
- NodeJS
- NoSQL databases (MongoDB)
- ExpressJS (to create server)
- EJS Templating 
- Mongoose (to connect with mongoDB)

 -->

 

### API used 

- **Image Upload** and Storage using <a href="https://cloudinary.com/" target="_blank"> Cloudinary</a>
- **Maps, Geocoding, geoJSON** using <a href="https://www.mapbox.com/" target="_blank"> MapBox</a>


<br/>

## How to Use it

- Create an account or log in to access the full functionality of the application.
- Explore places, read reviews.
- Add new places, leave reviews (contribute to the community).
- Edit or delete places and reviews you have created.

<br/>

## Features

### Core Features
- __RESTful__ (based on __REST__ architecture)
- Cookies & __Sessions__
- __Cloud__ MongoDB Atlas Databases
- Handles Common Security Issues (__Mongo Injection__, XSS, etc.)
- __Authentication__ ( using Passport.js )

### Functionalities features
- In order to review or create a place, you __must have an account__.
- __User Registration and Authentication:__ Users can create accounts, log in, and securely access their profiles.
- **place Management:** Users can add new places, edit existing ones, and delete places they have created.
- __Reviews and Ratings:__ Users can leave reviews and ratings for places, helping others make informed decisions.
- __Interactive Maps:__ places are displayed on maps for easy visualization and exploration.
- __Image Upload and Storage:__ Users can upload images of places to enhance their listings.
- __Responsive Design:__ The application is fully responsive and optimized for a seamless experience across devices.




<br/> 


## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/download)
- [MongoDB](https://www.mongodb.com/docs/manual/administration/install-community/)

<br/>

### Steps:

1. Clone the repository: `git clone <repository-url>` 
2. Extract and rename the folder to YelpCamp (if folder's name changed)
3. Navigate to the project directory: `cd YelpCamp` 
4. Install dependencies: `npm install`
5. To use Local Database » Update/Seed the database: 
  - navigate to  `cd YelpCamp/Seeds` then run `npm index.js`
6. #### Configure environment variables <br/>
  -  Create a .env file in the root directory <br/>
  -  Add the following variables:
```
NODE_ENV=development
DB_URL=<your_mongodb_uri>
MAPBOX_TOKEN=<your_mapbox_api_key>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_KEY=<your_cloudinary_api_key>
CLOUDINARY_SECRET=<your_cloudinary_api_secret>  
```
- Replace the values of above keys with your own values.
#### NOTE: 
- If You using the local MongoDB DataBase 
- then only you have to add in .env file is with
-  `NODE_ENV=development`  and `MAPBOX_TOKEN=<your_mapbox_api_key>`

#### Now Start the server  ...

7. Start the server: `npm start` or `npm index.js` (at root directory ``YelpCamp/`` | maybe this directory name change when you extract the zip folder)
8. Open your browser and visit: `http://localhost:3000`

<bt/> <br/>

## Credits

- This project created as part of a Udemy [course](https://www.udemy.com/the-web-developer-bootcamp/learn/v4/overview) final project.
- Instructor  » &nbsp; [Colt](https://github.com/Colt) 



