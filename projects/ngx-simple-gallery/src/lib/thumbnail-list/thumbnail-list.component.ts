import { Component, computed, ElementRef, inject, signal, Signal, viewChild } from '@angular/core';
import { GalleryItem } from '../core/model/gallery-item';
import { GalleryService } from '../core/service/gallery.service';
import { NgClass } from '@angular/common';
import { TransformationUtils } from '../core/utils/transformation-utils';

@Component({
  selector: 'lib-thumbnail-list',
  standalone: true,
  imports: [NgClass],
  templateUrl: './thumbnail-list.component.html',
  styleUrl: './thumbnail-list.component.css',
})
export class ThumbnailListComponent {
  private readonly allImagesLoaded: Signal<boolean>;
  private readonly galleryService = inject(GalleryService);
  private readonly numOfItemsLoaded = signal(0);
  private readonly thumbnails = viewChild<ElementRef>('thumbnails');

  protected readonly items: Signal<GalleryItem[]>;
  protected readonly selectedItemIndex: Signal<number>;
  protected transformStyle = computed(() => this.calcTransformation());

  constructor() {
    this.items = this.galleryService.galleryItems;
    this.selectedItemIndex = this.galleryService.getItemIndex;
    this.allImagesLoaded = computed(() => this.numOfItemsLoaded() >= this.galleryService.galleryItems().length);
  }

  selectItem(index: number): void {
    this.galleryService.setItemIndex(index);
  }

  itemLoaded(): void {
    this.numOfItemsLoaded.update((value: number) => value + 1);
  }

  private calcTransformation(): string {
    if (this.allImagesLoaded()) {
      const thumbnailsEl = this.thumbnails()?.nativeElement;
      const selectedThumbnail = Array.from(thumbnailsEl.children)[this.selectedItemIndex()] as HTMLElement;
      const containerWidth = thumbnailsEl.parentElement.clientWidth;
      const selectedOffsetLeft = selectedThumbnail?.offsetLeft;
      const selectedWidth = selectedThumbnail?.offsetWidth;
      const translateX = TransformationUtils.calcTranslateX(selectedOffsetLeft, containerWidth, selectedWidth);
      return `translateX(${translateX}px)`;
    } else {
      return `translateX(0)`;
    }
  }
}
