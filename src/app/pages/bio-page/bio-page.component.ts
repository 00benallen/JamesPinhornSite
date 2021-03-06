import { Component } from '@angular/core';
import { ContentfulService, ContentTypeIds } from 'src/app/contentful.service';
import { Entry, Asset } from 'contentful';

export interface InfoCard {
  title: string;
  body: string;
}

interface BioPageContent {
  bannerImage: Entry<Asset>;
  bannerImageOverlayText: string;
  infoCards: Entry<InfoCard>[];
}

@Component({
  selector: 'app-bio-page',
  templateUrl: './bio-page.component.html',
  styleUrls: ['./bio-page.component.scss']
})
export class BioPageComponent {

  content: Promise<BioPageContent> | undefined;

  constructor(contentfulService: ContentfulService) {

    this.content = contentfulService.getContent<BioPageContent>(ContentTypeIds.BioPageContent).then(
      c => {
        return c[0].fields;
      }
    );

  }

}
