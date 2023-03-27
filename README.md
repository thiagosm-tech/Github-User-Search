## Github User Search
A web application developed with Angular framework to search Github users and view their details.

## Features
    • Search Github users by their username
    • View a list of users returned by the search
    • View details of a selected user

## Installation

### Using Docker Compose
    1. Clone the repository
    2. Navigate to the project root directory in your terminal/command prompt
    3. Run docker-compose up command to build and start the containers
    4. Wait for the containers to start and the application to be ready (this might take a few minutes)
    5. Navigate to http://localhost:8081/ to access the application

#### Without Docker
    1. Clone the repository
    2. Install dependencies using npm install
    3. Run the application using ng serve
    4. Navigate to http://localhost:4200/ to access the application

##### Usage
    1. Enter a Github username in the search box
    2. Click the "Search" button or press "Enter"
    3. A list of Github users with matching usernames will be displayed
    4. Click on a user to view their details

###### APIs
This application uses Github's public search API to search for users by their username. 
You can find more information about Github's API at https://docs.github.com/en/rest.