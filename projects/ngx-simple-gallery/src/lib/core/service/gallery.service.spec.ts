import { TestBed } from '@angular/core/testing';
import { GalleryService } from './gallery.service';
import { GalleryItem } from '../model/gallery-item';
import { GalleryConfig } from '../model/gallery-config';
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

  describe('testing applyGalleryConfig()', () => {

    beforeEach(() => {
      service.setGalleryItems(galleryItemsFixture);
    });

    describe('testing emptyMessage config attribute', () => {
      it('should be the default when not set', () => {
        // assert
        expect(service.getLibConfig().emptyMessage).toEqual(Constants.defaultEmptyMessage);
      });

      it('should set emptyMessage to a new value', () => {
        const config: GalleryConfig = { emptyMessage: 'new empty message' };

        // act
        service.applyGalleryConfig(config);

        // assert
        expect(service.getLibConfig().emptyMessage).toEqual('new empty message');
      });

      it('should not set emptyMessage when it is not provided', () => {
        const config: GalleryConfig = { };

        // act
        service.applyGalleryConfig(config);

        // assert
        expect(service.getLibConfig().emptyMessage).toEqual(Constants.defaultEmptyMessage)
      });
    });

    describe('testing galleryThumbnailSize config attribute', () => {
      it('should be the default when not set', () => {
        // assert
        expect(service.getLibConfig().galleryThumbnailSize).toEqual(Constants.defaultGalleryThumbnailSize);
      });

      it('should set galleryThumbnailSize to a new value', () => {
        const config: GalleryConfig = { galleryThumbnailSize: 123 };

        // act
        service.applyGalleryConfig(config);

        // assert
        expect(service.getLibConfig().galleryThumbnailSize).toEqual(123);
      });

      it('should not set galleryThumbnailSize when it is not provided', () => {
        const config: GalleryConfig = { };

        // act
        service.applyGalleryConfig(config);

        // assert
        expect(service.getLibConfig().galleryThumbnailSize).toEqual(Constants.defaultGalleryThumbnailSize)
      });
    });

    describe('testing modalStartIndex config attribute', () => {
      it('should be the default when not set', () => {
        expect(service.getLibConfig().modalStartIndex).toEqual(Constants.defaultModalStartIndex);
        expect(service.getItemIndex()).toEqual(Constants.defaultModalStartIndex);
      });

      it('should set modalStartIndex 1', () => {
        const config: GalleryConfig = { modalStartIndex: 1 };

        // act
        service.applyGalleryConfig(config);

        // assert
        expect(service.getLibConfig().modalStartIndex).toEqual(1);
        expect(service.getItemIndex()).toEqual(1);
      });

      it('should set startIndex 0', () => {
        const config: GalleryConfig = { modalStartIndex: 0 };

        // act
        service.applyGalleryConfig(config);

        // assert
        expect(service.getLibConfig().modalStartIndex).toEqual(0);
        expect(service.getItemIndex()).toEqual(0);
      });

      it('should set modalStartIndex -1, but itemIndex is normalized', () => {
        const config: GalleryConfig = { modalStartIndex: -1 };

        // act
        service.applyGalleryConfig(config);

        // assert
        expect(service.getLibConfig().modalStartIndex).toEqual(-1);
        expect(service.getItemIndex()).toEqual(0);
      });
    });

    describe('testing showModalThumbnailList config attribute', () => {
      it('should be the default when not set', () => {
        // assert
        expect(service.getLibConfig().showModalThumbnailList).toEqual(Constants.defaultShowModalThumbnailList);
      });

      it('should set showModalThumbnailList true', () => {
        const config: GalleryConfig = { showModalThumbnailList: true };

        // act
        service.applyGalleryConfig(config);

        // assert
        expect(service.getLibConfig().showModalThumbnailList).toBeTruthy();
      });

      it('should set showModalThumbnailList false', () => {
        const config: GalleryConfig = { showModalThumbnailList: false };

        // act
        service.applyGalleryConfig(config);

        // assert
        expect(service.getLibConfig().showModalThumbnailList).toBeFalsy();
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
