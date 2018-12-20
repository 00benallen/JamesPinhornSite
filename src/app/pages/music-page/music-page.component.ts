import { Component, OnInit, AfterViewChecked} from '@angular/core';
import { MusicService, Collection } from './music-service';

const songDataFile = 'original-song-collections/original-songs.json'

@Component({
  selector: 'app-music-page',
  templateUrl: './music-page.component.html',
  styleUrls: ['./music-page.component.scss']
})
export class MusicPageComponent implements OnInit, AfterViewChecked {

  public musicCollections: Collection[]
  public moreToLoad: boolean
  public scrollToBottom: boolean

  private loaded: number

  constructor(private musicService: MusicService) {

    this.moreToLoad = false

  }

  ngOnInit() {

    this.moreToLoad = true
    this.scrollToBottom = true
    console.log("Calling music service")
    let musicCollectionsObs = this.musicService.getMusicFileData(songDataFile, 0)

    //We loaded one collection, assume there's more to load
    
    musicCollectionsObs.subscribe((collections: Collection[]) => {

      this.musicCollections = collections

      this.loaded = 0;
      this.moreToLoad = true
    })

  }

  //This triggers a lot, basically when elements in view are changed (what we need to accomplish this)
  ngAfterViewChecked() {

    if(this.scrollToBottom) {
      //Scroll to the bottom when user clicks "Load More" or "Load All"
      let listWithLastCollection = document.querySelectorAll('div.last-collection')

      let el = listWithLastCollection[0]
      if(el) {
        el.scrollIntoView()
      }
    } 

    if(!this.moreToLoad) {
      this.scrollToBottom = false
    }
  }

  public loadMore(all?: boolean) {

    if(all) {

      console.log("Calling music service")
      let musicCollectionsObs = this.musicService.getMusicFileData(songDataFile)

      //We've loaded all files, so change state and remove the load buttons through this boolean
      musicCollectionsObs.subscribe((collections: Collection[]) => {

        this.musicCollections = collections

        this.moreToLoad = false
        this.loaded = collections.length-1
      })

    } else {

      console.log("Calling music service")
      let musicCollectionsObs = this.musicService.getMusicFileData(songDataFile, this.loaded+1)

      musicCollectionsObs.subscribe((collections: Collection[]) => {

        this.musicCollections = collections

        if(this.loaded == collections.length-1) { //there's no more collections to load
          this.moreToLoad = false
        } else { // we got more collections, so keep loading
          this.moreToLoad = true
          this.loaded = collections.length-1
        }

      })

    }

  }
}
