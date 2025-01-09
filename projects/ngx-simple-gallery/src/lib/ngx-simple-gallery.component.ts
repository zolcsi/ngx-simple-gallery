import { ChangeDetectionStrategy, Component, computed, inject, Input, Signal } from '@angular/core';
import { GalleryItem } from './core/model/gallery-item';
import { Dialog } from '@angular/cdk/dialog';
import { ShowcaseDialogComponent } from './showcase-dialog/showcase-dialog.component';
import { GalleryService } from './core/service/gallery.service';
import { GalleryConfig } from './core/model/gallery-config';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ngx-simple-gallery',
  standalone: true,
  imports: [],
  templateUrl: './ngx-simple-gallery.component.html',
  styleUrl: './ngx-simple-gallery.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxSimpleGalleryComponent {
  private readonly dialog = inject(Dialog);
  private readonly galleryService = inject(GalleryService);

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
    this.items = this.galleryService.galleryItems;
    this.emptyMessage = computed(() => this.galleryService.getLibConfig().emptyMessage);
    this.thumbnailSize = computed(() => this.galleryService.getLibConfig().galleryThumbnailSize);
  }

  openDialog(index: number): void {
    this.galleryService.setItemIndex(index);
    this.dialog.open(ShowcaseDialogComponent);
  }
}
