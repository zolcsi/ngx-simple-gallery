import { ChangeDetectionStrategy, Component, inject, Input, input, Signal } from '@angular/core';
import { GalleryItem } from './core/model/gallery-item';
import { Constants } from './core/constants';
import { Dialog } from '@angular/cdk/dialog';
import { ShowcaseDialogComponent } from './showcase-dialog/showcase-dialog.component';
import { GalleryService } from './core/service/gallery.service';

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
  public thumbnailSize = input<number>(Constants.defaultThumbnailSize);
  public emptyMessage = input<string>(Constants.defaultEmptyMessage);
  private readonly dialog = inject(Dialog);
  private readonly galleryService = inject(GalleryService);
  protected items: Signal<GalleryItem[]>;

  @Input({ required: true })
  set galleryItems(items: GalleryItem[]) {
    this.galleryService.setGalleryItems(items);
  }

  public constructor() {
    this.items = this.galleryService.galleryItems;
  }

  openDialog(index: number): void {
    this.galleryService.setItemIndex(index);
    this.dialog.open(ShowcaseDialogComponent);
  }
}
