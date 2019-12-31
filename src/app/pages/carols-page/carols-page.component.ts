import { Component, OnInit } from '@angular/core';
import { ContentfulService, ContentTypeIds } from 'src/app/contentful.service';

interface CarolsPageBlurbs {
  carolsPageIntroText: string;
  carolsPageInterviewDescription: string;
}

@Component({
  selector: 'app-carols-page',
  templateUrl: './carols-page.component.html',
  styleUrls: ['./carols-page.component.scss']
})
export class CarolsPageComponent {

  blurbs: CarolsPageBlurbs | undefined;

  constructor(contentfulService: ContentfulService) {

    contentfulService.getContent<CarolsPageBlurbs>(ContentTypeIds.CarolPageBlurbs).then(
      c => this.blurbs = c[0].fields
    );

  }
}
