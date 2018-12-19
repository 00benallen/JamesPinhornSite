import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

import { map } from 'rxjs/operators';

export interface FileList {
    rootFolder: string
    fileExtension: string
    files: string[]
}

@Injectable()
export class MusicService {

    constructor(private httpClient: HttpClient) {}

    /*
    JSON File contains list of music file names, its in assets
    */
    getMusicFileNames(jsonFile: String): Observable<String[]> {

        return this.httpClient.get<FileList>('assets/' + jsonFile).pipe(
            map((fileList: FileList) => {
            
              let newFileList: String[] = []
              for(let file of fileList.files) {
                newFileList.push(fileList.rootFolder + file + '.' + fileList.fileExtension)
              }
      
              return newFileList
            })
        )

    }
}