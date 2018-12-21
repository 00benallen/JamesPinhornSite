import { Component, OnInit, AfterViewChecked, Input} from '@angular/core';
import { MusicService, Collection } from './music-service';

@Component({
  selector: 'app-music-viewer',
  templateUrl: './music-viewer.component.html',
  styleUrls: ['./music-viewer.component.scss']
})
export class MusicViewerComponent implements OnInit, AfterViewChecked {

  @Input('musicFile') public songDataFile: string
  @Input('autoScroll') public autoScroll: boolean
  @Input('loadMore') public shouldLoadMore: boolean

  public musicCollections: Collection[]
  public moreToLoad: boolean
  public scrollToBottom: boolean

  private loaded: number

  constructor(private musicService: MusicService) {

    this.moreToLoad = false

  }

  ngOnInit() {

    this.autoScroll = this.autoScroll !== undefined;
    this.shouldLoadMore = this.shouldLoadMore !== undefined;

    this.moreToLoad = true

    this.scrollToBottom = true

    let musicCollectionsObs = this.musicService.getMusicFileData(this.songDataFile, 0)

    //We loaded one collection, assume there's more to load
    
    musicCollectionsObs.subscribe((collections: Collection[]) => {

      this.musicCollections = collections

      this.loaded = 0;
      this.moreToLoad = true
    })

  }

  //This triggers a lot, basically when elements in view are changed (what we need to accomplish this)
  ngAfterViewChecked() {

    if(this.scrollToBottom && this.autoScroll) {
      
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
      let musicCollectionsObs = this.musicService.getMusicFileData(this.songDataFile)

      //We've loaded all files, so change state and remove the load buttons through this boolean
      musicCollectionsObs.subscribe((collections: Collection[]) => {

        this.musicCollections = collections

        this.moreToLoad = false
        this.loaded = collections.length-1
      })

    } else {

      console.log("Calling music service")
      let musicCollectionsObs = this.musicService.getMusicFileData(this.songDataFile, this.loaded+1)

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

  public notEmpty(string: string) {
    return string !== ""
  }
}
