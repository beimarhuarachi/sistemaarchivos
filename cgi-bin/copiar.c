#include <string.h>

#include <sys/types.h>

#include <stdio.h>
#include <stdlib.h>

#include <json/json.h>
#include <dirent.h>
#include <unistd.h>
#define MAXLEN 1024
 
char letra;
FILE *ficheroL, *ficheroE;
 
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

void main (void)
{   

    char *lenstr;
    char inputBuffer[MAXLEN];
    int contentLength;
    int i;
    char x;
    char mensaje[120];
    char otro[120];

  printf("Content‐type:text/plain\n\n");

  lenstr = getenv("CONTENT_LENGTH");

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

  separar(otro, inputBuffer, '=');
  separar(otro, inputBuffer, '&');


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




char original2[90];
  
  

  strcpy( original2, otro );

  int posicion2 = strlen(original2);

  int tamanio2 = posicion2 + 1;

  char nueva2[ tamanio2 ];
  //printf("%i\n", posicion);
  // copiar la primera parte
  int a2 = 0;
  for( a2; a2 < posicion2; a2++ ){
    char aux = original2[ a2 ];
    if(aux == '*') {
      nueva2[ a2 ] = '/';
    } else {
      nueva2[ a2 ] = original2[ a2 ];
    }
    
  }
 
  nueva2[ posicion2 ] = '\0';


json_object *jobj = json_object_new_object();



    
    ficheroL = fopen(nueva, "rb");
    
    ficheroE = fopen(nueva2, "wb");
    letra=getc(ficheroL);

    while (feof(ficheroL)==0)
    {
        putc(letra,ficheroE);
        letra=getc(ficheroL);
    }
 
    fclose(ficheroL);
    fclose(ficheroE);


    json_object *jstring6 = json_object_new_string(getenv("QUERY_STRING"));
    json_object *jstring = json_object_new_string(nueva);
  /*Form the json object*/
  /*Each of these is like a key value pair*/
  json_object_object_add(jobj,"Directorios", jstring);
  json_object_object_add(jobj,"CadenaPeticion", jstring6);

   printf("%s",json_object_to_json_string(jobj));
 
}