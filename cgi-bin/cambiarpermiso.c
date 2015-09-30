#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <fcntl.h>

#include <json/json.h>
#include <dirent.h>
#include <unistd.h>
#define MAXLEN 1024

void separar(char *cadena, char *linea, char separador)
{
  int x, y;

  x = 0; y = 0;

  while ((linea[x]) && (linea[x] != separador))
  {
    cadena[x] = linea[x];
    x = x + 1;
  }
  cadena[x] = '\0';
  if (linea[x]) ++x;

  y = 0;

  while (linea[y] = linea[x])
  {
    linea[y] = linea[x];
    y++;
    x++;
  }

}


void main(void)
{
	char *lenstr;
  char inputBuffer[MAXLEN];
  int contentLength;
  int i;
  char x;
  char mensaje[80];
  char tipo[80];

  printf("Content‐type:text/plain\n\n");

  lenstr = getenv("CONTENT_LENGTH");
    //lenstr = (char *)getenv("CONTENT_LENGTH");
  if (lenstr!= NULL)
  {
    contentLength = atoi(lenstr);   
  }
  else contentLength = 0;

  if (contentLength > sizeof(inputBuffer)-1)
    contentLength = sizeof(inputBuffer)-1;

  i = 0;

  while (i < contentLength){

    x = fgetc(stdin);
    if (x==EOF) break;
    inputBuffer[i] = x;
    i++;
  }

  inputBuffer[i] = '\0';
  contentLength = i;

  separar(mensaje, inputBuffer, '=');
  separar(mensaje, inputBuffer, '&');
  separar(tipo, inputBuffer, '=');
  separar(tipo, inputBuffer, '&');

  char original[90];
  
  

  strcpy( original, mensaje );

  int posicion = strlen(original);

  int tamanio = posicion + 1;

  char nueva[ tamanio ];
  //printf("%i\n", posicion);
  // copiar la primera parte
  int a = 0;
  for( a; a < posicion; a++ ){
    char aux = original[ a ];
    if(aux == '*') {
      nueva[ a ] = '/';
    } else {
      nueva[ a ] = original[ a ];
    }
    
  }
 
  nueva[ posicion ] = '\0';


//tipo y nueva





	mode_t primer = 0777;
	mode_t segundo = 0666;
	mode_t tercero = 0444;
	mode_t cuarto = 0000;

	//char p[] = "1";
	//char q[] = "2";

	json_object *jobjd = json_object_new_object();

	if(strcmp(tipo, "1") == 0) {
		//printf("%s\n", "son iguales");
		if (chmod (nueva,primer) < 0) {
    		json_object *jboolean = json_object_new_boolean(0);
      		json_object_object_add(jobjd,"respuesta", jboolean);
   		 } else {
   		 	json_object *jboolean = json_object_new_boolean(1);
      		json_object_object_add(jobjd,"respuesta", jboolean);
   		 }
	} 

	if(strcmp(tipo, "2") == 0) {
		if (chmod (nueva,segundo) < 0) {
    		json_object *jboolean = json_object_new_boolean(0);
      		json_object_object_add(jobjd,"respuesta", jboolean);
   		 } else {
   		 	json_object *jboolean = json_object_new_boolean(1);
      		json_object_object_add(jobjd,"respuesta", jboolean);
   		 }
	}
	if(strcmp(tipo, "3") == 0) {
		if (chmod (nueva,tercero) < 0) {
    		json_object *jboolean = json_object_new_boolean(0);
      		json_object_object_add(jobjd,"respuesta", jboolean);
   		 } else {
   		 	json_object *jboolean = json_object_new_boolean(1);
      		json_object_object_add(jobjd,"respuesta", jboolean);
   		 }
	}
	if(strcmp(tipo, "4") == 0) {
		if (chmod (nueva,cuarto) < 0) {
    		json_object *jboolean = json_object_new_boolean(0);
      		json_object_object_add(jobjd,"respuesta", jboolean);
   		 } else {
   		 	json_object *jboolean = json_object_new_boolean(1);
      		json_object_object_add(jobjd,"respuesta", jboolean);
   		 }
	}


    json_object *jstringtipo = json_object_new_string(nueva);
    json_object_object_add(jobjd,"Archivo", jstringtipo);


    printf("%s",json_object_to_json_string(jobjd));
}