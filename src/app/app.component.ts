import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { GalleryItem, NgxSimpleGalleryComponent, OpenGalleryDirective } from 'ngx-simple-gallery';
import { ModalConfig } from '../../projects/ngx-simple-gallery/src/lib/core/model/modal-config';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgxSimpleGalleryComponent, OpenGalleryDirective, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  public modalConfig: ModalConfig = { showModalThumbnailList: true };

  @ViewChild('thumbnails', { static: false }) thumbnails!: ElementRef;

  images = [
    { src: 'https://picsum.photos/id/186/600/600' },
    { src: 'https://picsum.photos/id/187/600/600' },
    { src: 'https://picsum.photos/id/188/600/600' },
    { src: 'https://picsum.photos/id/189/600/600' },
    { src: 'https://picsum.photos/id/190/600/600' },
    { src: 'https://picsum.photos/id/191/600/600' },
    { src: 'https://picsum.photos/id/192/600/600' },
    { src: 'https://picsum.photos/id/193/600/600' },
  ];

  selectedIndex = 0;
  transformStyle = 'translateX(0px)';
  transitionStyle = 'transform 0.3s ease';

  ngAfterViewInit() {
    this.updateTransform();
  }

  selectImage(index: number) {
    this.selectedIndex = index;
    this.updateTransform();
  }

  navigateLeft() {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
      this.updateTransform();
    }
  }

  navigateRight() {
    if (this.selectedIndex < this.images.length - 1) {
      this.selectedIndex++;
      this.updateTransform();
    }
  }

  updateTransform() {
    const thumbnailsEl = this.thumbnails.nativeElement;
    const thumbnailsChildren = Array.from(thumbnailsEl.children) as HTMLElement[];
    const selectedThumbnail = thumbnailsChildren[this.selectedIndex];

    const containerWidth = thumbnailsEl.parentElement.clientWidth;
    const selectedOffsetLeft = selectedThumbnail.offsetLeft;
    const selectedWidth = selectedThumbnail.offsetWidth;

    // Calculate translateX to center the selected image
    const translateX = -(selectedOffsetLeft - containerWidth / 2 + selectedWidth / 2);
    this.transformStyle = `translateX(${translateX}px)`;
  }

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
      src: 'https://picsum.photos/id/155/800/1200',
      thumbnail: 'https://picsum.photos/id/155/160/160',
    },
    {
      src: 'https://picsum.photos/id/122/2000/3000',
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
