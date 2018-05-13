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
    
        db = client.db('local');
    
        app.listen(3000);
    });
    
 
app.get("/",(req, res) =>{

    
    var RazerProductos = db.collection('RazerProductos').find();

    RazerProductos.toArray((err, result) => {
       // console.log(RazerProductos);
        res.render("Index", {
            RazerProductos : result
        })
    });
});

app.get("/RazerProductos/:Nombre", (req, res) => {
    console.log("hola");
    db.collection('RazerProductos').find (
        {
            Nombre: req.params.Nombre
        }
    ).toArray((err, result) => {
        console.log(result[0]);
        res.render('Index', {
            local: result[0]
        });
    });
});


