import { computed, Injectable, signal } from '@angular/core';
import { GalleryItem } from '../model/gallery-item';
import { Constants } from '../constants';
import { GalleryConfig } from '../model/gallery-config';
import { ConfigUtils } from '../utils/config-utils';
import { LibConfig } from '../model/lib-config';

@Injectable()
export class GalleryService {
  private readonly libConfig = signal<LibConfig>(ConfigUtils.defaultLibConfig());
  private readonly isLoading = signal<boolean>(false);
  private readonly itemNdx = signal<number>(Constants.defaultModalStartIndex);
  private readonly items = signal<GalleryItem[]>([]);

  public readonly imageSource = computed(() => this.items().at(this.itemNdx())?.src ?? '');
  public readonly galleryItems = this.items.asReadonly();
  public readonly getIsLoading = this.isLoading.asReadonly();
  public readonly getItemIndex = this.itemNdx.asReadonly();
  public readonly getLibConfig = this.libConfig.asReadonly();

  public setGalleryItems(items: GalleryItem[]): void {
    this.items.set(items);
  }

  public setItemIndex(index: number): void {
    if (this.getItemIndex() !== index) {
      this.isLoading.set(true);
      this.itemNdx.set(ConfigUtils.normalizeStartIndex(index, this.galleryItems().length));
    }
  }

  public applyGalleryConfig(galleryConfig: GalleryConfig): void {
    this.libConfig.set({
      emptyMessage:
        galleryConfig.emptyMessage !== undefined ? galleryConfig.emptyMessage : Constants.defaultEmptyMessage,
      galleryThumbnailSize:
        galleryConfig.galleryThumbnailSize !== undefined
          ? galleryConfig.galleryThumbnailSize
          : Constants.defaultGalleryThumbnailSize,
      modalStartIndex:
        galleryConfig.modalStartIndex !== undefined ? galleryConfig.modalStartIndex : Constants.defaultModalStartIndex,
      showModalThumbnailList:
        galleryConfig.showModalThumbnailList !== undefined
          ? galleryConfig.showModalThumbnailList
          : Constants.defaultShowModalThumbnailList,
    });
    if (galleryConfig.modalStartIndex !== undefined) {
      this.setItemIndex(galleryConfig.modalStartIndex);
    }
  }

  public loadNext(): void {
    this.isLoading.set(true);
    this.itemNdx.update((index: number) => (index + 1) % this.items().length);
  }

  public loadPrev(): void {
    this.isLoading.set(true);
    this.itemNdx.update((index: number) => (index === 0 ? this.items().length - 1 : index - 1));
  }

  public stopLoading(): void {
    this.isLoading.set(false);
  }
}
