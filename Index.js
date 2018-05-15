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

         app.get('/checkout', (req, res) => {
            res.render('checkout');
        });

    razerproductos.toArray((err, result) => {


       console.log("hi server");
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

app.get('/productosPorIds', (req, res) => {
    console.log(req.query.ids);
    var arreglo = req.query.ids.split(',');
    arreglo = arreglo.map(function(nombre) {
        return new ObjectID(nombre);
    });
    var prod = db.collection('razerproductos')
        .find({ _id: { $in: arreglo } })
        .toArray((err, result) => {
            res.send(result);
        });
});


