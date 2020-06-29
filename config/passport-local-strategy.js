const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');

passport.use(new LocalStrategy({
  //by default express takes only username & password as field, to change the default value we have to do this. As in our form
  //we have email
  usernameField: 'email',
  //this pass req to callback allows us to give our callback another argument req so that we can assign value of noty
  passReqToCallback: true
},
  function(req, email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      
      if (err) { 
        req.flash('error', err);
        console.log("Error in finding user"); return done(err); 
      }
      if (!user) { 
        req.flash('error', 'Invalid Username/Password');
        console.log("incorrect username");return done(null, false); 
      }

      /*if (user._password != password ) {console.log("incorrect password"); return done(null, false); }
      we cannot just simply compare password like above
      as we are using virtuals we need to compare our normal password by converting it into the same hash, here comes the role of
      authenticate method of our user model*/
      if (!user.authenticate(password) ) {
        req.flash('error', 'Invalid Username/Password');
        console.log("incorrect password"); return done(null, false); 
      }
      req.flash('success', 'Succesfully Signed In');
      return done(null, user);
    });
  }
));

//Enncrypts and sets the id in the cookies
passport.serializeUser(function(user, done){
  done(null, user.id);
})

//After this step, the user is attached to the req.user object.
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
      if(err){
          console.log('error retriving the user');
          return done(err);
      }
      return done(null,user);
  })
});

//This checks whether the user is authenticated or not, if not redirects to sign in page
//This allows content to be visible to only authenticated users
passport.checkAuthenticatedUser = function(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  return res.redirect('/users/sign-in')
}

passport.setAuthenticatedUser = function(req, res, next){
  if(req.isAuthenticated()){
      //Through the deserializeUser we get it set into req.user, now we want the user info to be available to our view for that we 
      //set it into our locals
      res.locals.user = req.user;
  }
  next(); 
}
module.exports = passport;