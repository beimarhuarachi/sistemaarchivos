ManejadorEventos = {
	atrasSE : false,
	moviendo : false,
	copiando : false,
	volverEstadoInicial : function() {
		this.moviendo = false;
		this.copiando = false;
	}
}

Copia = {
	rutaorigen : "",
	rutadestino : "",
}