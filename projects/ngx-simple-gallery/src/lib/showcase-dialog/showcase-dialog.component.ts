import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { NgTemplateOutlet } from '@angular/common';
import { GalleryService } from '../core/service/gallery.service';

@Component({
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './showcase-dialog.component.html',
  styleUrl: './showcase-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowcaseDialogComponent {
  protected readonly imageSource: Signal<string>;
  private readonly dialogRef = inject(DialogRef);
  private readonly galleryService = inject(GalleryService);

  constructor() {
    this.imageSource = this.galleryService.imageSource;
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
}
