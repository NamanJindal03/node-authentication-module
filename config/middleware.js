module.exports.setFlash = (req, res, next)=>{
    res.locals.flash = {
        'success': req.flash('success'),
        'error2': req.flash('error')
        
    }
    next();
}