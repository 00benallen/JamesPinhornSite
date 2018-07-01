import { NgModule } from "@angular/core";

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule, MatDividerModule, MatTabsModule, MatExpansionModule} from '@angular/material'

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const modules = [
  BrowserAnimationsModule,
  MatSidenavModule,
  MatButtonModule,
  MatDividerModule,
  MatTabsModule,
  MatExpansionModule
]

@NgModule({
  imports: [
    modules
  ],
  exports: [
    modules
  ]
})
export class MaterialModule { }
