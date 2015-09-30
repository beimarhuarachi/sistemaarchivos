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

function operacionCambiarPermiso(nombreArchivo, tipoCambio,rutaorigen) {
	var rutaServicio = obtenerRutaServicio("cambiarPermiso");
	var rutaArchivo = rutaorigen + "/" + nombreArchivo;

	datos = {
		direccionArchivo : ParseadorRutas.convertirRuta(rutaArchivo),
		tipoCambio : tipoCambio
	}

	console.log(rutaServicio + "\n" + datos.direccionArchivo);

	peticionServidor(rutaServicio, datos, "POST", callbackCopiarArchivos);
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

function recorrerArbol(json){
	var type;
	var resultado;
	for (var i=0; i < json.length; i++){
		type = typeof json[i].hijos;

		if (type=="undefined") {
			resultado = true;					
			//alert(json[i].id);
			console.log(json[i].id);
		} else {
			//alert(json[i].id);
			resultado = recorrerArbol(json[i].hijos);
		}
	}
	return resultado;
}

arbol =  [{"id":1, "code":1,"hijos":  [
{"id":11,"code":11},
{"id":12,"code":12}] 
},
{"id":2, "code":2, "hijos":
[{"id":21,"code":21},
{"id":22,"code":22, "hijos": [
{"id":221,"code":221},
{"id":222,"code":222} ]	}
] } ];