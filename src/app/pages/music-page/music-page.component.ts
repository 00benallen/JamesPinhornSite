import { Component, OnInit} from '@angular/core';
import { Update, UpdatesService } from 'src/app/updates/updates.service';
import { Observable } from 'rxjs';

const songDataFile = 'original-song-collections/original-songs.json';

@Component({
  selector: 'app-music-page',
  templateUrl: './music-page.component.html',
  styleUrls: ['./music-page.component.scss']
})
export class MusicPageComponent {

  constructor() { }
}
