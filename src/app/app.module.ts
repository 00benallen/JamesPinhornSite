import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { BioPageComponent } from './pages/bio-page/bio-page.component';
import { CarolsPageComponent } from './pages/carols-page/carols-page.component';
import { MusicPageComponent } from './pages/music-page/music-page.component';

const appRoutes: Routes = [
  { path: 'bio', component: BioPageComponent },
  { path: 'carols', component: CarolsPageComponent},
  { path: 'music', component: MusicPageComponent},
  { path: '', pathMatch: 'full',redirectTo: 'bio'}
];

@NgModule({
  declarations: [
    AppComponent,
    BioPageComponent,
    CarolsPageComponent,
    MusicPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
