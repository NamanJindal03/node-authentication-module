module.exports.setFlash = (req, res, next)=>{
    res.locals.flash = {
        'success': req.flash('success'),
        'error2': req.flash('error')
    }
    next();
}


// module.exports.setErrors = (req, res, next)=>{
//     console.log("in here" + req.temporary);
//     if(req.temporary){
//         res.locals.newFields = {
//             'name': req.temporary.name,
//             'email': req.tempory.email
//         }
//         next();
//     }else{
//         next();
//     }
    
// }