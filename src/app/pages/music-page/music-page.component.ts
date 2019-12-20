import { Component} from '@angular/core';
import { Entry, Asset } from 'contentful';
import { ContentfulService, ContentTypeIds } from 'src/app/contentful.service';

export interface MusicPageContent {
  bannerImage: any;
  bannerImageOverlayText: string;
}

@Component({
  selector: 'app-music-page',
  templateUrl: './music-page.component.html',
  styleUrls: ['./music-page.component.scss']
})
export class MusicPageComponent {

  content: MusicPageContent | undefined;

  constructor(contentfulService: ContentfulService) {

    contentfulService.getContent<MusicPageContent>(ContentTypeIds.SongsPageContent).then(
      c => this.content = c[0].fields
    );

  }
}
