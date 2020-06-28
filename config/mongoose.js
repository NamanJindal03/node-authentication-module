const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/auth-module');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting DB'));

db.once('open', function(){
    console.log('connected to database');
})

module.exports = db;