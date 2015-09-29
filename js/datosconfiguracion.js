
/**
*  Configuracion Global del Sistema
*/

DatosConfiguracion = {
	urlPlantillas : "vista/",
	urlScripts : "/cgi-bin/sistemaarchivos/cgi-bin/",
	sufijoScript : ".cgi",
	rutasServicios : [
	{
		nombreServicio : "copiarArchivo",
		archivoServicio : "copiarjson.cgi"
	}, 
	{
		nombreServicio : "moverArchivo",
		archivoServicio : "moverarchivojson.cgi"
	}]
}