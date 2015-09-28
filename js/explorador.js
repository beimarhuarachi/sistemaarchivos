ControladorRuta = {
	rutaActual : "/home",
	rutaAnterior : "",
    idRutaVista : "#rutaVista",
	irAtras : function() {
		var auxiliar = ControladorRuta.rutaAnterior;
        this.rutaActual = this.rutaAnterior;
        this.rutaAnterior = this.obtenerRutaAnterior(auxiliar);
	},
	obtenerRutaAnterior : function(ruta) {
        var resultado = "";

        if(ruta != '/home') {
            var posicion = ruta.lastIndexOf('/');
            resultado =  ruta.substring(0,posicion);
            
        }

        return resultado;
    },
    cambiarRutaEntera : function(ruta) {
        this.rutaActual = ruta;
        this.rutaAnterior = this.obtenerRutaAnterior(ruta);
    },
    irAdelante : function(nombreDirectorio) {
    	this.rutaAnterior = this.rutaActual;
    	this.rutaActual = this.rutaActual+'/'+nombreDirectorio;
    },
    actualizarVista : function(id) {
    	//$('#rutaActual').html(Icono.getHtml+ControladorRuta.rutaActual);
        if(id) {
            $(id).html(Icono.getHtml+ControladorRuta.rutaActual);
        } else {
            $(this.idRutaVista).html(Icono.getHtml+ControladorRuta.rutaActual);
        }	
    }
}
