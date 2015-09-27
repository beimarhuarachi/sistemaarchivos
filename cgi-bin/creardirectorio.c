#include <sys/types.h>
#include <sys/stat.h>
#include <stdio.h>

#include <string.h>
#include <stdlib.h>
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

void main(void) {
	char *lenstr;
  char inputBuffer[MAXLEN];
  int contentLength;
  int i;
  char x;
  char mensaje[80];

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



json_object *jobj = json_object_new_object();







	int status;

	status = mkdir(nueva, S_IRWXU | S_IRWXG | S_IROTH | S_IXOTH);

	if(status == 0) {
		//printf("%s\n", "si se creo");
		json_object *jboolean = json_object_new_boolean(1);
      json_object_object_add(jobj,"respuesta", jboolean);
	} else {
		//printf("%s\n", "no se creo");
		json_object *jboolean = json_object_new_boolean(0);
      json_object_object_add(jobj,"respuesta", jboolean);
	}

	json_object *jstring = json_object_new_string(nueva);


  	json_object_object_add(jobj,"directoriocreado", jstring);


	printf("%s",json_object_to_json_string(jobj));
}
