# Ngx Simple Gallery

[![npm version](https://badge.fury.io/js/ngx-simple-gallery.svg)](https://badge.fury.io/js/ngx-simple-gallery)
[![codecov](https://codecov.io/gh/zolcsi/ngx-simple-gallery/graph/badge.svg?token=772F41V3M1)](https://codecov.io/gh/zolcsi/ngx-simple-gallery)

A simple gallery lib for Angular [18]. It displays all the images as thumbnails and makes it big, when clicked/tapped on it.
 - mobile friendly
 - lightweight
 - use images from any source
 - the gallery takes up as much space as you let it
 - navigate forwards/backwards with keyboard arrows or touch/click on arrows in the showcase dialog
 - loading spinner while loading
 - smooth animation of the next item
 - you can define a thumbnail or leave it empty. It is recommended to provide it though, because of performance reasons.

### [**Demo**](https://zolcsi.github.io/ngx-simple-gallery/) | [**Changelog**](https://github.com/zolcsi/ngx-simple-gallery/blob/main/CHANGELOG.md)

## Installation

```sh
npm install --save ngx-simple-gallery @angular/cdk
```
add the following line to your global styles (by default "styles.(scss|css)") if it is not included yet: 
```
@import '@angular/cdk/overlay-prebuilt.css';
```

## Versioning

| Gallery     | Angular | Readme                                                       |
|-------------|---------| ------------------------------------------------------------ |
| `^18`       | `18+`   | here                                                         |


## Usage

### 1. Import the gallery into your component

```ts
import { NgxSimpleGalleryComponent } from '@zolcsi/ngx-simple-gallery';

@Component({
  standalone: true,
  imports: [NgxSimpleGalleryComponent],
})
export class AppComponent {}
```

### 2. List the gallery items

```js
import { GalleryItem } from '@zolcsi/ngx-simple-gallery';

@Component({...})
export class AppComponent {
  galleryItems: GalleryItem[] = [
    { 
      src: '/img/image1.jpg' 
    }, 
    {
      src: 'https://picsum.photos/id/237/2000/3000',
      thumbnail: 'https://picsum.photos/id/237/160/160',
  }]
}
```

### 3. Render the gallery with the items assembled previously

```html
<ngx-simple-gallery [galleryItems]="galleryItems"></ngx-simple-gallery>
```

## Parameters

### Input parameters

| Name              | Required | Type          | Default                               | Description                                        |                              
|-------------------|----------|---------------|---------------------------------------|----------------------------------------------------| 
| emptyMessage      | no       | string        | 'Empty gallery, no images  provided.' | Message to show in case empty items provided       |
| galleryItems      | yes      | GalleryItem[] | [ ]                                   | Contains the list of images                        |
| showThumbnailList | no       | boolean       | true                                  | Whether to show the thumbnail list in modal view   |                                      |
| thumbnailSize     | no       | number        | 160                                   | The width/height of the thumbnails in px           |

### With all the input parameters set:

```html
<ngx-simple-gallery [galleryItems]="galleryItems"
                    [showThumbnailList]="false"
                    [thumbnailSize]="65"
                    emptyMessage="Please provide some images">  
</ngx-simple-gallery>
```
