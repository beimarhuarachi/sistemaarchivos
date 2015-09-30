/*
 * Change the permissions of a list of files
 * to by read/write by the owner only
 */
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/stat.h>

int main( int argc, char **argv )
{

    //S_IRUSR 00400 owner has read permission
    //S_IWUSR 00200 owner has write permission
    //S_IXUSR 00100 owner has execute permission

    //S_IRGRP 00040 group has read permission
    //S_IWGRP 00020 group has write permission
    //S_IXGRP 00010 group has execute permission

    //S_IROTH 00004 others have read permission
    //S_IWOTH 00002 others have write permisson
    //S_IXOTH 00001 others have execute permission
    int i;
    int ecode = 0;

    for( i = 1; i < argc; i++ ) {
        if( chmod( argv[i], S_IRUSR | S_IWUSR | S_IXUSR) == -1 ) {
            perror( argv[i] );
            ecode++;
        }
    }

    return ecode;
}