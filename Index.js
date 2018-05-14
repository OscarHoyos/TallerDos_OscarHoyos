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

    MongoClient.connect('mongodb://localhost:27017', function (err, client) {
        if (err) throw err;
    
        db = client.db('productoR');
    
        app.listen(3000);
    });
    
 
app.get("/",(req, res) =>{

    
    var razerproductos = db.collection('razerproductos').find();

    razerproductos.toArray((err, result) => {
       console.log(razerproductos);
        res.render("index", {
            razerproductos : result
        })
    });
});

app.get("/razerproductos/:nombre", (req, res) => {
    console.log("hola");
    db.Collection('razerproductos').find (
        {
            nombre: req.params.nombre
        }
    ).toArray((err, result) => {
        console.log(result[0]);
        res.render('razerproductos', {
            productoR: result[0]
        });
    });
});


