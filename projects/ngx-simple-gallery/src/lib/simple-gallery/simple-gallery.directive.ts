import { Directive, ElementRef, HostListener, inject, Input, input, Renderer2 } from '@angular/core';
import { ShowcaseDialogComponent } from '../showcase-dialog/showcase-dialog.component';
import { GalleryService } from '../core/service/gallery.service';
import { Dialog } from '@angular/cdk/dialog';
import { GalleryConfig } from '../core/model/gallery-config';
import { GalleryItem } from '../core/model/gallery-item';
import { ServiceRegistry } from '../core/service/service-registry';
import { NoopScrollStrategy } from '@angular/cdk/overlay';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[simpleGallery]',
  standalone: true,
  providers: [GalleryService],
})
export class SimpleGalleryDirective {
  private readonly dialog = inject(Dialog);
  private readonly elementRef = inject(ElementRef);
  private readonly galleryService: GalleryService;
  private readonly galleryServices = inject(ServiceRegistry.GALLERY_SERVICES);
  private readonly renderer = inject(Renderer2);
  private readonly instanceId: string;

  public readonly simpleGallery = input([] as GalleryItem[], { alias: 'galleryItems' });

  public constructor() {
    this.instanceId = ServiceRegistry.randomInstanceId();
    this.galleryServices.set(this.instanceId, inject(GalleryService));
    this.galleryService = this.galleryServices.get(this.instanceId)!;

    this.elementRef.nativeElement.style.cursor = 'pointer';
  }

  @Input()
  public set galleryConfig(galleryConfig: GalleryConfig) {
    this.galleryService.applyGalleryConfig(galleryConfig);
  }

  @HostListener('click')
  public onClick(): void {
    if (this.simpleGallery().length > 0) {
      this.galleryService.setGalleryItems(this.simpleGallery());
      this.dialog.open(ShowcaseDialogComponent, {
        data: this.instanceId,
        scrollStrategy: new NoopScrollStrategy()
      });
    } else {
      this.elementRef.nativeElement.style.backgroundColor = 'red';
      this.elementRef.nativeElement.style.padding = '0.5rem 1rem 0.5rem 1rem';
      this.elementRef.nativeElement.style.fontSize = '1.5rem';
      this.renderer.setProperty(
        this.elementRef.nativeElement,
        'innerHTML',
        `<p>${this.galleryService.getLibConfig().emptyMessage}</p>`,
      );
    }
  }
}
