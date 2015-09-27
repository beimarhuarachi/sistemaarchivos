$(document).ready(function() {


	$('#result').append('<div id="contenido5"></div>');
 	$("#contenido").load("template.html");

// $("#result").load( "template2.html", function() {
//   		console.log('se cargo correctamente' + Config.nombre + Helper.apellido);
// 	});
	$('#cargar').on('click', function(event) {
		$("#result").load( "template2.html", function() {
  			//var source   = $("#entry-template").html();
			//var template = Handlebars.compile(source);
			//var context = {title: "My New Post", body: "This is my first post!"};
			//var html    = template(context);
			//$("#result").html(html);
		});
		$("#result").load( "template.html", function() {
  			
		});
	});
	
});

