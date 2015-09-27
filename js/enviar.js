$(document).ready(function() {
    main();
});

ModeloVista = {
    contenedorPlantillas : "#plantillas",
    plantillasCargadas : false,
    plantillas : ['template', 'template2', 'listaDirectorios', 'mensaje'],
    identificador : '#',
    agregacion : 'p',
    sufijo : '.html',
    ruta : 'view/',
    getRuta : function(nombrePlantilla) {
        return this.ruta + nombrePlantilla + this.sufijo; 
    }
}

function renderizarPlantilla(nombrePlantilla, contexto) {
    var source   = $('#' + nombrePlantilla).html();
    var template = Handlebars.compile(source);
    var html    = template(contexto);
    $("#modales").html(html);
}

function cargarPlantillas() {
    for (var i = 0; i < ModeloVista.plantillas.length; i++) {
        
        var nombrePlantilla = ModeloVista.plantillas[i];
        var idPlantilla = agregarContenedor(nombrePlantilla);
        var ruta = ModeloVista.getRuta(nombrePlantilla); 
        
        $(idPlantilla).load(ruta , cambiarEstadoLectura);
    } 
}

function cambiarEstadoLectura() {
    ModeloVista.plantillasCargadas = true;
}

function agregarContenedor(nombre) { 
    var agregacion = ModeloVista.agregacion;
    var htmlContenedor = '<div id="'+nombre + agregacion +'"></div>';
    var nuevoId = ModeloVista.identificador+ nombre + agregacion;
    $(ModeloVista.contenedorPlantillas).append(htmlContenedor);
    return nuevoId;
}

/**
*   Funcion Principal
*/
function main() {
    cargarPlantillas();

    $('#botonDirectorio').on('click', listar);

    $('#botonEliminarTodo').on('click', function(event) {
        for (var i = 0; i < ColeccionDirectorios.length; i++) {
            if(ColeccionDirectorios[i]) {
                var ruta = Configuracion.rutaActual + "/" +ColeccionDirectorios[i].Nombre;
                if(ColeccionDirectorios[i].Tipo == 'archivo') {
                    eliminar(ruta);
                } else if(ColeccionDirectorios[i].Tipo == 'directorio'){
                    SistemaArchivos.eliminarTodo(ruta);
                }
                //console.log(ruta);
            }
        };
        
    });

    $('#botonAtras').on('click', function() {
        if(Configuracion.rutaAnterior == "") {
            console.log('ruta anterior vacia');
            
            $('.ui.modal.home').modal('show');
        } else {
            var auxiliar = Configuracion.rutaAnterior;

            Configuracion.cambiarRuta(Configuracion.rutaAnterior);
            Configuracion.rutaAnterior = Helpers.obtenerRutaAnterior(auxiliar);
            
            Controlador.actualizarVista();
            listar();
        }     
         //enviar();
    });

    Helpers.iniciarHelpers();


    rutaActual = $('#rutaActual').text();

    Configuracion.rutaActual = rutaActual;

    listar();
}

SistemaArchivos = {
    pathPrincipal : "/cgi-bin/sistemaarchivos/cgi-bin",
    separadorRuta : "/"
};

ColeccionDirectorios = [];

SistemaArchivos.eliminarTodo = function(ruta) {
    $.ajax({
    url: "/cgi-bin/sistemaarchivos/cgi-bin/eliminartodojson.cgi",
    data: {
        id: ParseadorRutas.convertirRuta(ruta)
    },
    type: "POST",
    success: function(response) {
        console.log(response);
        
        
        objeto = JSON.parse(response);
        console.log(objeto);
        //$('#datos').html(response);
    },
    error: function( xhr, status, errorThrown ) {
        alert( "Sorry, there was a problem!" );
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
    },
    complete: function( xhr, status ) {
    }
    });
}

Helpers = {
    iniciarHelpers : function() {
        Handlebars.registerHelper('hola', function() {
            return this.Tipo;
        });
        Handlebars.registerHelper('if', function(conditional, options) {
            if(conditional == 'directorio') {
                return options.fn(this);
            }
            return options.inverse(this);
        });
    },
    verificarDirectorio : function(ruta) {
        return ruta == 'directorio' ? true : false;
    },
    obtenerRutaAnterior : function(ruta) {
        var resultado = "";
        if(ruta != '/home') {
            var posicion = ruta.lastIndexOf('/');
            resultado =  ruta.substring(0,posicion);
        }
        return resultado;
    },
    esValido : function(ruta) {
        if(ruta == '..' || ruta == '.' )
            return false;
        else 
            return true;
    },
    excluirPuntos : function(Coleccion) {
        colecionValida = [];
        for(i=0;i < Coleccion.length; i++) {
            if(Coleccion[i].Nombre == ".." || Coleccion[i].Nombre == ".") {
                //console.log("contador" + i);
            } else {
                colecionValida[i] = Coleccion[i];
            }
        }
        return colecionValida;
    }
}

Controlador = {
    actualizarVista : function() {
        $('#rutaActual').html(Icono.getHtml+Configuracion.rutaActual);
    }
}

Configuracion = {
    rutaActual : "",
    rutaAnterior : "",
    actualizarRuta : function() {
        Configuracion.rutaActual = $('#rutaActual').text();
    },
    cambiarRuta : function(ruta) {
        Configuracion.rutaActual = ruta;
    }
}

Icono = {
    getHtml : '<i class="inverted folder open icon"></i>'
}

ParseadorRutas = {
    convertirRuta : function(ruta) {
        return ruta.replace(/\//g,"*");
    }
}

function listar() {
    $.ajax({
    url: "/cgi-bin/sistemaarchivos/cgi-bin/listarjson.cgi",
    data: {
        ruta : ParseadorRutas.convertirRuta(Configuracion.rutaActual)
    },
    type: "POST",
    success: function(response) {
        objeto1 = JSON.parse(response);

        directoriosValidos = Helpers.excluirPuntos(objeto1.Directorios);
        
        objeto1.Directorios = directoriosValidos;
        
        var entrada = $('#listaDirectorios').html();
        var template2 = Handlebars.compile(entrada);
        var resultado = template2(objeto1);

        ColeccionDirectorios = objeto1.Directorios;
        //console.log(ColeccionDirectorios);

        //console.log(response);
        $('#folders').html(resultado);
        $('a').css('cursor', 'pointer');

        $('.iconoBorrar').on('click', function(event) {
            var tipo = this.getAttribute('tipo');
            var nombre = this.getAttribute('id');
            if(tipo == 'archivo') {
                eliminar(Configuracion.rutaActual+'/'+nombre);
                console.log("se esta enviando");
            } else if(tipo == 'directorio'){
                SistemaArchivos.eliminarTodo(Configuracion.rutaActual+'/'+nombre);
                console.log('eliminando todo un directorio');
            }
            
            console.log(tipo + "--===" + nombre);
        });
        $( ".content" ).on( "click", function() {
            var tipo = this.getAttribute('tipo');
            var nombre = this.getAttribute('id');
            console.log(nombre + "Beimar huara");
            
            if(Helpers.verificarDirectorio(tipo) && Helpers.esValido(nombre)) {
                Configuracion.rutaAnterior = Configuracion.rutaActual;
                Configuracion.cambiarRuta(Configuracion.rutaActual+'/'+this.id);
                Controlador.actualizarVista();
                listar();
            } else {
                $('.ui.modal.archivo').modal('show');
            }
            console.log(this.id + this.getAttribute('tipo'));
        });
    },
    error: function( xhr, status, errorThrown ) {
        alert( "Sorry, there was a problem!" );
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
    },
    complete: function( xhr, status ) {
    }
});
}


function eliminar(rutaArchivo) {
    $.ajax({
    url: "/cgi-bin/sistemaarchivos/cgi-bin/borrararchivojson.cgi",
    data: {
        id: ParseadorRutas.convertirRuta(rutaArchivo)
    },
    type: "POST",
    success: function(response) {
        console.log(response);
        
        
        objeto = JSON.parse(response);
        console.log(objeto);
        //$('#datos').html(response);
    },
    error: function( xhr, status, errorThrown ) {
        alert( "Sorry, there was a problem!" );
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
    },
    complete: function( xhr, status ) {
    }
});
}

function eliminardirectorio(rutaArchivo) {
    $.ajax({
    url: "/cgi-bin/sistemaarchivos/cgi-bin/borrardirectoriojson.cgi",
    data: {
        id: ParseadorRutas.convertirRuta(rutaArchivo)
    },
    type: "POST",
    success: function(response) {
        console.log(response);
        
        
        objeto = JSON.parse(response);
        console.log(objeto);
        //$('#datos').html(response);
    },
    error: function( xhr, status, errorThrown ) {
        alert( "Sorry, there was a problem!" );
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
    },
    complete: function( xhr, status ) {
    }
});
}


function recibirTexto() {
	$.ajax({
    url: "/cgi-bin/enviartexto.cgi",
    data: {
        id: 123,
        nombre : "beimar",
        apellido : "huarachi"
    },
    type: "GET",
    success: function(response) {
        console.log(response);
        
        
        objeto = JSON.parse(response);
        console.log(objeto);
        $('#datos').html(response);
    },
    error: function( xhr, status, errorThrown ) {
        alert( "Sorry, there was a problem!" );
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
    },
    complete: function( xhr, status ) {
    }
});
}

function enviar() {
	$.ajax({
 
    // The URL for the request
    url: "/cgi-bin/sistemaarchivos/cgi-bin/leerform.cgi",
 
    // The data to send (will be converted to a query string)
    data: {
        ruta : ParseadorRutas.convertirRuta("/~home/bei mar/Descargas")
    },
 
    // Whether this is a POST or GET request
    type: "POST",
 
    // The type of data we expect back
    //dataType : "json",
 
    // Code to run if the request succeeds;
    // the response is passed to the function
    success: function(response) {
        //$( "<h1>" ).text( json.title ).appendTo( "body" );
        //$( "<div class=\"content\">").html( json.html ).appendTo( "body" );
        console.log(response);
        $('#datos').html(response);
    },
 
    // Code to run if the request fails; the raw request and
    // status codes are passed to the function
    error: function( xhr, status, errorThrown ) {
        alert( "Sorry, there was a problem!" );
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
    },
 
    // Code to run regardless of success or failure
    complete: function( xhr, status ) {
        //alert( "The request is complete!" );
    }
});
}
