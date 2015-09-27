/*
 * deldir.c - Delete a directory
 */
#include <unistd.h>
#include <fcntl.h>
#include <stdlib.h>
#include <stdio.h>

#include <string.h>
#include <json/json.h>
#include <dirent.h>
#include <sys/types.h>
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
    printf("Content‐type:text/plain\n\n");

/**
  *
  */
	char *lenstr;
  char inputBuffer[MAXLEN];
  int contentLength;
  int i;
  char x;
  char mensaje[80];

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


/**
  *
  */
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

/**
  *
  */
  if(rmdir(nueva)) {
      perror("remove");
      json_object *jboolean = json_object_new_boolean(0);
      json_object_object_add(jobj,"respuesta", jboolean);
      //exit(EXIT_FAILURE);
  } else {
      json_object *jboolean = json_object_new_boolean(1);
      json_object_object_add(jobj,"respuesta", jboolean);
  }
  //exit(EXIT_SUCCESS);


/**
  *
  */

/*Creating a json object*/
  

  /*Creating a json string*/
  json_object *jstring = json_object_new_string(nueva);


  json_object_object_add(jobj,"directorioeliminado", jstring);



  printf("%s",json_object_to_json_string(jobj));
}