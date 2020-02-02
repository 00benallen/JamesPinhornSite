import { Component } from '@angular/core';
import { ContentfulService, ContentTypeIds } from 'src/app/contentful.service';

export interface HomePageContent {
  bannerImage: any;
  bannerImageOverlayText: string;
  navigationSectionTitle: string;
  updatesSectionTitle: string;
}

export interface Update {
  title: string;
  body: string;
  link: string;
  linkDescription: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  content: HomePageContent | undefined;
  updates: Update[] | undefined;

  constructor(
    contentfulService: ContentfulService) {

    contentfulService.getContent<HomePageContent>(ContentTypeIds.HomePageContent).then(
      c => {
        this.content = c[0].fields;
      }
    );

    contentfulService.getContent<Update>(ContentTypeIds.Update).then(
      c => {
        this.updates = c.map(e => e.fields);
      }
    );
  }

}
