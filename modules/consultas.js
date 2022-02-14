exports.consultas = function(code, respuesta) {
    var conexion = require('./conexion.js');
    var mongo = require('mongodb');
    var MongoClient = mongo.MongoClient;
    var url = conexion.conexion();
    //Conectamos a la DB
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("pokedex");
        if (code != null && isNaN(code) == false) {
            //Consulta 1- Seleccionar todos los Pokémon de tipo fuego ("Fire").
            if (code == 1) {
                var query = { type: { $in: ["Fire"] } };
                dbo.collection("pokemon").find(query).toArray(function(err, result) {
                    if (err) throw err;
                    //console.log(result);
                    db.close();
                    respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    let salida = "";
                    salida += '<!DOCTYPE html><html lang="es">' +
                        '<head>' +
                        '<meta charset="utf-8">' +
                        '<title>Consultas</title>' +
                        '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">' +
                        '<link href="http://fonts.googleapis.com/css?family=Amarante" rel="stylesheet" type="text/css">' +
                        '</head>' +
                        '<body>' +
                        '<div class="container-fluid">' +
                        '<div class="row">' +
                        '<div class="col-12">' +
                        '<nav class="nav">' +
                        '<a class="nav-link" aria-current="page" href="/">Home</a>' +
                        '<a class="nav-link" href="/crear">Crear</a>' +
                        '<a class="nav-link" href="/insertar">Insertar</a>' +
                        '<a class="nav-link active" href="/consultas">Consultas</a>' +
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
                        '<h1 class="mt-5">Consulta de pokemon de tipo fuego ("Fire").</h1>' +
                        '<table class="table">' +
                        '<tr><th>ID</th><th>Nombre</th><th>Tipo</th></tr>';
                    result.forEach(element => {
                        salida += '<tr><td>' + element.id + '</td><td>' + element.name.english + '</td><td>' + element.type + '</td></tr>';
                    });
                    salida += '</table>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</body>' +
                        '</html>';
                    respuesta.write(salida);
                    return respuesta.end();
                });

            }
            //Consulta 2- Seleccionar todos los Pokémon de la segunda generación (campo id entre 152 y 251 incluídos).
            else if (code == 2) {
                var query = { $and: [{ id: { $gt: 151 } }, { id: { $lt: 252 } }] };
                dbo.collection("pokemon").find(query).toArray(function(err, result) {
                    if (err) throw err;
                    //console.log(result);
                    db.close();
                    let salida = "";
                    respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8 ' });
                    salida = '<!DOCTYPE html><html lang="es">' +
                        '<head>' +
                        '<meta charset="utf-8">' +
                        '<title>Consultas</title>' +
                        '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">' +
                        '<link href="http://fonts.googleapis.com/css?family=Amarante" rel="stylesheet" type="text/css">' +
                        '</head>' +
                        '<body>' +
                        '<div class="container-fluid">' +
                        '<div class="row">' +
                        '<div class="col-12">' +
                        '<nav class="nav">' +
                        '<a class="nav-link" aria-current="page" href="/">Home</a>' +
                        '<a class="nav-link" href="/crear">Crear</a>' +
                        '<a class="nav-link" href="/insertar">Insertar</a>' +
                        '<a class="nav-link active" href="/consultas">Consultas</a>' +
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
                        '<h1 class="mt-5">Consulta de pokemon de la segunda generación (campo id entre 152 y 251 incluídos).</h1>' +
                        '<table class="table">' +
                        '<tr><th>ID</th><th>Nombre</th><th>Tipo</th></tr>';
                    result.forEach(element => {
                        salida += '<tr><td>' + element.id + '</td><td>' + element.name.english + '</td><td>' + element.type + '</td></tr>';
                    });
                    salida += '</table>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</body>' +
                        '</html>';
                    respuesta.write(salida);
                    console.log('Hola mundo');
                    return respuesta.end();
                });
            }
            //Consulta 3- Seleccionar todos los Pokémon cuya velocidad (campo "Speed") es 100.
            else if (code == 3) {
                var query = { "base.Speed": { $eq: 100 } };
                dbo.collection("pokemon").find(query).toArray(function(err, result) {
                    if (err) throw err;
                    //console.log(result);
                    db.close();
                    respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    let salida = "";
                    salida += '<!DOCTYPE html><html lang="es">' +
                        '<head>' +
                        '<meta charset="utf-8">' +
                        '<title>Consultas</title>' +
                        '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">' +
                        '<link href="http://fonts.googleapis.com/css?family=Amarante" rel="stylesheet" type="text/css">' +
                        '</head>' +
                        '<body>' +
                        '<div class="container-fluid">' +
                        '<div class="row">' +
                        '<div class="col-12">' +
                        '<nav class="nav">' +
                        '<a class="nav-link" aria-current="page" href="/">Home</a>' +
                        '<a class="nav-link" href="/crear">Crear</a>' +
                        '<a class="nav-link" href="/insertar">Insertar</a>' +
                        '<a class="nav-link active" href="/consultas">Consultas</a>' +
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
                        '<h1 class="mt-5">Consulta de pokemon cuya velocidad (campo "Speed") es 100.</h1>' +
                        '<table class="table">' +
                        '<tr><th>ID</th><th>Nombre</th><th>Tipo</th></tr>';
                    result.forEach(element => {
                        salida += '<tr><td>' + element.id + '</td><td>' + element.name.english + '</td><td>' + element.type + '</td></tr>';
                    });
                    salida += '</table>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</body>' +
                        '</html>';
                    respuesta.write(salida);
                    return respuesta.end();
                });

            } else if (code == 4) {
                var query = { type: ["Water"] };
                dbo.collection("pokemon").find(query).toArray(function(err, result) {
                    if (err) throw err;
                    //console.log(result);
                    db.close();
                    respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    let salida = "";
                    salida += '<!DOCTYPE html><html lang="es">' +
                        '<head>' +
                        '<meta charset="utf-8">' +
                        '<title>Consultas</title>' +
                        '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">' +
                        '<link href="http://fonts.googleapis.com/css?family=Amarante" rel="stylesheet" type="text/css">' +
                        '</head>' +
                        '<body>' +
                        '<div class="container-fluid">' +
                        '<div class="row">' +
                        '<div class="col-12">' +
                        '<nav class="nav">' +
                        '<a class="nav-link" aria-current="page" href="/">Home</a>' +
                        '<a class="nav-link" href="/crear">Crear</a>' +
                        '<a class="nav-link" href="/insertar">Insertar</a>' +
                        '<a class="nav-link active" href="/consultas">Consultas</a>' +
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
                        '<h1 class="mt-5">Consulta de pokemon que sean sólo de tipo agua ("Water")</h1>' +
                        '<table class="table">' +
                        '<tr><th>ID</th><th>Nombre</th><th>Tipo</th></tr>';
                    result.forEach(element => {
                        salida += '<tr><td>' + element.id + '</td><td>' + element.name.english + '</td><td>' + element.type + '</td></tr>';
                    });
                    salida += '</table>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</body>' +
                        '</html>';
                    respuesta.write(salida);
                    return respuesta.end();
                });
            } else if (code == 5) {
                var query = { "name.english": /^Vi/ };
                dbo.collection("pokemon").find(query).toArray(function(err, result) {
                    if (err) throw err;
                    //console.log(result);
                    db.close();
                    respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    let salida = "";
                    salida += '<!DOCTYPE html><html lang="es">' +
                        '<head>' +
                        '<meta charset="utf-8">' +
                        '<title>Consultas</title>' +
                        '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">' +
                        '<link href="http://fonts.googleapis.com/css?family=Amarante" rel="stylesheet" type="text/css">' +
                        '</head>' +
                        '<body>' +
                        '<div class="container-fluid">' +
                        '<div class="row">' +
                        '<div class="col-12">' +
                        '<nav class="nav">' +
                        '<a class="nav-link" aria-current="page" href="/">Home</a>' +
                        '<a class="nav-link" href="/crear">Crear</a>' +
                        '<a class="nav-link" href="/insertar">Insertar</a>' +
                        '<a class="nav-link active" href="/consultas">Consultas</a>' +
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
                        '<h1 class="mt-5">Consulta de pokemon cuyo nombre en inglés empiece por "Vi".</h1>' +
                        '<table class="table">' +
                        '<tr><th>ID</th><th>Nombre</th><th>Tipo</th></tr>';
                    result.forEach(element => {
                        salida += '<tr><td>' + element.id + '</td><td>' + element.name.english + '</td><td>' + element.type + '</td></tr>';
                    });
                    salida += '</table>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</body>' +
                        '</html>';
                    respuesta.write(salida);
                    return respuesta.end();
                });
            } else if (code == 6) {
                var query = { $and: [{ type: "Ghost" }, { "base.HP": { $gt: 60 } }] };
                dbo.collection("pokemon").find(query).toArray(function(err, result) {
                    if (err) throw err;
                    //console.log(result);
                    db.close();
                    respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    let salida = "";
                    salida += '<!DOCTYPE html><html lang="es">' +
                        '<head>' +
                        '<meta charset="utf-8">' +
                        '<title>Consultas</title>' +
                        '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">' +
                        '<link href="http://fonts.googleapis.com/css?family=Amarante" rel="stylesheet" type="text/css">' +
                        '</head>' +
                        '<body>' +
                        '<div class="container-fluid">' +
                        '<div class="row">' +
                        '<div class="col-12">' +
                        '<nav class="nav">' +
                        '<a class="nav-link" aria-current="page" href="/">Home</a>' +
                        '<a class="nav-link" href="/crear">Crear</a>' +
                        '<a class="nav-link" href="/insertar">Insertar</a>' +
                        '<a class="nav-link active" href="/consultas">Consultas</a>' +
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
                        '<h1 class="mt-5">Consulta de pokemon de tipo fantasma ("Ghost") y con HP más de 60..</h1>' +
                        '<table class="table">' +
                        '<tr><th>ID</th><th>Nombre</th><th>Tipo</th></tr>';
                    result.forEach(element => {
                        salida += '<tr><td>' + element.id + '</td><td>' + element.name.english + '</td><td>' + element.type + '</td></tr>';
                    });
                    salida += '</table>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</body>' +
                        '</html>';
                    respuesta.write(salida);
                    return respuesta.end();
                });
            } else if (code == 7) {
                var query = { $or: [{ "base.Speed": { $gt: 100 } }, { $and: [{ "base.Attack": { $gt: 70 } }, { "base.Attack": { $lt: 90 } }] }] };
                dbo.collection("pokemon").find(query).toArray(function(err, result) {
                    if (err) throw err;
                    //console.log(result);
                    db.close();
                    respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    let salida = "";
                    salida += '<!DOCTYPE html><html lang="es">' +
                        '<head>' +
                        '<meta charset="utf-8">' +
                        '<title>Consultas</title>' +
                        '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">' +
                        '<link href="http://fonts.googleapis.com/css?family=Amarante" rel="stylesheet" type="text/css">' +
                        '</head>' +
                        '<body>' +
                        '<div class="container-fluid">' +
                        '<div class="row">' +
                        '<div class="col-12">' +
                        '<nav class="nav">' +
                        '<a class="nav-link" aria-current="page" href="/">Home</a>' +
                        '<a class="nav-link" href="/crear">Crear</a>' +
                        '<a class="nav-link" href="/insertar">Insertar</a>' +
                        '<a class="nav-link active" href="/consultas">Consultas</a>' +
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
                        '<h1 class="mt-5">Consulta de pokemon de velocidad más de 100, o de ataque entre 70 y 90.</h1>' +
                        '<table class="table">' +
                        '<tr><th>ID</th><th>Nombre</th><th>Tipo</th></tr>';
                    result.forEach(element => {
                        salida += '<tr><td>' + element.id + '</td><td>' + element.name.english + '</td><td>' + element.type + '</td></tr>';
                    });
                    salida += '</table>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</body>' +
                        '</html>';
                    respuesta.write(salida);
                    return respuesta.end();
                });
            }
        } else {
            respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8 ' });
            respuesta.write('<!DOCTYPE html><html lang="es">' +
                '<head>' +
                '<meta charset="utf-8">' +
                '<title>Consultas</title>' +
                '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">' +
                '<link href="http://fonts.googleapis.com/css?family=Amarante" rel="stylesheet" type="text/css">' +
                '</head>' +
                '<body>' +
                '<div class="container-fluid">' +
                '<div class="row">' +
                '<div class="col-12">' +
                '<nav class="nav">' +
                '<a class="nav-link" aria-current="page" href="/">Home</a>' +
                '<a class="nav-link" href="/crear">Crear</a>' +
                '<a class="nav-link" href="/insertar">Insertar</a>' +
                '<a class="nav-link active" href="/consultas">Consultas</a>' +
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
                '<h1 class="mt-5">Consultas</h1>' +
                '<ol>' +
                '<li><a class="nav-link" href="/consultas?code=1">Consulta Fire</a></li>' +
                '<li><a class="nav-link" href="/consultas?code=2">Consulta Ids</a></li>' +
                '<li><a class="nav-link" href="/consultas?code=3">Consulta Speed</a></li>' +
                '<li><a class="nav-link" href="/consultas?code=4">Consulta Watter</a></li>' +
                '<li><a class="nav-link" href="/consultas?code=5">Consulta Vi</a></li>' +
                '<li><a class="nav-link" href="/consultas?code=6">Consulta Ghost</a></li>' +
                '<li><a class="nav-link" href="/consultas?code=7">Consulta Speed/At</a></li>' +
                '</ol>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</body>' +
                '</html>');
            return respuesta.end();
        }
    });

}