#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define MAXLEN 1024

// Separar: separa datos del formulario

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

int main(void)
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

    printf( "Ruta%s", nueva );



    //printf("Mensaje %s,%s",mensaje,usuario);
    
  
    printf("Mensaje %s",mensaje);


    return 0;
}

