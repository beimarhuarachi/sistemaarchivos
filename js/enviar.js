$(document).ready(function() {
    main();
});

/**
*   Funcion Principal
*/
function main() {
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

    $('#linkagregardirectorio').on('click', function() {
        $('#modalagregardirectorio').modal('setting', {
            closable  : false,
            onDeny    : function(){
            $('#nombredirectorio').val("");
            $(this).modal('close');
            },
            onApprove : function(arg){
                nombre = $('#nombredirectorio').val();
                
                ruta = Configuracion.rutaActual + "/" + nombre;
                console.log(ruta);
                crearDirectorio(ruta);
         }
        }).modal('show');
    });

    $('#linkagregararchivo').on('click', function() {
        $('#modalagregararchivo').modal('setting', {
            closable  : false,
            onDeny    : function(){
                $('#nombrearchivo').val("");
                $(this).modal('close');
            },
            onApprove : function(arg){
                nombre = $('#nombrearchivo').val();
                ruta = Configuracion.rutaActual + "/" + nombre;
                console.log(ruta);
                crearArchivo(ruta);
         }
        }).modal('show');
    });

    $('#botonAtras').on('click', function() {
        if(Configuracion.rutaAnterior == "") {
            console.log('ruta anterior vacia');
            
            $('#modalNoAtras').modal('show');
        } else {
            var auxiliar = Configuracion.rutaAnterior;

            Configuracion.cambiarRuta(Configuracion.rutaAnterior);
            Configuracion.rutaAnterior = Helpers.obtenerRutaAnterior(auxiliar);
            
            Controlador.actualizarVista();
            listar();
        }     
    });

    Helpers.iniciarHelpers();


    rutaActual = $('#rutaActual').text();

    Configuracion.rutaActual = rutaActual;

    listar();

    //Carga de plantillas
    ControladorPlantillas.cargarPlantillas();
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
        var colecionValida = [];
        for(i=0;i < Coleccion.length; i++) {
            if(Coleccion[i].Nombre == ".." || Coleccion[i].Nombre == ".") {
                //console.log("contador" + i);
            } else {
                //colecionValida[i] = Coleccion[i];
                colecionValida.push(Coleccion[i]);
            }
        }
        return colecionValida;
    },
    obtenerSoloDirectorios : function(Coleccion) {
        var directorios = [];
        var contador = 0;
        while(contador < Coleccion.length) {
            var nombre = Coleccion[contador].Nombre;
            var tipo = Coleccion[contador].Tipo;
            if(this.verificarDirectorio(tipo) && this.esValido(nombre)) {
                directorios.push(Coleccion[contador]);
            }

            contador++;
        }
        return directorios;
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

function agregarEventosVerContenido () {
    $( ".enlacecontenido" ).on( "click", function() {
        var tipo = this.getAttribute('tipo');
        var nombre = this.getAttribute('id');

        ControladorRuta.irAdelante(nombre);
        ControladorRuta.actualizarVista('#rutaVista');

        listarSoloDirectorios(ControladorRuta.rutaActual);
    });
    
}

function agregarEventoAtrasSegundo(rutaorigen) {
    $( "#botonAtrasSe" ).on( "click", function() {
        if(ControladorRuta.rutaAnterior == "") {
            console.log('ruta anterior vacia');
            
            $('#modalNoAtras').modal('show');
        } else {
            console.log("fsdafasd");
            ControladorRuta.irAtras();
            ControladorRuta.actualizarVista('#rutaVista');

            listarSoloDirectorios(ControladorRuta.rutaActual);
        }
    });
    $( "#botonAceptarCopiar" ).on( "click", function() {
        var origen = Configuracion.rutaActual + "/" + Copia.rutaorigen;
        var destino = ControladorRuta.rutaActual + "/" + Copia.rutaorigen;
        copiarArchivo(origen, destino);
        $('#modalsegundoexplorador').modal('hide');
    });
    Copia.rutaorigen = rutaorigen;
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

        $('.botoneliminaruno').on('click', function(event) {
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

        $('.botoncopiaruno').on('click', function(event) {
            var tipo = this.getAttribute('tipo');
            var nombre = this.getAttribute('id');
            if(tipo == 'archivo') {
                var objetoRespuesta = {Directorios: []};

                Directorios = Helpers.obtenerSoloDirectorios(ColeccionDirectorios);

                objetoRespuesta.Directorios = Directorios;

                ControladorPlantillas.renderizarPlantilla("#listasolodirectorios", "#solodirectorios", objetoRespuesta);

                $('a').css('cursor', 'pointer');

                ControladorRuta.cambiarRutaEntera(Configuracion.rutaActual);
                ControladorRuta.actualizarVista('#rutaVista');

                agregarEventosVerContenido();

                if(!ManejadorEventos.atrasSE) {
                    agregarEventoAtrasSegundo(nombre);
                    ManejadorEventos.atrasSE = true;
                }
                

                $('#modalsegundoexplorador').modal('show');

            } else if(tipo == 'directorio'){
                
            }
        });

        $( ".content.link" ).on( "click", function() {
            var tipo = this.getAttribute('tipo');
            var nombre = this.getAttribute('id');
            console.log(nombre + "Beimar huara");
            
            if(Helpers.verificarDirectorio(tipo) && Helpers.esValido(nombre)) {
                Configuracion.rutaAnterior = Configuracion.rutaActual;
                Configuracion.cambiarRuta(Configuracion.rutaActual+'/'+this.id);
                Controlador.actualizarVista();
                listar();
            } else {
                $('#modalArchivo').modal('show');
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

function crearArchivo(rutaArchivo) {
    $.ajax({
    url: "/cgi-bin/sistemaarchivos/cgi-bin/creararchivojson.cgi",
    data: {
        id: ParseadorRutas.convertirRuta(rutaArchivo)
    },
    type: "POST",
    success: function(response) {
        console.log(response);
        
        
        objeto = JSON.parse(response);
        console.log(objeto);
        $('#nombrearchivo').val("");
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


function listarSoloDirectorios(rutaArchivo) {
    $.ajax({
    url: DatosConfiguracion.urlScripts + 'listarjson.cgi',
    data: {
        id: ParseadorRutas.convertirRuta(rutaArchivo)
    },
    type: "POST",
    success: function(response) {
        var objetoRespuesta = JSON.parse(response);

        Directorios = Helpers.obtenerSoloDirectorios(objetoRespuesta.Directorios);

        objetoRespuesta.Directorios = Directorios;

        ControladorPlantillas.renderizarPlantilla("#listasolodirectorios", "#solodirectorios", objetoRespuesta);

        $('a').css('cursor', 'pointer');

        agregarEventosVerContenido();

        //ControladorRuta.cambiarRutaEntera(Configuracion.rutaActual);
        //ControladorRuta.actualizarVista('#rutaVista');

        console.log(objetoRespuesta);
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


function copiarArchivo(rutaorigen, rutadestino) {
    $.ajax({
    url: DatosConfiguracion.urlScripts + 'copiarjson.cgi',
    data: {
        primero: ParseadorRutas.convertirRuta(rutaorigen),
        segundo : ParseadorRutas.convertirRuta(rutadestino)
    },
    type: "POST",
    success: function(response) {
        console.log(response);
        
        
        objeto = JSON.parse(response);
        console.log(objeto);
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

function crearDirectorio(rutaArchivo) {
    $.ajax({
    url: "/cgi-bin/sistemaarchivos/cgi-bin/creardirectoriojson.cgi",
    data: {
        id: ParseadorRutas.convertirRuta(rutaArchivo)
    },
    type: "POST",
    success: function(response) {
        console.log(response);
        
        
        objeto = JSON.parse(response);
        console.log(objeto);
        $('#nombredirectorio').val("");
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
