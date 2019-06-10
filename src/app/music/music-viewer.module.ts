import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MusicService } from './music-service';
import { MusicViewerComponent } from './music-viewer.component';
import { JsonAssetLoaderModule } from '../json-asset-loader/json-asset-loader.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    JsonAssetLoaderModule
  ],
  providers: [MusicService],
  declarations: [MusicViewerComponent],
  exports: [MusicViewerComponent]
})
export class MusicViewerModule { }
