$(document).ready(function() {
    console.log( "ready!" );
    $('#botonDirectorio').on('click', listar);
    $('#boton').on('click', function() {
    	//enviar();
    	recibirTexto();
    });

    Handlebars.registerHelper('hola', function() {
        return this.Tipo;
    });
    Handlebars.registerHelper('if', function(conditional, options) {
        if(conditional == 'directorio') {
            return options.fn(this);
        }
        return options.inverse(this);
    });
    
});
console.log("sdjflkas");

function listar() {
    $.ajax({
 
    // The URL for the request
    url: "/cgi-bin/sistemaarchivos/cgi-bin/listarjson.cgi",
 
    // The data to send (will be converted to a query string)
    data: {
        id: 123,
        nombre : "Jorge",
        apellido : "Mamani"
    },
 
    // Whether this is a POST or GET request
    type: "GET",
 
    // The type of data we expect back
    //dataType : "json",
 
    // Code to run if the request succeeds;
    // the response is passed to the function
    success: function(response) {
        //$( "<h1>" ).text( json.title ).appendTo( "body" );
        //$( "<div class=\"content\">").html( json.html ).appendTo( "body" );
        console.log(response);
        
        console.log(this.url);
        objeto1 = JSON.parse(response);
        console.log(objeto1);


        //$('#datos').html(response);
        
        var entrada = $('#listaDirectorios').html();
        var template2 = Handlebars.compile(entrada);
        //var datos = {'Directorios' :  ['primero', 'segundo', 'tercero']}
        var resultado = template2(objeto1);

        console.log(resultado);
        $('#folders').html(resultado);
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

function recibirTexto() {
	$.ajax({
 
    // The URL for the request
    url: "/cgi-bin/enviartexto.cgi",
 
    // The data to send (will be converted to a query string)
    data: {
        id: 123,
        nombre : "beimar",
        apellido : "huarachi"
    },
 
    // Whether this is a POST or GET request
    type: "GET",
 
    // The type of data we expect back
    //dataType : "json",
 
    // Code to run if the request succeeds;
    // the response is passed to the function
    success: function(response) {
        //$( "<h1>" ).text( json.title ).appendTo( "body" );
        //$( "<div class=\"content\">").html( json.html ).appendTo( "body" );
        console.log(response);
        
        
        objeto = JSON.parse(response);
        console.log(objeto);
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

function enviar() {
	$.ajax({
 
    // The URL for the request
    url: "/cgi-bin/navegador.cgi",
 
    // The data to send (will be converted to a query string)
    data: {
        id: 123
    },
 
    // Whether this is a POST or GET request
    type: "GET",
 
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
