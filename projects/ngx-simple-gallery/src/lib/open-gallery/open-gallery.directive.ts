import { Directive, ElementRef, HostListener, inject, Input, input } from '@angular/core';
import { ShowcaseDialogComponent } from '../showcase-dialog/showcase-dialog.component';
import { GalleryService } from '../core/service/gallery.service';
import { Dialog } from '@angular/cdk/dialog';
import { ModalConfig } from '../core/model/modal-config';
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

  public readonly openGallery = input([] as GalleryItem[]);

  constructor() {
    this.elementRef.nativeElement.style.cursor = 'pointer';
  }

  @Input()
  set startIndex(index: number) {
    this.galleryService.setItemIndex(index);
  }

  @Input()
  set modalConfig(modalConfig: ModalConfig) {
    this.galleryService.setModalConfig(modalConfig);
  }

  @HostListener('click') onClick(): void {
    this.galleryService.setGalleryItems(this.openGallery());
    this.dialog.open(ShowcaseDialogComponent);
  }
}
