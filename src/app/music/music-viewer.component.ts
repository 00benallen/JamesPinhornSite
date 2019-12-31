import { Component, AfterViewChecked, Input, OnInit} from '@angular/core';
import { ContentfulMusicService, Volume } from './contentful-music.service';

@Component({
  selector: 'app-music-viewer',
  templateUrl: './music-viewer.component.html',
  styleUrls: ['./music-viewer.component.scss']
})
export class MusicViewerComponent implements OnInit, AfterViewChecked {

  @Input() public autoScroll = false;
  @Input() public loadMore = false;
  @Input() public category: 'original song' | 'carol' | undefined;

  public volumes: Volume[] | undefined;
  private allVolumes: Volume[] | undefined;
  public loadingVolumes = true;
  public volumeIndex = 0;
  public moreToLoad = false;
  public scrollToBottom = false;

  constructor(private contentfulMusicService: ContentfulMusicService) {

    this.scrollToBottom = false;

  }

  ngOnInit(): void {
    this.contentfulMusicService.getVolumes()
    .then(v => {
      this.allVolumes = v.filter(vi => vi.category === this.category).sort(this.compareVolumes);

      if (this.category === 'original song') {
        this.allVolumes = this.allVolumes.reverse(); // show latest volumes first
      }

      if (this.allVolumes) {
        this.volumes = [];
        this.volumes.push(this.allVolumes[this.volumeIndex++]);
        this.loadingVolumes = false;
      } else {
        console.error('Array of all volumes unexpectedly null on initial load');
      }

      if (this.allVolumes.length > 1) {
        this.moreToLoad = true;
      } else {
        this.moreToLoad = false;
      }
    });
  }

  compareVolumes(a: Volume, b: Volume): number {
    return a.title.localeCompare(b.title);
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

    if (all && this.allVolumes) {
      this.volumes = this.allVolumes;
      this.moreToLoad = false;
    } else if (this.allVolumes) {
      const newVolumeToShow = this.allVolumes[this.volumeIndex++];

      if (newVolumeToShow && this.volumes) {
        this.volumes.push(newVolumeToShow);
      } else if (!newVolumeToShow) {
        this.moreToLoad = false; // we've reached the end of the volumes
      } else {
        console.error('No volumes to show!');
      }
    } else {
      console.error('Array of all volumes unexpectedly null on load more');
    }

  }

  notEmpty(s: string): boolean {
    return s !== '';
  }
}
