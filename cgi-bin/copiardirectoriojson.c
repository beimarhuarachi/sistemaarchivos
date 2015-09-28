#include	<stdio.h>
#include	<sys/types.h>
#include	<dirent.h>
#include	<sys/stat.h>
#include	<pwd.h>
#include	<grp.h>
#include    <string.h>
#include	<unistd.h>
#include	<stdlib.h>
#include	<fcntl.h>

#define BUFFERSIZE      4096
#define COPYMODE        0644

void SearchDirectory(const char *name) {
    DIR *dir = opendir(name);                //Assuming absolute pathname here.
    if(dir) {
        char Path[256], *EndPtr = Path;
        struct dirent *e;
        strcpy(Path, name);                  //Copies the current path to the 'Path' variable.
        EndPtr += strlen(name);              //Moves the EndPtr to the ending position.
        while((e = readdir(dir)) != NULL) {  //Iterates through the entire directory.
            struct stat info;                //Helps us know about stuff
            strcpy(EndPtr, e->d_name);       //Copies the current filename to the end of the path, overwriting it with each loop.
            if(!stat(Path, &info)) {         //stat returns zero on success.
                if(S_ISDIR(info.st_mode)) {  //Are we dealing with a directory?
                    //Make corresponding directory in the target folder here.
                	printf("%s\n", e->d_name);
                    SearchDirectory(Path);   //Calls this function AGAIN, this time with the sub-name.
                } else if(S_ISREG(info.st_mode)) { //Or did we find a regular file?

                    //Run Copy routine
                }
            }
        }
    }
}

void main() {
	char *name = "/home/beimar";
	SearchDirectory(name);
}

