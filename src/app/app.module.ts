import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { BioPageComponent } from './pages/bio-page/bio-page.component';
import { CarolsPageComponent } from './pages/carols-page/carols-page.component';
import { MusicPageComponent } from './pages/music-page/music-page.component';
import { FormsModule } from '@angular/forms';
import { AboutMeComponent } from './pages/bio-page/about-me/about-me.component';
import { HttpClientModule } from '@angular/common/http';
import { MusicViewerModule } from './music/music-viewer.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { OverlayImageComponent } from './overlay-image/overlay-image.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CardModule } from './card/card.module';

const appRoutes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'bio', component: BioPageComponent },
  { path: 'carols', component: CarolsPageComponent},
  { path: 'music', component: MusicPageComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  declarations: [
    AppComponent,
    BioPageComponent,
    CarolsPageComponent,
    MusicPageComponent,
    AboutMeComponent,
    HomePageComponent,
    OverlayImageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
    MusicViewerModule,
    CardModule,
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
