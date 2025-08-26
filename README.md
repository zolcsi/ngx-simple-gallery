# Ngx Simple Gallery

[![npm version](https://badge.fury.io/js/ngx-simple-gallery.svg)](https://badge.fury.io/js/ngx-simple-gallery)
[![codecov](https://codecov.io/gh/zolcsi/ngx-simple-gallery/graph/badge.svg?token=772F41V3M1)](https://codecov.io/gh/zolcsi/ngx-simple-gallery)

A simple gallery lib for Angular [19]. It displays all the images as thumbnails and makes it big, when clicked/tapped on it.
 - mobile friendly
 - lightweight
 - use images from any source
 - two main forms of use: component selector or directive
 - navigate forwards/backwards with keyboard arrows or touch/click on arrows in the showcase dialog
 - loading spinner while loading
 - smooth animation of the next item
 - you can define a thumbnail or leave it empty. It is recommended to provide it though, because of performance reasons.

### [**Demo**](https://zolcsi.github.io/ngx-simple-gallery/) | [**Changelog**](https://github.com/zolcsi/ngx-simple-gallery/blob/main/CHANGELOG.md)


## Versioning

| Gallery | Angular | Readme                                                                                   |
|---------|---------|------------------------------------------------------------------------------------------|
| `^20`   | `20+`   | here                                                                                     |
| `^19`   | `19+`   | [**README.md**](https://github.com/zolcsi/ngx-simple-gallery/blob/19.0.1/README.md) |
| `^18`   | `18`    | [**README.md**](https://github.com/zolcsi/ngx-simple-gallery/blob/1.2.4/README.md)       |


## Installation

```sh
npm install --save ngx-simple-gallery @angular/cdk
```
add the following line to your global styles (by default "styles.(scss|css)") if it is not included yet: 
```
@import '@angular/cdk/overlay-prebuilt.css';
```

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

### 2. Add the gallery items

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

### 3. You may configure the gallery with custom settings (optional)

```js
import { GalleryItem } from '@zolcsi/ngx-simple-gallery';

@Component({...})
export class AppComponent {
  
  galleryItems: GalleryItem[] = [...];
  
  galleryConfig: GalleryConfig = {
    emptyMessage: 'No images found in the galleryItems',
    galleryThumbnailSize: 140,
    modalStartIndex: 2,
    showModalThumbnailList: false
  }
}
```

### 4. Render the gallery with the items assembled previously (2 ways)

#### 4a. Using the component selector (this renders the images on the page)
```html
<ngx-simple-gallery [galleryItems]="galleryItems" [galleryConfig]="galleryConfig"></ngx-simple-gallery>
```
or

#### 4b. Using the directive on your own element (this does not render the items on the page, directly opens the modal view)
```html
<p simpleGallery [galleryItems]="galleryItems" [galleryConfig]="galleryConfig">My Gallery</p>
```


## Input parameters

| Name           | Required | Type          | Default | Description                          |                              
|----------------|----------|---------------|---------|--------------------------------------|
| galleryItems   | yes      | GalleryItem[] | [ ]     | Contains the list of images          |
| galleryConfig  | no       | GalleryConfig |         | Custom configuration for the gallery |


### GalleryItem (represents one single image)

| Name      | Required | Type    | Default | Description                                                      |                              
|-----------|----------|---------|---------|------------------------------------------------------------------|
| src       | yes      | string  | -       | Source of the image                                              |
| thumbnail | no       | string  | src     | Thumbnail of the image. If not provided, the source will be used |


### GalleryConfig (custom configuration for the gallery)

| Name                   | Required | Type    | Default                              | Description                                                                     | Applicable           |                            
|------------------------|----------|---------|--------------------------------------|---------------------------------------------------------------------------------|----------------------|
| emptyMessage           | no       | string  | 'Empty gallery, no images provided.' | Message to show in case empty items provided                                    | component, directive |
| galleryThumbnailSize   | no       | number  | 160                                  | The width/height of the thumbnails in px in the gallery (not in the modal view) | component            |
| modalStartIndex        | no       | number  | 0                                    | The index of the first image to show in the modal view                          | directive            |
| showModalThumbnailList | no       | boolean | true                                 | Whether to show the thumbnail list in the modal view                            | component, directive |                                     
