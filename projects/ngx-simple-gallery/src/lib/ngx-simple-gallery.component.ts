import { ChangeDetectionStrategy, Component, computed, inject, Input, Signal } from '@angular/core';
import { GalleryItem } from './core/model/gallery-item';
import { Dialog } from '@angular/cdk/dialog';
import { ShowcaseDialogComponent } from './showcase-dialog/showcase-dialog.component';
import { GalleryConfig } from './core/model/gallery-config';
import { GALLERY_SERVICES } from './core/service/gallery-service-registry';
import { GalleryService } from './core/service/gallery.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ngx-simple-gallery',
  standalone: true,
  templateUrl: './ngx-simple-gallery.component.html',
  styleUrl: './ngx-simple-gallery.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GalleryService]
})
export class NgxSimpleGalleryComponent {
  private readonly dialog = inject(Dialog);
  private readonly galleryService: GalleryService;
  private readonly galleryServices = inject(GALLERY_SERVICES);
  private readonly instanceId: string;

  protected readonly emptyMessage: Signal<string | undefined>;
  protected readonly items: Signal<GalleryItem[]>;
  protected readonly thumbnailSize: Signal<number | undefined>;

  @Input({ required: true })
  set galleryItems(items: GalleryItem[]) {
    this.galleryService.setGalleryItems(items);
  }

  @Input({ required: false })
  set galleryConfig(galleryConfig: GalleryConfig) {
    this.galleryService.applyGalleryConfig(galleryConfig);
  }

  public constructor() {
    this.instanceId = Math.random().toString(36).substring(2, 10);
    this.galleryServices.set(this.instanceId, inject(GalleryService));
    this.galleryService = this.galleryServices.get(this.instanceId)!;

    this.items = this.galleryService.galleryItems;
    this.emptyMessage = computed(() => this.galleryService.getLibConfig().emptyMessage);
    this.thumbnailSize = computed(() => this.galleryService.getLibConfig().galleryThumbnailSize);
  }

  public openDialog(index: number): void {
    this.galleryService.setItemIndex(index);
    this.dialog.open(ShowcaseDialogComponent, {
      data: this.instanceId,
    });
  }
}
