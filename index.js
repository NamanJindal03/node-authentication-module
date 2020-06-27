const express = require('express');
const app = express();
const path = require("path");
const db = require("./config/mongoose");
const port = 8002;
app.use(express.urlencoded());
//app.use(express.static('./views'));
app.use(express.static('./assets'));

app.set("view engine", "ejs");
app.set('views', './views');
app.use('/', require('./routes/index.js'));

app.listen(port, (err)=>{
    if(err){
        console.log(`There is an error: ${err}`);
        return;
    }
    console.log(`The server is running on port: ${port}`);
})