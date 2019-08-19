import { Component } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private currentRoute = '/';
  private routes = [
    { url: '/home', label: 'Home'},
    { url: '/bio', label: 'Bio'},
    { url: '/carols', label: 'Carols'},
    { url: '/music', label: 'My Songs'},
  ];

  constructor(router: Router) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd ) {
        this.currentRoute = event.url;
      }
    });
  }

  isSelected(button: '/home' | '/bio' | '/carols' | '/music'): boolean {
    return button === this.currentRoute;
  }
}
