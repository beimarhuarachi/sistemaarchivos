#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <json/json.h>
#include <dirent.h>
#include <unistd.h>
#include <sys/types.h>

void main(void)
{
printf("Content‐type:text/plain\n\n");

/*Creating a json object*/
  json_object *jobj = json_object_new_object();

  /*Creating a json array*/
  json_object *jarray = json_object_new_array();

    DIR *dir;
  struct dirent *ent;
  if ((dir = opendir ("/home/beimar/Descargas")) != NULL) {
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