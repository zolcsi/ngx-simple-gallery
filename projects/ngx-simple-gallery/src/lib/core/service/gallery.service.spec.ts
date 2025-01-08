import { TestBed } from '@angular/core/testing';
import { GalleryService } from './gallery.service';
import { GalleryItem } from '../model/gallery-item';
import { ModalConfig } from '../model/modal-config';
import { Constants } from '../constants';

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

  it('the initial items length should be 0', () => {
    expect(service.galleryItems().length).toEqual(0);
  });

  it('testing setGalleryItems()', () => {
    service.setGalleryItems(galleryItemsFixture);
    expect(service.galleryItems().length).toEqual(2);
  });

  describe('testing isLoading()', () => {
    it('testing getIsLoading() default', () => {
      expect(service.getIsLoading()).toBeFalsy();
    });

    it('stopLoading() should top loading indication', () => {
      // arrange
      service.setItemIndex(1);
      expect(service.getIsLoading()).toBeTruthy();

      // act
      service.stopLoading();

      // assert
      expect(service.getIsLoading()).toBeFalsy();
    });
  });

  describe('testing setItemIndex()', () => {
    it('should return the src of the 2. image', () => {
      service.setGalleryItems(galleryItemsFixture);
      service.setItemIndex(1);
      expect(service.imageSource()).toEqual(galleryItemsFixture[1].src);
      expect(service.getIsLoading()).toBeTruthy();
    });

    it('should return the last item, as the index is out of bounds', () => {
      service.setGalleryItems(galleryItemsFixture);
      service.setItemIndex(25);
      expect(service.imageSource()).toEqual(galleryItemsFixture[1].src);
      expect(service.getIsLoading()).toBeTruthy();
    });

    it('should return the first, as the index is out of bounds in minus', () => {
      service.setGalleryItems(galleryItemsFixture);
      service.setItemIndex(-1);
      expect(service.imageSource()).toEqual(galleryItemsFixture[0].src);
      expect(service.getIsLoading()).toBeTruthy();
    });

    it('should return an empty string, as there are no items', () => {
      service.setItemIndex(-1);
      expect(service.imageSource()).toEqual('');
      expect(service.getIsLoading()).toBeTruthy();
    });
  });

  describe('testing applyModalConfig()', () => {

    beforeEach(() => {
      service.setGalleryItems(galleryItemsFixture);
    });

    describe('testing showModalThumbnailList config attribute', () => {
      it('should set showModalThumbnailList true', () => {
        const config: ModalConfig = { showModalThumbnailList: true };

        // act
        service.applyModalConfig(config);

        // assert
        expect(service.getShowThumbnailList()).toBeTruthy();
      });

      it('should set showModalThumbnailList false', () => {
        const config: ModalConfig = { showModalThumbnailList: false };

        // act
        service.applyModalConfig(config);

        // assert
        expect(service.getShowThumbnailList()).toBeFalsy();
      });

      it('should be the default when not set', () => {
        // assert
        expect(service.getShowThumbnailList()).toEqual(Constants.defaultShowThumbnailList);
      });
    });

    describe('testing startIndex config attribute', () => {
      it('should set startIndex 1', () => {
        const config: ModalConfig = { startIndex: 1 };

        // act
        service.applyModalConfig(config);

        // assert
        expect(service.getItemIndex()).toEqual(1);
      });

      it('should set startIndex 0', () => {
        const config: ModalConfig = { startIndex: 0 };

        // act
        service.applyModalConfig(config);

        // assert
        expect(service.getItemIndex()).toEqual(0);
      });

      it('should set startIndex -1', () => {
        const config: ModalConfig = { startIndex: -1 };

        // act
        service.applyModalConfig(config);

        // assert
        expect(service.getItemIndex()).toEqual(0);
      });

      it('should be the default when not set', () => {
        // assert
        expect(service.getItemIndex()).toEqual(Constants.defaultThumbnailStartIndex);
      });
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
      expect(service.getIsLoading()).toBeTruthy();
    });

    it('should load the 1. image', () => {
      // arrange
      service.setGalleryItems(galleryItemsFixture);
      service.setItemIndex(1);

      // act
      service.loadNext();

      // assert
      expect(service.imageSource()).toEqual(galleryItemsFixture[0].src);
      expect(service.getIsLoading()).toBeTruthy();
    });
  });

  describe('testing loadPrev()', () => {
    it('should load the 1. image', () => {
      // arrange
      service.setGalleryItems(galleryItemsFixture);
      service.setItemIndex(1);

      // act
      service.loadPrev();

      // assert
      expect(service.imageSource()).toEqual(galleryItemsFixture[0].src);
      expect(service.getIsLoading()).toBeTruthy();
    });

    it('should load the 2. image', () => {
      // arrange
      service.setGalleryItems(galleryItemsFixture);
      service.setItemIndex(0);

      // act
      service.loadPrev();

      // assert
      expect(service.imageSource()).toEqual(galleryItemsFixture[1].src);
      expect(service.getIsLoading()).toBeTruthy();
    });
  });
});
