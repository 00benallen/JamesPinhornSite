import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-overlay-image',
  templateUrl: './overlay-image.component.html',
  styleUrls: ['./overlay-image.component.scss']
})
export class OverlayImageComponent {

  @Input() imageSrc: string | undefined;
  @Input() imageText: string | undefined;
  @Input() size: 'small' | 'medium' | 'large' = 'small';

}
