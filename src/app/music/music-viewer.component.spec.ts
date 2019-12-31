import { async, ComponentFixture, TestBed, flushMicrotasks, fakeAsync, flush, tick } from '@angular/core/testing';

import { MusicViewerComponent } from './music-viewer.component';
import { Component } from '@angular/core';
import { ContentfulMusicService, Volume, Song } from './contentful-music.service';
import { Sys, Entry } from 'contentful';
import { By } from '@angular/platform-browser';

@Component({ selector: 'app-card', template: '<ng-content></ng-content>' })
class CardComponentStub {}

describe('MusicViewerComponent', () => {
  let component: MusicViewerComponent;
  let fixture: ComponentFixture<MusicViewerComponent>;
  let service: jasmine.SpyObj<ContentfulMusicService>;

  beforeEach(async(() => {

    const spy = jasmine.createSpyObj('ContentfulMusicService', ['getVolumes']);

    TestBed.configureTestingModule({
      declarations: [ MusicViewerComponent, CardComponentStub ],
      providers: [ { provide: ContentfulMusicService, useValue: spy } ]
    })
    .compileComponents();

    service = TestBed.get(ContentfulMusicService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicViewerComponent);
    component = fixture.componentInstance;
    component.category = 'original song';
    service.getVolumes.and.returnValue(Promise.resolve([{title: 'test', songs: [], note: '', category: 'original song'}]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reverse volumes of original songs and display the first volume', fakeAsync(() => {
    fixture = TestBed.createComponent(MusicViewerComponent);
    component = fixture.componentInstance;
    const testVolumes: Volume[] = [
      {title: 'first', songs: [], note: '', category: 'original song'},
      {title: 'second', songs: [
        {
          sys: {} as Sys,
          fields: {
            title: 'Song', fileLocation: '', lyricsFileLocation: '', note: 'test'
          }
        } as Entry<Song>], note: '', category: 'original song'}];
    service.getVolumes.and.returnValue(Promise.resolve(testVolumes));
    component.category = 'original song';
    fixture.detectChanges();
    flushMicrotasks();
    fixture.detectChanges();

    expect(component.volumes).toBeDefined();
    expect(component.volumes).toEqual(testVolumes.reverse().slice(0, 1));

    expectVolumeDisplayed(testVolumes[0]);

  }));

  it('should not reverse volumes of carols and display the first volume', fakeAsync(() => {
    fixture = TestBed.createComponent(MusicViewerComponent);
    component = fixture.componentInstance;
    const testVolumes: Volume[] = [
      {title: 'first', songs: [], note: '', category: 'carol'},
      {title: 'second', songs: [
        {
          sys: {} as Sys,
          fields: {
            title: 'Song', fileLocation: '', lyricsFileLocation: '', note: 'test'
          }
        } as Entry<Song>], note: '', category: 'carol'}];
    service.getVolumes.and.returnValue(Promise.resolve(testVolumes));
    component.category = 'carol';
    fixture.detectChanges();
    flushMicrotasks();
    fixture.detectChanges();

    expect(component.volumes).toBeDefined();
    expect(component.volumes).toEqual(testVolumes.slice(0, 1));

    expectVolumeDisplayed(testVolumes[0]);

  }));

  // it('should add a new volume to the view when the Load More button is clicked', fakeAsync( async () => {

  //   fixture = TestBed.createComponent(MusicViewerComponent);
  //   component = fixture.componentInstance;
  //   const testVolumes: Volume[] = [
  //     {title: 'first', songs: [], note: '', category: 'original song'},
  //     {title: 'second', songs: [
  //       {
  //         sys: {} as Sys,
  //         fields: {
  //           title: 'Song', fileLocation: '', lyricsFileLocation: '', note: 'test'
  //         }
  //       } as Entry<Song>], note: '', category: 'original song'},
  //     ];
  //   service.getVolumes.and.returnValue(Promise.resolve(testVolumes));
  //   component.category = 'original song';
  //   component.loadMore = true;
  //   fixture.detectChanges();
  //   flushMicrotasks();
  //   fixture.detectChanges();

  //   expectVolumeDisplayed(testVolumes[1]);

  //   const loadMoreButton = fixture.debugElement.query(By.css('button[data-testid="load-more"]'));
  //   console.log(loadMoreButton.nativeElement);
  //   loadMoreButton.triggerEventHandler('click', undefined);
  //   tick(1000);
  //   // await fixture.whenStable();
  //   fixture.detectChanges();
  //   // fixture.detectChanges();
  //   expectVolumeDisplayed(testVolumes[0]);

  // }));

  const expectVolumeDisplayed = (v: Volume) => {
    const volumeTitle = fixture.debugElement.query(By.css('h2'));
    expect(volumeTitle.nativeElement.innerText).toEqual(v.title);
    v.songs.forEach(s => expectSongDisplayed(s.fields));
  };

  const expectSongDisplayed = (s: Song) => {
    const songTitle = fixture.debugElement.query(By.css('h4'));
    expect(songTitle.nativeElement.innerText).toEqual(s.title);
    const note = fixture.debugElement.query(By.css('div.file-container p'));
    expect(note.nativeElement.innerText).toEqual(s.note);
  };
});
