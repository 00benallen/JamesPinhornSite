import { Component, OnInit, Input } from '@angular/core';
import { InfoCard } from '../bio-page.component';
import { Entry } from 'contentful';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {

  @Input() infoCards: Entry<InfoCard>[] | undefined;

  constructor() { }

  ngOnInit() {
    console.log(this.infoCards);
  }

}
