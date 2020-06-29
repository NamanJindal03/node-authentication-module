const express = require('express');
const app = express();
const path = require("path");
const db = require("./config/mongoose");
const port = 8002;
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
//Requiring Passport and its extensions
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
//require('dotenv').config();
//console.log(process.env.API_KEY);
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const customMWare=require('./config/middleware');

app.use(express.urlencoded());
//app.use(express.static('./views'));
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./assets'));
app.use(cookieParser());

//For express layouts
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set("view engine", "ejs");
app.set('views', './views');

//app.use(express.bodyParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: (1000*60*100) },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            if(err){
                console.log('the error is ' + err);  
            }
            else{
                console.log('connected succesfully');
            }
        }
    )
  }))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.use('/', require('./routes/index.js'));

app.listen(port, (err)=>{
    if(err){
        console.log(`There is an error: ${err}`);
        return;
    }
    console.log(`The server is running on port: ${port}`);
})