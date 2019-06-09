import { Component, OnInit, AfterViewChecked, Input} from '@angular/core';
import { MusicService, Collection } from './music-service';

@Component({
  selector: 'app-music-viewer',
  templateUrl: './music-viewer.component.html',
  styleUrls: ['./music-viewer.component.scss']
})
export class MusicViewerComponent implements OnInit, AfterViewChecked {

  @Input() public musicFile: string | undefined;
  @Input() public autoScroll = false;
  @Input() public loadMore = false;

  public musicCollections: Collection[] | undefined = undefined;
  public moreToLoad = false;
  public scrollToBottom = false;

  private loaded = 0;

  constructor(private musicService: MusicService) { }

  ngOnInit() {

    this.autoScroll = this.autoScroll !== undefined;
    this.loadMore = this.loadMore !== undefined;

    this.moreToLoad = true;

    this.scrollToBottom = false;

    if (this.musicFile) {
      const musicCollectionsObs = this.musicService.getMusicFileData(this.musicFile, 0);

      // We loaded one collection, assume there's more to load
      musicCollectionsObs.subscribe((collections: Collection[]) => {

        this.musicCollections = collections;

        this.loaded = 0;
        this.moreToLoad = true;
      });
    }
  }

  // This triggers a lot, basically when elements in view are changed (what we need to accomplish this)
  ngAfterViewChecked() {

    if (this.scrollToBottom && this.autoScroll) {

      // Scroll to the bottom when user clicks "Load More" or "Load All"
      const listWithLastCollection = document.querySelectorAll('div.last-collection');

      const el = listWithLastCollection[0];
      if (el) {
        el.scrollIntoView();
      }
    }

    this.scrollToBottom = false;
  }

  public onLoadMore(all?: boolean) {

    if (all && this.musicFile) {

      console.log('Calling music service');
      const musicCollectionsObs = this.musicService.getMusicFileData(this.musicFile);

      // We've loaded all files, so change state and remove the load buttons through this boolean
      musicCollectionsObs.subscribe((collections: Collection[]) => {

        this.musicCollections = collections;

        this.moreToLoad = false;
        this.scrollToBottom = true;
        this.loaded = collections.length - 1;
      });

    } else if (this.musicFile) {

      console.log('Calling music service');
      const musicCollectionsObs = this.musicService.getMusicFileData(this.musicFile, this.loaded + 1);

      musicCollectionsObs.subscribe((collections: Collection[]) => {

        this.musicCollections = collections;
        this.scrollToBottom = true;
        if (this.loaded === collections.length - 1) { // there's no more collections to load
          this.moreToLoad = false;
        } else { // we got more collections, so keep loading
          this.moreToLoad = true;
          this.loaded = collections.length - 1;
        }

      });

    }

  }

  public notEmpty(string: string) {
    return string !== '';
  }
}
