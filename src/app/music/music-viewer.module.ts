import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MusicService } from './music-service';
import { MaterialModule } from '../material/material.module';
import { MusicViewerComponent } from './music-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [MusicService],
  declarations: [MusicViewerComponent],
  exports: [MusicViewerComponent]
})
export class MusicViewerModule { }
