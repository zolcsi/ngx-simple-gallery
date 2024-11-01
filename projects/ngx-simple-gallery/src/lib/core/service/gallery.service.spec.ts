import { TestBed } from '@angular/core/testing';

import { GalleryService } from './gallery.service';
import { GalleryItem } from '../model/gallery-item';

const galleryItemsFixture: GalleryItem[] = [
  {
    src: 'https://picsum.photos/id/009/500/500',
  },
  {
    src: 'https://picsum.photos/id/010/1200/1800',
    thumbnail: 'https://picsum.photos/id/010/200/120',
  },
];

describe('GalleryService', () => {
  let service: GalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalleryService);
  });

  it('should ', () => {
    expect(service.galleryItems().length).toEqual(0);
  });

  it('testing setGalleryItems()', () => {
    service.setGalleryItems(galleryItemsFixture);
    expect(service.galleryItems().length).toEqual(2);
  });

  describe('testing setItemIndex()', () => {
    it('should return the src of the 2. image', () => {
      service.setGalleryItems(galleryItemsFixture);
      service.setItemIndex(1);
      expect(service.imageSource()).toEqual(galleryItemsFixture[1].src);
    });

    it('should return an empty string, as the index is out of bounds', () => {
      service.setGalleryItems(galleryItemsFixture);
      service.setItemIndex(25);
      expect(service.imageSource()).toEqual('');
    });
  });

  describe('testing loadNext()', () => {
    it('should load the 2. image', () => {
      // arrange
      service.setGalleryItems(galleryItemsFixture);
      service.setItemIndex(0);

      // act
      service.loadNext();

      // assert
      expect(service.imageSource()).toEqual(galleryItemsFixture[1].src);
    });

    it('should load the 1. image', () => {
      // arrange
      service.setGalleryItems(galleryItemsFixture);
      service.setItemIndex(1);

      // act
      service.loadNext();

      // assert
      expect(service.imageSource()).toEqual(galleryItemsFixture[0].src);
    });
  });

  describe('testing loadPrevt()', () => {
    it('should load the 1. image', () => {
      // arrange
      service.setGalleryItems(galleryItemsFixture);
      service.setItemIndex(1);

      // act
      service.loadPrev();

      // assert
      expect(service.imageSource()).toEqual(galleryItemsFixture[0].src);
    });

    it('should load the 2. image', () => {
      // arrange
      service.setGalleryItems(galleryItemsFixture);
      service.setItemIndex(0);

      // act
      service.loadPrev();

      // assert
      expect(service.imageSource()).toEqual(galleryItemsFixture[1].src);
    });
  });
});
