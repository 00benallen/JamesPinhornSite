import { MusicViewerModule } from './music-viewer.module';

describe('MusicViewerModuleModule', () => {
  let musicViewerModuleModule: MusicViewerModule;

  beforeEach(() => {
    musicViewerModuleModule = new MusicViewerModule();
  });

  it('should create an instance', () => {
    expect(musicViewerModuleModule).toBeTruthy();
  });
});
