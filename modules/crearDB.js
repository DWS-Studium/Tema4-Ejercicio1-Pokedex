exports.crearDB = function(respuesta) {
    var conexion = require('./conexion.js');
    var mongo = require('mongodb');
    var MongoClient = mongo.MongoClient;
    var url = conexion.conexion();
    //Conectamos a la DB
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("pokedex");

        //Creamos la coleccion.

        dbo.createCollection("pokemon", function(err, res) {
            if (err) {
                throw err;
            }
            console.log("Colección creada!");
            db.close();
        });

        respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8 ' });
        respuesta.write('<!DOCTYPE html><html lang="es">' +
            '<head>' +
            '<meta charset="utf-8">' +
            '<title>Crear</title>' +
            '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">' +
            '<link href="http://fonts.googleapis.com/css?family=Amarante" rel="stylesheet" type="text/css">' +
            '</head>' +
            '<body>' +
            '<div class="container-fluid">' +
            '<div class="row">' +
            '<div class="col-12">' +
            '<nav class="nav">' +
            '<a class="nav-link" aria-current="page" href="/">Home</a>' +
            '<a class="nav-link active" href="/crear">Crear</a>' +
            '<a class="nav-link" href="/insertar">Insertar</a>' +
            '<a class="nav-link" href="/consultas">Consultas</a>' +
            '<a class="nav-link" href="/modificar">Modificar</a>' +
            '<a class="nav-link" href="/eliminar">Eliminar</a>' +
            '<a class="nav-link active" href="/eliminarTodo">Eliminar Todo</a>' +
            '</nav>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="container">' +
            '<div class="row">' +
            '<div class="col-12">' +
            '<h1 class="mt-5">BASE DE DATOS Y COLECION CREADA CORRECTAMENTE</h1>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</body>' +
            '</html>');
        return respuesta.end();
    });

}