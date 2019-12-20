import { Injectable } from '@angular/core';

import { createClient, Entry } from 'contentful';

const CONFIG = {
  space: 'rhxj9bxeew0k',
  accessToken: 'eWvWdc1XTz8oftcTJJ9uOZWYAOKW9jq7MCLp3QCbX2E',
  contentTypeIds: {
    volume: 'volume'
  },
};

export enum ContentTypeIds {
  Volume = 'volume',
  Song = 'song',
  HeaderContent = 'pageHeaderContent',
  FooterContent = 'pageFooterContent',
  HomePageContent = 'homePageContent',
  Update = 'update',
  BioPageContent = 'bioPageContent',
  CarolPageBlurbs = 'carolPageBlurbs',
  SongsPageContent = 'songsPageContent',
}

export const errorContent = 'NOTLOADED';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  private cdaClient = createClient({
    space: CONFIG.space,
    accessToken: CONFIG.accessToken,
  });

  constructor() { }

  getContent<T>(contentTypeId: ContentTypeIds, query?: object): Promise<Entry<T>[]> {
    return this.cdaClient.getEntries<T>(Object.assign({
      content_type: contentTypeId,
    }, query))
    .then(res => res.items);
  }
}

