import { Injectable } from '@angular/core';
import { ContentfulService, ContentTypeIds } from '../contentful.service';
import { Entry } from 'contentful';

export interface Volume {
    title: string;
    songs: Entry<Song>[];
    note: string;
    category: 'original song' | 'carol';
}

export interface Song {
    title: string;
    fileLocation: string;
    lyricsFileLocation: string;
    note: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContentfulMusicService {

  private volumes: Volume[] | undefined;

  constructor(private contentfulService: ContentfulService) {
    this.getVolumes();
  }

  public async getVolumes(): Promise<Volume[]> {
    if (this.volumes) {
      return Promise.resolve(this.volumes);
    } else {
      const v = await this.contentfulService
        .getContent<Volume>(ContentTypeIds.Volume);
      const mappedVolumes = v.map(vi => vi.fields);
      this.volumes = mappedVolumes;
      return mappedVolumes;
    }
  }
}
