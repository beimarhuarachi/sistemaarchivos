#include <string.h>

#include <sys/types.h>

#include <stdio.h>
#include <stdlib.h>
 
char letra;
FILE *ficheroL, *ficheroE;
 
int main ()
{   
    // modo "rb" binario lectura, si no especificas b lo abre en modo texto
    // (modo por defecto) como si escribieras "rt"
    ficheroL = fopen("/home/beimar/Documentos/imagen.png", "rb");
    // modo "wb" binario escritura, igual que antes, si no especificas
    // binario, lo abre en modo texto, como si escribieras "wt"
    ficheroE = fopen("/home/beimar/Documentos/copias/imagen.png", "wb");
    letra=getc(ficheroL);
    while (feof(ficheroL)==0)
    {
        putc(letra,ficheroE);
        //printf("%c", letra);
        letra=getc(ficheroL);
    }
 
    fclose(ficheroL);
    fclose(ficheroE);
 
    //system("pause");
    return 0;
}