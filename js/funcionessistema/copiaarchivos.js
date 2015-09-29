function operacionTodosArchivos(archivos, origen, destino, operacion) {
	var rutaServicio = obtenerRutaServicio(operacion);

	for (var i = 0; i < archivos.length; i++) {
		var rutaorigen = origen + "/" + archivos[i].Nombre;
		var rutadestino = destino + "/" + archivos[i].Nombre;

		datos = {
			rutaorigen : ParseadorRutas.convertirRuta(rutaorigen),
			rutadestino : ParseadorRutas.convertirRuta(rutadestino)
		}

		console.log(rutaServicio + "==" + datos.rutaorigen+"=="+datos.rutadestino + "==");
		peticionServidor(rutaServicio, datos, "POST", callbackCopiarArchivos);
	}
}

function  moverTodosArchivos(argument) {
 	
 } 

function callbackCopiarArchivos (response) {
	console.log(response);
}

function obtenerRutaServicio(nombreservicio) {
	rutaServicio = "";
	rutas = DatosConfiguracion.rutasServicios;
	for (var i = 0; i < rutas.length; i++) {
		if(rutas[i].nombreServicio == nombreservicio) {
			rutaServicio = rutas[i].archivoServicio;
			break;
		}
	}

	if(rutaServicio == "")
		return null; 
	

	return DatosConfiguracion.urlScripts + rutaServicio;
}

function peticionServidor(rutaservicio, datos, tipoPeticion, callback) {
	$.ajax({
		url: rutaservicio,
		data: datos,
		type: tipoPeticion,
		success: callback,
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