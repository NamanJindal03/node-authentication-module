const User = require('../models/user');
module.exports.signIn = (req,res) => res.render('user_sign_in.ejs');
module.exports.signUp = (req,res) => res.render('user_sign_up.ejs');

module.exports.create = (req,res) => {
    if(req.body.password != req.body.confirm_password){

        console.log("Password do not match");
        /* Important -  Set Flash in here for password dont match */
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){

        if(err){ console.log("Error Finding user in DB"); return res.redirect('back');}

        if(!user){
            User.create(req.body, function(err, user){
                if(err){ console.log("Error in creating user"); return res.redirect('back');}

                return res.redirect('/users/sign-in');
            })
        }
        else{
            console.log('Email already present');
            return res.redirect('back');
        }
    })

}

module.exports.createSession = (req, res) => {
    console.log("in create");
    return res.redirect('/');
}