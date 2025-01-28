import { Component } from '@angular/core';
import { GalleryConfig, GalleryItem, NgxSimpleGalleryComponent, SimpleGalleryDirective } from 'ngx-simple-gallery';

@Component({
  selector: 'app-root',
  imports: [NgxSimpleGalleryComponent, SimpleGalleryDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public galleryConfig: GalleryConfig = {
    emptyMessage: 'Images not found',
    galleryThumbnailSize: 140,
    showModalThumbnailList: true,
    modalStartIndex: 2,
  };

  public galleryItemsForComponent1: GalleryItem[] = [
    {
      src: 'https://picsum.photos/id/237/1200/1800',
      thumbnail: 'https://picsum.photos/id/237/160/160',
    },
    {
      src: 'https://picsum.photos/id/238/1200/1800',
      thumbnail: 'https://picsum.photos/id/238/160/160',
    },
  ];

  public galleryItemsForComponent2: GalleryItem[] = [
    {
      src: 'https://picsum.photos/id/155/800/1200',
      thumbnail: 'https://picsum.photos/id/155/160/160',
    },
    {
      src: 'https://picsum.photos/id/122/1200/1800',
      thumbnail: 'https://picsum.photos/id/122/160/160',
    },
    {
      src: 'https://picsum.photos/id/119/800/1200',
      thumbnail: 'https://picsum.photos/id/119/160/160',
    },
    {
      src: 'https://picsum.photos/id/111/800/1200',
      thumbnail: 'https://picsum.photos/id/111/160/160',
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
