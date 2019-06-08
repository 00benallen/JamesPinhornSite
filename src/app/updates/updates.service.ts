import { Injectable } from '@angular/core';
import { JsonAssetLoaderService } from '../json-asset-loader/json-asset-loader.service';
import { Observable } from 'rxjs';

export interface Update {
  title: string;
  description: string;
  link: string;
  linkDescription: string;
}

@Injectable({
  providedIn: 'root'
})
export class UpdatesService {

  constructor(private assetLoader: JsonAssetLoaderService) { }

  getUpdates(): Observable<Update[]> {

    return this.assetLoader.getFileData('latest/updates.json');

  }
}
