#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <json/json.h>
#include <dirent.h>
#include <unistd.h>
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

  

  //char texto[] = "*home*beimar*Descargas";
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
  //char g[] = nueva;
  //char g[5];
  //g[0] = '*';

  //printf( "%s", nueva );





  //printf("Content‐type:text/plain\n\n");

/*Creating a json object*/
  json_object *jobj = json_object_new_object();

  /*Creating a json array*/
  json_object *jarray = json_object_new_array();

  DIR *dir;
  struct dirent *ent;
  
  if ((dir = opendir (nueva)) != NULL) {
  /* print all the files and directories within directory */
    while ((ent = readdir (dir)) != NULL) {
    //printf ("%s\n", ent->d_name);
      if(ent->d_type == DT_DIR) {

        json_object *jobjd = json_object_new_object();

        json_object *jstring = json_object_new_string(ent->d_name);
        json_object *jstringtipo = json_object_new_string("directorio");
        json_object_object_add(jobjd,"Nombre", jstring);
        json_object_object_add(jobjd,"Tipo", jstringtipo);
        json_object_array_add(jarray,jobjd);
      } else {
        json_object *jobjd = json_object_new_object();

        json_object *jstring = json_object_new_string(ent->d_name);
        json_object *jstringtipo = json_object_new_string("archivo");
        json_object_object_add(jobjd,"Nombre", jstring);
        json_object_object_add(jobjd,"Tipo", jstringtipo);
        json_object_array_add(jarray,jobjd);
      }
      
    }
    closedir (dir);
  } else {
  /* could not open directory */
    perror ("");
  }

  json_object *jstring6 = json_object_new_string(getenv("QUERY_STRING"));

  /*Form the json object*/
  /*Each of these is like a key value pair*/
  json_object_object_add(jobj,"Directorios", jarray);
  json_object_object_add(jobj,"CadenaPeticion", jstring6);

  printf("%s",json_object_to_json_string(jobj));
}