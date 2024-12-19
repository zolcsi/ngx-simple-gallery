import { ChangeDetectionStrategy, Component, inject, Input, input, Signal } from '@angular/core';
import { GalleryItem } from './core/model/gallery-item';
import { Constants } from './core/constants';
import { Dialog } from '@angular/cdk/dialog';
import { ShowcaseDialogComponent } from './showcase-dialog/showcase-dialog.component';
import { GalleryService } from './core/service/gallery.service';
import { ModalConfig } from './core/model/modal-config';

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
  public readonly emptyMessage = input<string>(Constants.defaultEmptyMessage);
  public readonly thumbnailSize = input<number>(Constants.defaultThumbnailSize);
  protected readonly items: Signal<GalleryItem[]>;
  private readonly dialog = inject(Dialog);
  private readonly galleryService = inject(GalleryService);

  @Input({ required: true })
  set galleryItems(items: GalleryItem[]) {
    this.galleryService.setGalleryItems(items);
  }

  @Input({ required: false })
  set modalConfig(modalConfig: ModalConfig) {
    this.galleryService.setModalConfig(modalConfig);
  }

  public constructor() {
    this.items = this.galleryService.galleryItems;
  }

  openDialog(index: number): void {
    this.galleryService.setItemIndex(index);
    this.dialog.open(ShowcaseDialogComponent);
  }
}
