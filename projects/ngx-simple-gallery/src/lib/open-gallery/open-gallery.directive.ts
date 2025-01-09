import { Directive, ElementRef, HostListener, inject, Input, input, Renderer2 } from '@angular/core';
import { ShowcaseDialogComponent } from '../showcase-dialog/showcase-dialog.component';
import { GalleryService } from '../core/service/gallery.service';
import { Dialog } from '@angular/cdk/dialog';
import { GalleryConfig } from '../core/model/gallery-config';
import { GalleryItem } from '../core/model/gallery-item';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[openGallery]',
  standalone: true,
})
export class OpenGalleryDirective {
  private readonly dialog = inject(Dialog);
  private readonly elementRef = inject(ElementRef);
  private readonly galleryService = inject(GalleryService);
  private readonly renderer = inject(Renderer2);

  public readonly openGallery = input([] as GalleryItem[]);

  constructor() {
    this.elementRef.nativeElement.style.cursor = 'pointer';
  }

  @Input()
  set galleryConfig(galleryConfig: GalleryConfig) {
    this.galleryService.applyGalleryConfig(galleryConfig);
  }

  @HostListener('click') onClick(): void {
    if (this.openGallery().length > 0) {
      this.galleryService.setGalleryItems(this.openGallery());
      this.dialog.open(ShowcaseDialogComponent);
    } else {
      this.elementRef.nativeElement.style.backgroundColor = 'red';
      this.elementRef.nativeElement.style.padding = '0.5rem 1rem 0.5rem 1rem';
      this.elementRef.nativeElement.style.fontSize = '1.5rem';
      this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', `<p>${this.galleryService.getLibConfig().emptyMessage}</p>`);
    }
  }
}
