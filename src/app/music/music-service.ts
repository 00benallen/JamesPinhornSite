import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

import { map, share } from 'rxjs/operators';

export interface File {
    fileName: string
    displayName: string
    note: string
    lyricsFile: string
}

export interface Collection {
    name: string
    note: string
    files: File[]
}

export interface FileList {
    rootFolder: string
    fileExtension: string
    collections: Collection[]
}

@Injectable()
export class MusicService {

    constructor(private httpClient: HttpClient) {}

    /*
    JSON File contains list of music file names, its in assets, this version loads all
    */
    getMusicFileData(jsonFile: String, upToCollectionIndex?: number): Observable<Collection[]> {

        return this.httpClient.get<FileList>('assets/' + jsonFile).pipe(
            map((fileList: FileList) => {

                let allCollections = fileList.collections

                let collectionsToReturn = []
                if((upToCollectionIndex || upToCollectionIndex == 0) && upToCollectionIndex < allCollections.length) {

                    for(let i = 0; i <= upToCollectionIndex; i++) {
                        let collection = allCollections[i]

                        let correctedFiles = this.correctFileNames(collection.files, fileList.rootFolder, fileList.fileExtension)

                        collection.files = correctedFiles

                        collectionsToReturn.push(collection)
                    }

                    return collectionsToReturn

                } else {

                    for(let collection of fileList.collections) {

                        let correctedFiles = this.correctFileNames(collection.files, fileList.rootFolder, fileList.fileExtension)

                        collection.files = correctedFiles

                    }

                    return fileList.collections

                }
            })
        )
    }

    private correctFileNames(files: File[], rootFolder: string, fileExtension: string): File[] {
        let newFileArray: File[] = []
        for(let file of files) {
            file.fileName = rootFolder + file.fileName + '.' + fileExtension

            if(file.lyricsFile !== "") {
                file.lyricsFile = rootFolder + file.lyricsFile
            }
            newFileArray.push(file)
        }

        return newFileArray
    }
}