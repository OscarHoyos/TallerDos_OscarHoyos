const express = require ("express"),
        consolidate = require ("consolidate"),
        handlebars = require ("handlebars"),
        MongoClient = require ("mongodb").MongoClient
        ;
    var app = express(),
    db;

    app.engine("hbs", consolidate.handlebars);

    app.set('views', './views');
    app.set('view engine', 'hbs');

    app.use(express.static('public'));

    
 
app.get("/",(req, res) =>{

    
    res.send("algo");
});
app.listen(3000);

