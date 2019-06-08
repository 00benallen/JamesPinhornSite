import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class JsonAssetLoaderService {

    constructor(private httpClient: HttpClient) {}

    /*
    JSON File contains list of music file names, its in assets, this version loads all
    */
    getFileData<Schema>(jsonFile: String): Observable<Schema> {

        return this.httpClient.get<Schema>('assets/' + jsonFile);

    }
}
