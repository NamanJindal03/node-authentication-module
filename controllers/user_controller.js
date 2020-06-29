const User = require('../models/user');

//renders the signin page
module.exports.signIn = (req,res) => {
    console.log()
    if(req.isAuthenticated()){
        res.redirect('/');
    }
    res.render('user_sign_in.ejs');
}

//renders the sign up page
module.exports.signUp = (req,res) => {
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    //console.log(req.temporary);
    res.render('user_sign_up.ejs');
}

//called when user clicks on sign up 
module.exports.create = (req,res) => {
    //destucts the req.body
    const{name, email, password, confirm_password} = req.body;
    //console.log(name, email, password, confirm_password);

    //if any of the fields is not defined redirects back
    if(!password || !email || !name || !confirm_password){
        console.log("Please fill in all fields");
        return res.redirect('/users/sign-up');
    }

    //if password and confirm password dont match redirects back
    if(password != confirm_password){

        console.log("Password do not match");
        req.flash('error', 'Passwords Do Not Match');
        return res.redirect('back');
    }

    //Tries to find the user
    User.findOne({email: req.body.email}, function(err, user){

        if(err){ console.log("Error Finding user in DB"); return res.redirect('back');}

        //if no user found we create a new user with the credentials given
        if(!user){
            User.create({name,email,encry_password:"temp"}, function(err, user){
                if(err){ console.log("Error in creating user"); return res.redirect('back');}
                //console.log(user);
                user.password = password;
                user.save();
                req.flash('success', 'Succesfully Signed Up');
                return res.redirect('/users/sign-in');
            })
        }
        //if user is already present then we return back
        else{
            console.log('Email already present');
            req.flash('error', 'Email already present');
            return res.redirect('back');
        }
    })

}

//called upon sign in to create session
module.exports.createSession = (req, res) => {
    return res.redirect('/');
}

//called when signout is clicked 
module.exports.signOut = (req,res) =>{
    //terminates the session
    req.logout();
    return res.redirect('/users/sign-in');
}

//renders the change password page
module.exports.updatePassword = (req,res) => {
    return res.render('pass.ejs');
}

//called when change password is hit
module.exports.changePassword = (req,res) =>{
    
    //if new password doesnt matches with new confirm password then we return
    if(req.body.new_password != req.body.confirm_password){

        console.log("New Password do not match");
        req.flash('error', 'New Password do not match');
        return res.redirect('back');
    }
    
    //else we try to find the user
    User.findById(req.user._id, function(err, user){

        if(err){ console.log("Error Finding user in DB"); return res.redirect('back');}

        //if the current password provided by user does not match with db then return 
        if(!user.authenticate(req.body.password)){
            console.log("wrong password");
            req.flash('error', 'wrong password');
            return res.redirect('back');
        }
        //we change password
        else{
            user.password = req.body.new_password;
            user.save();
            req.flash('success', 'Password Succesfully Changed');
            return res.redirect('/');
        }
    })
    // User.findByIdAndUpdate(req.user._id, {password: req.body.new_password}, function(err){
    //     if(err){ console.log("Error Finding and updating"); return res.redirect('back');};
    //     //put flash success message for password changed succesfully
    //     console.log('in find and update success');
    //     return res.redirect('/');
    // })
}