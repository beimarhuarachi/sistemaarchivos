#include <stdio.h>
#include <stdlib.h>

char letra;
void main (void)
{






    const char a[] = "/home/beimar/Documentos/imagen.png" ;
    const char b[] = "/home/beimar/Documentos/hola/imagen.png" ;
    
    FILE* in = fopen( a, "rb" );
    FILE* out = fopen( b, "wb" );
    if( in == NULL || out == NULL )
    {
        perror( "An error occured while opening files!!!" ) ;
        in = out = 0 ;
    }
    else   
    {
        letra=getc(in);

        while (feof(in)==0)
        {
            putc(letra,out);
            letra=getc(in);
        }
 
        fclose(in);
        fclose(out);
    
        if(  remove(a) == 0)
        {
            printf( "File successfully moved. Thank you for using this mini app" ) ;
        }
        else
        {
            printf( "An error occured while moving the file!!!" ) ;
        }
    }
}
