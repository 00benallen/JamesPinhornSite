import { Component, OnInit } from '@angular/core';
import { MusicService, FileList } from './music-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-music-page',
  templateUrl: './music-page.component.html',
  styleUrls: ['./music-page.component.css']
})
export class MusicPageComponent implements OnInit {

  public musicFiles: Observable<String[]>

  constructor(private musicService: MusicService) {

    this.musicFiles = musicService.getMusicFileNames('original-song-collections/original-songs.json')

  }

  ngOnInit() {
  }

}
