#include <stdio.h>
#include <string.h>

int main()
{
	char original[] = "%2Fhome%2F";
	char parte[] = "%2F";
	char nueva[ 21 ];

	int posicion = strlen( original ) - strlen( strstr( original, parte ) );
 	//printf("%i\n", posicion);
	// copiar la primera parte
	int a = 0;
	for( a; a < posicion; a++ ){
		nueva[ a ] = original[ a ];
	}
		
 
	// copiar la segunda parte
	int b = posicion;
	for(b; b < strlen( original ); b++ ) {
		nueva[ b ] = original[ b+3 ]; // 3 es el tamaño de la parte
	}
		
 
	nueva[ 20 ] = '\0';
	//char g[] = nueva;

	printf( "%s", nueva );
	return 0;
}