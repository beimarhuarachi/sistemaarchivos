$(document).ready(function() {
    main();
});

/**
*   Funcion Principal
*/
function main() {
    $('#botonDirectorio').on('click', listar);
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
        
        var entrada = $('#listaDirectorios').html();
        var template2 = Handlebars.compile(entrada);
        var resultado = template2(objeto1);

        //console.log(response);
        $('#folders').html(resultado);
        $('a').css('cursor', 'pointer');

        $('.iconoBorrar').on('click', function(event) {
            var tipo = this.getAttribute('tipo');
            var nombre = this.getAttribute('id');
            if(tipo == 'archivo') {
                eliminar(Configuracion.rutaActual+'/'+nombre);
                console.log("se esta enviando");
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
