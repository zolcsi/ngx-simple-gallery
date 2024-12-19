import { computed, Injectable, signal } from '@angular/core';
import { GalleryItem } from '../model/gallery-item';
import { Constants } from '../constants';
import { ModalConfig } from '../model/modal-config';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private readonly isLoading = signal<boolean>(false);
  private readonly itemNdx = signal<number>(0);
  private readonly items = signal<GalleryItem[]>([]);
  private readonly showThumbnailList = signal<boolean>(Constants.defaultShowThumbnailList);

  public readonly imageSource = computed(() => this.items().at(this.itemNdx())?.src ?? '');
  public readonly galleryItems = this.items.asReadonly();
  public readonly getIsLoading = this.isLoading.asReadonly();
  public readonly getItemIndex = this.itemNdx.asReadonly();
  public readonly getShowThumbnailList = this.showThumbnailList.asReadonly();

  public setGalleryItems(items: GalleryItem[]): void {
    this.items.set(items);
  }

  public setItemIndex(index: number): void {
    this.isLoading.set(true);
    this.itemNdx.set(index);
  }

  public setModalConfig(modalConfig: ModalConfig): void {
    this.showThumbnailList.set(modalConfig.showModalThumbnailList ?? Constants.defaultShowThumbnailList);
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
