#include <unistd.h>
#include <stdio.h>
#include <sys/stat.h>
#include <sys/types.h>
#define MAX 11
int main(int argc, char **argv)
{
    if(argc != 2)    
        return 1;

    struct stat fileStat;
    if(stat(argv[1],&fileStat) < 0)    
        return 1;

    printf("Information for %s\n",argv[1]);
    printf("---------------------------\n");
    printf("File Size: \t\t%zu bytes\n",fileStat.st_size);
    printf("Number of Links: \t%zu\n",fileStat.st_nlink);
    printf("File inode: \t\t%zu\n",fileStat.st_ino);

    char cadena[MAX] = "----------";

    char *t = (S_ISDIR(fileStat.st_mode)) ? "d" : "-";
    char *ur = (fileStat.st_mode & S_IRUSR) ? "r" : "-";
    char *uw = (fileStat.st_mode & S_IWUSR) ? "w" : "-";
    char *ux = (fileStat.st_mode & S_IXUSR) ? "x" : "-";

    char *gr = (fileStat.st_mode & S_IRGRP) ? "r" : "-";
    char *gw = (fileStat.st_mode & S_IWGRP) ? "w" : "-";
    char *gx = (fileStat.st_mode & S_IXGRP) ? "x" : "-";

    char *or = (fileStat.st_mode & S_IROTH) ? "r" : "-";
    char *ow = (fileStat.st_mode & S_IWOTH) ? "w" : "-";
    char *ox = (fileStat.st_mode & S_IXOTH) ? "x" : "-";

    cadena[0] = *t;
    cadena[1] = *ur;
    cadena[2] = *uw;
    cadena[3] = *ux;
    cadena[4] = *gr;
    cadena[5] = *gw;
    cadena[6] = *gx;
    cadena[7] = *or;
    cadena[8] = *ow;
    cadena[9] = *ox;

    cadena[10] = '\0';
    //cadena[9] = '\0';
  	//printf("%s\n", h);
  	printf("%s\n", cadena);
    printf("File Permissions: \t");
    printf( (S_ISDIR(fileStat.st_mode)) ? "d" : "-");
    printf( (fileStat.st_mode & S_IRUSR) ? "r" : "-");
    printf( (fileStat.st_mode & S_IWUSR) ? "w" : "-");
    printf( (fileStat.st_mode & S_IXUSR) ? "x" : "-");
    printf( (fileStat.st_mode & S_IRGRP) ? "r" : "-");
    printf( (fileStat.st_mode & S_IWGRP) ? "w" : "-");
    printf( (fileStat.st_mode & S_IXGRP) ? "x" : "-");
    printf( (fileStat.st_mode & S_IROTH) ? "r" : "-");
    printf( (fileStat.st_mode & S_IWOTH) ? "w" : "-");
    printf( (fileStat.st_mode & S_IXOTH) ? "x" : "-");
    printf("\n\n");

    printf("The file %s a symbolic link\n", (S_ISLNK(fileStat.st_mode)) ? "is" : "is not");

    return 0;
}