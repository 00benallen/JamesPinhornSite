import { Component } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { ContentfulService, errorContent, ContentTypeIds } from './contentful.service';

interface HeaderContent {
  title: string;
  subtitle: string;
  navigationButtonText: string[];
}

interface FooterContent {
  facebookLink: string;
  facebookLinkLabel: string;
  youtubeLink: string;
  youtubeLinkLabel: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public headerContent: HeaderContent | undefined;
  public footerContent: FooterContent | undefined;

  private currentRoute = '/';
  routes = [
    { url: '/home'},
    { url: '/bio'},
    { url: '/carols'},
    { url: '/music'},
  ];

  constructor(
    router: Router,
    contentfulService: ContentfulService) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd ) {
        this.currentRoute = event.url;
      }
    });

    contentfulService.getContent<HeaderContent>(ContentTypeIds.HeaderContent).then(
      c => this.headerContent = c[0].fields
    );

    contentfulService.getContent<FooterContent>(ContentTypeIds.FooterContent).then(
      c => this.footerContent = c[0].fields
    );
  }

  isSelected(button: '/home' | '/bio' | '/carols' | '/music'): boolean {
    return button === this.currentRoute;
  }
}
