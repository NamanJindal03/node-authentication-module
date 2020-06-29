# About
A basic authentication system 
Tech Stack used: HTML, CSS, JS, Node.js, Express.js, Passport.js

# How to Use
1. Clone this project
2. Install node and mongoose
3. Go to console.developers.google.com 
    create a new project in there 
    put the name as nodejs-authentication
    select that project 
    Create OAuth Client ID and client secret
    Set the Authorized Javascript origins as 
    ```
    http://localhost:8002
    ```
    Set Authorized redirect URLs
    ```
    http://localhost:8002/users/auth/google/callback
    ```
4. edit .env_sample file and put in your google client id and google client secret
5. Change .env_sample name to .env
6. Enter these commands
```
npm install
npm start
```
7. Your project is ready

# Features 
1. Sign up and Sign in functionality both Manual and Google OAuth using passport 
2. Display of Notifications using Flash and Noty
3. Change Password if sign up manually

# Directory Structure 
This Application follows MVC Architecture
1. Assests - It has folders CSS & JS - all css and front end js files goes in here
2. Config - Containes configuration files for database(mongoose), passport(Oauth & manual)
3. Controllers - Core logic(contains functions and renders views)
4. models - schema for databases are defined in here
5. routes - contains all routes defined in the application
6. Views - has all the frontend files defined in ejs 

