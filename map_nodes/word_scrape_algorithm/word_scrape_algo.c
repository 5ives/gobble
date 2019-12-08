#include <stdio.h>

int main (void) {
    FILE *word_scrape = fopen("C:\\Users\\ivesp\\Desktop\\gobble-master\\word_scrape.txt", "r");
    FILE *map_markers = fopen("C:\\Users\\ivesp\\Desktop\\gobble-master\\map_markers.xml", "w");

    fputs("<markers>", map_markers);

    char c = fgetc(word_scrape);
    int ved_flag = 0;

    while ((c = fgetc(word_scrape)) != EOF) {
        if (c == 'v') {
            if ((c = fgetc(word_scrape)) == 'e') {
                if ((c = fgetc(word_scrape)) == 'd') {
                    ved_flag = 1;
                }
            }
        }

        if (c == '>' && ved_flag == 1) {
            fputs("lat=\"", map_markers);
            while ((c = fgetc(word_scrape)) != ',') {
                fputc(c, map_markers);
                
            }
            fputs("lng=\"", map_markers);
            while ((c = fgetc(word_scrape)) != '<') {
                fputc(c, map_markers);
            }
            fputc('\n', map_markers);
            ved_flag = 0;
        }

    }
    fputs("</markers>", map_markers);
    return 0;
}