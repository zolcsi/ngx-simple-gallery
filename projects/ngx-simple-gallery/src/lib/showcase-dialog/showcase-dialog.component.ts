import { ChangeDetectionStrategy, Component, computed, HostListener, inject, Signal } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { GalleryService } from '../core/service/gallery.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ThumbnailListComponent } from '../thumbnail-list/thumbnail-list.component';

@Component({
  standalone: true,
  imports: [NgTemplateOutlet, NgClass, SpinnerComponent, ThumbnailListComponent],
  templateUrl: './showcase-dialog.component.html',
  styleUrl: './showcase-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowcaseDialogComponent {
  protected readonly imageSource: Signal<string>;
  protected readonly isLoading: Signal<boolean>;
  protected readonly showThumbnailList: Signal<boolean>;
  private readonly dialogRef = inject(DialogRef);
  private readonly galleryService = inject(GalleryService);

  constructor() {
    this.imageSource = this.galleryService.imageSource;
    this.isLoading = this.galleryService.getIsLoading;
    this.showThumbnailList = computed(() => this.galleryService.getLibConfig().showModalThumbnailList);
  }

  @HostListener('document:keydown.arrowLeft', ['$event'])
  public handleArrowLeftKeyboardEvent(): void {
    this.galleryService.loadPrev();
  }

  @HostListener('document:keydown.arrowRight', ['$event'])
  public handleArrowRightKeyboardEvent(): void {
    this.galleryService.loadNext();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  loadPrevious(): void {
    this.galleryService.loadPrev();
  }

  loadNext(): void {
    this.galleryService.loadNext();
  }

  imageLoaded(): void {
    this.galleryService.stopLoading();
  }
}
