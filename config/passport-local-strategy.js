const passport = require('passport');
const LocalStrategy = require('passport-local');


passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
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