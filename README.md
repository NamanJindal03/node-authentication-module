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
# Features 