import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MusicViewerComponent } from './music-viewer.component';
import { CardModule } from '../card/card.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    CardModule,
  ],
  providers: [],
  declarations: [MusicViewerComponent],
  exports: [MusicViewerComponent]
})
export class MusicViewerModule { }
