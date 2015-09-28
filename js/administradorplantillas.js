/**
*    Cargardo de plantillas asincronamente 
*/
ControladorPlantillas = {
    idContenedorPlantillas : "#plantillas",
    sufijo : ".html",
    identificador : "#",
    plantillas : [],
    getNumeroPlantillas : function() {
        return this.plantillas.length;
    },
    cargarPlantillas : function() {
        cargarSegundoExplorador();
        cargarListaSoloDirectorios();
    },
    renderizarPlantilla : function(idTemplate, idContenedor, contexto) {
        var entrada = $(idTemplate).html();
        var template = Handlebars.compile(entrada);
        var resultadoHtml = template(contexto);

        $(idContenedor).html(resultadoHtml);
    }
}

function cargarSegundoExplorador() {
    $.ajax({  
        url: DatosConfiguracion.urlPlantillas + 'explorador.html',  
        success: function(data) {  
            $('#segundoexplorador').html(data);  
        }  
    });
}

function cargarListaSoloDirectorios() {
    $.ajax({  
        url:DatosConfiguracion.urlPlantillas + 'listasolodirectorios.html',  
        success: function(data) {  
            $(ControladorPlantillas.idContenedorPlantillas).append(data);  
        }  
    });
}