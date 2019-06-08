import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonAssetLoaderModule } from '../json-asset-loader/json-asset-loader.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [JsonAssetLoaderModule]
})
export class UpdatesModule { }
