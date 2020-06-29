const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;

const crypto = require("crypto");
const User = require("../models/user");

const dotenv = require('dotenv');
dotenv.config();

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8002/users/auth/google/callback"
},
//if your accessToken expires you use the refresh token to get a new access token
    function(accessToken, refreshToken, profile, done){
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){ console.log("error in google passport strategy", err); return done(err); }

            console.log(profile);
            if(user){
                //if found then sign in it 
                return done(null, user);
            }else{
                //if not found then this is the first time he is visiting this website hence create a user in our db and then sign in
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    encry_password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){console.log("error in creating user through google passport strategy", err); return done(err);}
                    user.password = crypto.randomBytes(20).toString('hex');
                    user.save();
                    return done(null, user);
                })
            }
        })
    }
))

module.exports = passport;