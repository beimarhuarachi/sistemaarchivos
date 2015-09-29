ManejadorEventos = {
	atrasSE : false,
	moviendo : false,
	copiando : false,
	copiandoTodo : false,
	moviendoTodo : false,
	volverEstadoInicial : function() {
		this.moviendo = false;
		this.copiando = false;
		this.copiandoTodo = false;
		this.moviendoTodo = false;
	}
}

Copia = {
	rutaorigen : "",
	rutadestino : "",
}