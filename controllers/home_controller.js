module.exports.home = (req, res) =>{
    res.render('home.ejs',{
        'title': 'Home'
    });
}