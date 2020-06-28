const User = require('../models/user');
module.exports.signIn = (req,res) => {
    if(req.isAuthenticated()){
        res.redirect('/');
    }
    res.render('user_sign_in.ejs');
}
module.exports.signUp = (req,res) => {
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    res.render('user_sign_up.ejs');
}
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
    return res.redirect('/');
}

module.exports.signOut = (req,res) =>{
    req.logout();
    return res.redirect('/users/sign-in');
}

module.exports.updatePassword = (req,res) => {
    return res.render('pass.ejs');
}

module.exports.changePassword = (req,res) =>{
    
    if(req.body.new_password != req.body.confirm_password){

        console.log("Password do not match");
        /* Important -  Set Flash in here for password dont match */
        return res.redirect('back');
    }
    if(req.body.password != req.user.password){
        console.log("wrong password");
        return res.redirect('back');
    }
    User.findByIdAndUpdate(req.user._id, {password: req.body.new_password}, function(err){
        if(err){ console.log("Error Finding and updating"); return res.redirect('back');};
        //put flash success message for password changed succesfully
        console.log('in find and update success');
        return res.redirect('/');
    })
}