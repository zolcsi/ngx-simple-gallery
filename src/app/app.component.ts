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
    { src: '/img/image1.jpg' },
    { src: '/img/image2.jpg' },
    { src: '/img/image3.jpg' },
    { src: '/img/image4.jpg' },
    { src: '/img/image5.jpg' },
    { src: '/img/image6.jpg' },
    { src: '/img/image7.jpg' },
    { src: '/img/image8.jpg' },
    { src: '/img/image9.jpg' },
    { src: '/img/image10.jpg' },
    { src: '/img/image11.jpg' },
    { src: '/img/image12.jpg' },
    { src: '/img/image13.jpg' },
  ];
}

// TODO:
// - search for role="presentation" in the code, and make it a11y conform
// --> The CDK overlays depend on a small set of structural styles to work correctly. If you're using Angular Material, these styles have been included together with the theme, otherwise if you're using the CDK on its own, you'll have to include the styles yourself. You can do so by importing the prebuilt styles in your global stylesheet:
// --> @import '@angular/cdk/overlay-prebuilt.css';
