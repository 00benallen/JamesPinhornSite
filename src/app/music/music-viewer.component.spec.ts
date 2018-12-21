import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicViewerComponent } from './music-viewer.component';

describe('MusicPageComponent', () => {
  let component: MusicViewerComponent;
  let fixture: ComponentFixture<MusicViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
