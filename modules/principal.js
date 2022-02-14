exports.principal = function(respuesta) {
    respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    respuesta.write('<!DOCTYPE html><html lang="es">' +
        '<head>' +
        '<meta charset="utf-8">' +
        '<title>Inicio</title>' +
        '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">' +
        '<link href="http://fonts.googleapis.com/css?family=Amarante" rel="stylesheet" type="text/css">' +
        '<head>' +
        '<body>' +
        '<div class="container-fluid">' +
        '<div class="row">' +
        '<div class="col-12">' +
        '<nav class="nav">' +
        '<a class="nav-link active" aria-current="page" href="/">Home</a>' +
        '<a class="nav-link" href="/crear">Crear</a>' +
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
        '<h1 class="text-center mt-5">Página de inicio</h1>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</body>' +
        '</html>');
    return respuesta.end();
}