import { Component } from '@angular/core';
import { GalleryItem, ModalConfig, NgxSimpleGalleryComponent, OpenGalleryDirective } from 'ngx-simple-gallery';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgxSimpleGalleryComponent, OpenGalleryDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public modalConfig: ModalConfig = { showModalThumbnailList: true };

  public galleryItems: GalleryItem[] = [
    {
      src: 'https://picsum.photos/id/237/1200/1800',
      thumbnail: 'https://picsum.photos/id/237/160/160',
    },
    {
      src: 'https://picsum.photos/id/238/1200/1800',
      thumbnail: 'https://picsum.photos/id/238/160/160',
    },
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
    { src: 'img/image1.jpg' },
    { src: 'img/image2.jpg' },
    { src: 'img/image3.jpg' },
    { src: 'img/image4.jpg' },
    { src: 'img/image5.jpg' },
    { src: 'img/image6.jpg' },
    { src: 'img/image7.jpg' },
    { src: 'img/image8.jpg' },
    { src: 'img/image9.jpg' },
    { src: 'img/image10.jpg' },
    { src: 'img/image11.jpg' },
    { src: 'img/image12.jpg' },
    { src: 'img/image13.jpg' },
  ];
}
