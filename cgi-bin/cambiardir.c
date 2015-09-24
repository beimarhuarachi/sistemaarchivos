/*
 * chdir.c - Change to a new directory
 */
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>
#include <errno.h>

#include <dirent.h>

int main(int argc, char *argv[])
{

    if (argc > 1)
    {
	if(chdir(argv[1]) < 0) {
	    perror("chdir");
	    exit(EXIT_FAILURE);
	    DIR *dir;
		struct dirent *ent;
		if ((dir = opendir ("..")) != NULL) {
  		/* print all the files and directories within directory */
  		while ((ent = readdir (dir)) != NULL) {
    	printf ("%s\n", ent->d_name);
  		}
  		closedir (dir);
		} else {
  		/* could not open directory */
  		perror ("");
  		//return EXIT_FAILURE;
		}
	}
		//system("ls");
		DIR *dir;
		struct dirent *ent;
		if ((dir = opendir ("..")) != NULL) {
  		/* print all the files and directories within directory */
  		while ((ent = readdir (dir)) != NULL) {
    	printf ("%s\n", ent->d_name);
  		}
  		closedir (dir);
		} else {
  		/* could not open directory */
  		perror ("");
  		//return EXIT_FAILURE;
		}
    }
    else {
	    printf("Necesito argumento\n");
	 }
    exit(EXIT_SUCCESS);
}