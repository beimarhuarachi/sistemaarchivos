#include <stdio.h>
#include <string.h>

int main()
{
	char texto[] = "*home*beimar*Descargas";
	char original[90];
	
	

	strcpy( original, texto );

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

	printf( "%s", nueva );
	//printf( "%s", g );
	return 0;
}