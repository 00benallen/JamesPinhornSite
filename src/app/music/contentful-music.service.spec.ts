import { TestBed } from '@angular/core/testing';

import { ContentfulMusicService } from './contentful-music.service';

describe('ContentfulMusicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContentfulMusicService = TestBed.get(ContentfulMusicService);
    expect(service).toBeTruthy();
  });
});
