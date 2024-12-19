import { Component, inject, Signal } from '@angular/core';
import { GalleryItem } from '../core/model/gallery-item';
import { GalleryService } from '../core/service/gallery.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'lib-thumbnail-list',
  standalone: true,
  imports: [NgClass],
  templateUrl: './thumbnail-list.component.html',
  styleUrl: './thumbnail-list.component.css',
})
export class ThumbnailListComponent {
  protected readonly selectedItemIndex: Signal<number>;
  protected readonly items: Signal<GalleryItem[]>;
  private readonly galleryService = inject(GalleryService);

  constructor() {
    this.items = this.galleryService.galleryItems;
    this.selectedItemIndex = this.galleryService.getItemIndex;
  }

  selectItem(index: number): void {
    this.galleryService.setItemIndex(index);
  }
}
