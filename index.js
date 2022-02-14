//Creamos el servidor
var http = require('http');
var url = require('url');
var server = http.createServer();
//Importamos los modulos
var moduloCrearDB = require('./modules/crearDB.js');
var moduloInsertar = require('./modules/insertar.js');
var moduloConsultas = require('./modules/consultas.js');
var moduloModificar = require('./modules/modificar.js');
var moduloEliminar = require('./modules/eliminar.js');
var moduloEliminarTodo = require('./modules/eliminarTodo.js');
var moduloPrincipal = require('./modules/principal.js');
var modulo404 = require('./modules/404.js');
//Arrancamos el servidor
server.on('request', function(peticion, respuesta) {
    //Obtenemos la URL y la descomponemos
    var url_peticion = url.parse(peticion.url, true);
    //Guardamos el pathname
    var pathname = url_peticion.pathname;
    //Optenemos los parametros
    var parametro = url_peticion.query;

    //Comprobamos si el pathname es /crear
    if (pathname == '/crear') {
        moduloCrearDB.crearDB(respuesta);
    }
    //Comprobamos si el pathname es /insertar
    else if (pathname == '/insertar') {
        moduloInsertar.insertar(respuesta);
    }
    //Comprobamos si el pathname es /consultas
    else if (pathname == '/consultas') {
        moduloConsultas.consultas(parametro.code, respuesta);
    }
    //Comprobamos si el pathname es /modificar
    else if (pathname == '/modificar') {
        moduloModificar.modificar(respuesta);
    }
    //Comprobamos si el pathname es /eliminar
    else if (pathname == '/eliminar') {
        moduloEliminar.eliminar(respuesta);
    }
    //Comprobamos si el pathname es /eliminarTodo
    else if (pathname == '/eliminarTodo') {
        moduloEliminarTodo.eliminarTodo(respuesta);
    }
    //Comprobamos si es la inicial
    else if (pathname == '/') {
        moduloPrincipal.principal(respuesta);
    }
    //Respuesta en caso de que no se encuentre el pathname indicado
    else {
        modulo404.error404(respuesta);
    }
});
server.listen(8083, '127.0.0.1', (err) => {
    //Verificamos que no halla error, si no lo mostrara por consola
    if (err) {
        return console.log('Error: ', err);
    }
    console.log('Servidor ejecutándose en http://127.0.0.1:8083/');
});