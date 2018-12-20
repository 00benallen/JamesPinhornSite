import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { BioPageComponent } from './pages/bio-page/bio-page.component';
import { CarolsPageComponent } from './pages/carols-page/carols-page.component';
import { MusicPageComponent } from './pages/music-page/music-page.component';
import { LoginDialogComponent } from './login/login-dialog.component';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login/login.service';
import { AboutMeComponent } from './pages/bio-page/about-me/about-me.component';
import { MusicService } from './pages/music-page/music-service';
import { HttpClientModule } from '@angular/common/http';

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
    MusicPageComponent,
    LoginDialogComponent,
    AboutMeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(
      appRoutes,
      //{ enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule
  ],
  providers: [LoginService, MusicService],
  bootstrap: [AppComponent],
  entryComponents: [LoginDialogComponent]
})
export class AppModule { }
