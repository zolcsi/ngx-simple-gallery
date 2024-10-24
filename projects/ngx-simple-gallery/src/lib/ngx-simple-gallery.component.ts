import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { GalleryItem } from './core/model/gallery-item';
import { Constants } from './core/constants';
import { Dialog } from '@angular/cdk/dialog';
import { ShowcaseDialogComponent } from './showcase-dialog/showcase-dialog.component';

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
  public galleryItems = input.required<GalleryItem[]>({});
  public thumbnailSize = input<number>(Constants.defaultThumbnailSize);
  public emptyMessage = input<string>(Constants.defaultEmptyMessage);
  private readonly dialog = inject(Dialog);

  openDialog(galleryItem: GalleryItem): void {
    this.dialog.open(ShowcaseDialogComponent, {
      data: {
        galleryItem,
      },
    });
  }
}
