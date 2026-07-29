import { Component } from '@angular/core';
import { GalleryConfig, GalleryItem, NgxSimpleGalleryComponent, SimpleGalleryDirective } from 'ngx-simple-gallery';

@Component({
  selector: 'app-root',
  imports: [NgxSimpleGalleryComponent, SimpleGalleryDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public readonly version = '21.0.1';

  public galleryConfig: GalleryConfig = {
    emptyMessage: 'Images not found',
    galleryThumbnailSize: 140,
    showModalThumbnailList: true,
    modalStartIndex: 2,
  };

  public galleryItemsForComponent1: GalleryItem[] = [
    {
      src: 'https://picsum.photos/id/219/1200/1800',
      thumbnail: 'https://picsum.photos/id/219/160/160',
    },
    {
      src: 'https://picsum.photos/id/237/1200/1800',
      thumbnail: 'https://picsum.photos/id/237/160/160',
    },
    {
      src: 'https://picsum.photos/id/582/1200/1800',
      thumbnail: 'https://picsum.photos/id/582/160/160',
    },
  ];

  public galleryItemsForComponent2: GalleryItem[] = [
    {
      src: 'https://picsum.photos/id/33/800/1200',
      thumbnail: 'https://picsum.photos/id/33/160/160',
    },
    {
      src: 'https://picsum.photos/id/189/1200/1800',
      thumbnail: 'https://picsum.photos/id/189/160/160',
    },
    {
      src: 'https://picsum.photos/id/289/800/1200',
      thumbnail: 'https://picsum.photos/id/289/160/160',
    },
    {
      src: 'https://picsum.photos/id/519/800/1200',
      thumbnail: 'https://picsum.photos/id/519/160/160',
    },
    {
      src: 'https://picsum.photos/id/322/800/1200',
      thumbnail: 'https://picsum.photos/id/322/160/160',
    },
    {
      src: 'https://picsum.photos/id/452/800/1200',
      thumbnail: 'https://picsum.photos/id/452/160/160',
    },
  ];

  public galleryItemsForDirective: GalleryItem[] = [
    { src: 'img/image1.jpg' },
    { src: 'img/image2.jpg' },
    { src: 'img/image3.jpg' },
    { src: 'img/image4.jpg' },
    { src: 'img/image5.jpg' },
    { src: 'img/image6.jpg' },
    {
      src: 'https://picsum.photos/id/110/800/1200',
      thumbnail: 'https://picsum.photos/id/110/160/160',
    },
    {
      src: 'https://picsum.photos/id/118/1200/1800',
      thumbnail: 'https://picsum.photos/id/118/160/160',
    },
    {
      src: 'https://picsum.photos/id/121/800/1200',
      thumbnail: 'https://picsum.photos/id/121/160/160',
    },
    {
      src: 'https://picsum.photos/id/122/800/1200',
      thumbnail: 'https://picsum.photos/id/122/160/160',
    },
  ];
}
