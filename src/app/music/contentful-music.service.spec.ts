import { TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing';

import { ContentfulMusicService, Volume } from './contentful-music.service';
import { ContentfulService } from '../contentful.service';
import { Entry } from 'contentful';

describe('ContentfulMusicService', () => {
  let service: ContentfulMusicService;
  let depService: jasmine.SpyObj<ContentfulService>;


  beforeEach(() => {
    const spy = jasmine.createSpyObj('ContentfulService', ['getContent']);

    const stubVolumes = [{fields: 'fake-volume'}] as unknown as Entry<Volume>[];
    spy.getContent.and.returnValue(Promise.resolve(stubVolumes));

    TestBed.configureTestingModule({
      // Provide both the service-to-test and its (spy) dependency
      providers: [
        ContentfulMusicService,
        { provide: ContentfulService, useValue: spy }
      ]
    });

    // Inject both the service-to-test and its (spy) dependency
    depService = TestBed.get(ContentfulService);
  });

  it('should load volumes when created', fakeAsync( async () => {
    service = TestBed.get(ContentfulMusicService);
    flushMicrotasks();
    expect(service).toBeTruthy();
    const expectedVolume = ['fake-volume'] as unknown as Volume[];
    expect(await service.getVolumes()).toEqual(expectedVolume);
    expect(depService.getContent).toHaveBeenCalledTimes(1);
  }));

  it('should return cached volumes after load', fakeAsync( async () => {
    service = TestBed.get(ContentfulMusicService);
    flushMicrotasks(); // resolve initial promise from dep service
    expect(depService.getContent).toHaveBeenCalledTimes(1); // dep service called on service construction
    depService.getContent.calls.reset();
    await service.getVolumes();
    expect(depService.getContent).toHaveBeenCalledTimes(0); // dependancy service not called second time
  }));
});
