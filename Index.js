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

    if (req.query.precio){
        console.log(req.query.precio);

        razerproductos.filter({precio : {
            $gte: parseFloat(req.query.precio[0]),
            $lte: parseFloat(req.query.precio[1])
        }
         });
    }

    if (req.query.tipo) 
    razerproductos.filter({
             tipo: req.query.tipo
         });

         if (req.query.color) 
         razerproductos.filter({color : req.query.color});

         

    razerproductos.toArray((err, result) => {


       console.log("hi server");
        res.render("index", {
            razerproductos : result
        })
    });
});

app.get("/razerproductos/:nombre", (req, res) => {
    console.log("hola");
    db.collection('razerproductos').find (
        {
            nombre: req.params.nombre
        }
    ).toArray((err, result) => {
        console.log(result[0]);
        res.render('producto', {
            productoR: result[0]
        });
    });
});




