#include <stdio.h>
#include <stdlib.h>
/*copy_file recibe como parametro el nombre del fichero origen y el nombre del fichero destino
donde se copiara, devuelve 1 si se copio exitosamente,0 en caso contario*/
int copy_file(char* f_org,char* f_dest); 
int main()
{
	if(!copy_file("/home/beimar/Documentos/imagen.png","/home/beimar/Documentos/copias/imagen.png"))
                printf("El fichero no se pudo copiar\n");
	else
	        printf("Fichero copiado exitosamente\n");
 
	return 0;
}
int copy_file(char* f_org,char* f_dest)
{
	FILE *fp_org,*fp_dest; 
	char c;
 
	if(!(fp_org=fopen(f_org,"rt")) || !(fp_dest=fopen(f_dest,"wt")))
	{
		perror("Error de apertura de ficheros");
		exit(EXIT_FAILURE);
	}
 
	while((c=fgetc(fp_org))!=EOF && !ferror(fp_org) && !ferror(fp_dest))
		fputc(c,fp_dest);
 
	if(ferror(fp_org) || ferror(fp_org))
		return 1;
 
	fclose(fp_org);
	fclose(fp_dest);
	return 0;
}