# Ngx Simple Gallery
[![codecov](https://codecov.io/)](https://codecov.io/)
[![npm version](https://badge.fury.io/)](https://badge.fury.io/)

A simple gallery lib for Angular [18]. It displays all the images as thumbnails and makes it big, when clicked/tapped on it.
 - mobile friendly
 - lightweight
 - use images from any source
 - it takes up as much space as you let it
 - you can define a thumbnail or leave it empty. It is recommended though to provide it, because of performance reasons.

## Installation

```sh
npm install --save @zolcsi/ngx-simple-gallery @angular/cdk
```
add the following line to your global styles (by default "styles.(scss|css)") if it is not included yet: 
```
@import '@angular/cdk/overlay-prebuilt.css';
```

## Versioning

| Gallery   | Angular   | Readme                                                       |
| --------- |-----------| ------------------------------------------------------------ |
| `<=1.x.x` | `>=18`    | here                                                         |


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

| Name          | Required | Type          | Default                               | Description                                  |                              
|---------------|----------|---------------|---------------------------------------|----------------------------------------------| 
| galleryItems  | yes      | GalleryItem[] | [ ]                                   | Contains the list of images                  |
| emptyMessage  | no       | string        | 'Empty gallery, no images  provided.' | Message to show in case empty items provided |
| thumbnailSize | no       | number        | 160                                   | The width/height of the thumbnails in px     | 

### 3. When all parameters set

```html
<ngx-simple-gallery [galleryItems]="galleryItems" 
                    [thumbnailSize]="65"
                    emptyMessage="Please provide some images">  
</ngx-simple-gallery>
```
