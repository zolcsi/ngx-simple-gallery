import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GalleryItem, NgxSimpleGalleryComponent } from 'ngx-simple-gallery';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSimpleGalleryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public galleryItems: GalleryItem[] = [
    {
      src: 'https://picsum.photos/id/237/2000/3000',
      thumbnail: 'https://picsum.photos/id/237/160/160',
    },
    {
      src: 'https://picsum.photos/id/238/2000/3000',
      thumbnail: 'https://picsum.photos/id/238/160/160',
    },
    {
      src: 'https://picsum.photos/id/155/200/300',
      thumbnail: 'https://picsum.photos/id/155/160/160',
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
