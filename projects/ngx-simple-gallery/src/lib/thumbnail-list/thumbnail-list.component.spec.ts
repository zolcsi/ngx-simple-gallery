import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThumbnailListComponent } from './thumbnail-list.component';
import { GalleryService } from '../core/service/gallery.service';
import { DebugElement, signal, WritableSignal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { GalleryItem } from '../core/model/gallery-item';
import { click } from '../../../testing/test-utilities';

const galleryItems: GalleryItem[] = [
  {
    src: 'image-number-one',
    thumbnail: 'thumbnail number 1'
  },
  {
    src: 'image-number-two',
    thumbnail: 'thumbnail number 2'
  }
];

describe('ThumbnailListComponent', () => {
  let componentDe: DebugElement;
  let fixture: ComponentFixture<ThumbnailListComponent>;
  let galleryServiceMock: {
    galleryItems: WritableSignal<GalleryItem[]>;
    getItemIndex: WritableSignal<number>;
    setItemIndex: jest.Mock;
  };

  beforeEach(async () => {
    galleryServiceMock = {
      galleryItems: signal([]),
      getItemIndex: signal(0),
      setItemIndex: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ThumbnailListComponent],
      providers: [
        {
          provide: GalleryService,
          useValue: galleryServiceMock,
        },
      ],
    }).compileComponents();
  });

  describe('should not display items, when the list is empty', () => {

    beforeEach(() => {
      fixture = TestBed.createComponent(ThumbnailListComponent);
      componentDe = fixture.debugElement;
    })

    it('thumbnail container exists', () => {

      // arrange
      const thumbnailContainer = componentDe.query(By.css('.thumbnail-container'));

      // assert
      expect(thumbnailContainer).toBeTruthy();
    });

    it('should check the role of the image', () => {

      // arrange
      const images = componentDe.queryAll(By.css('img'));

      // assert
      expect(images.length).toEqual(0);
    });
  });

  describe('should display items, the list is filled', () => {

    beforeEach(() => {
      galleryServiceMock.galleryItems.set(galleryItems);

      fixture = TestBed.createComponent(ThumbnailListComponent);
      fixture.componentInstance.itemLoaded();
      fixture.componentInstance.itemLoaded();

      fixture.detectChanges();
      componentDe = fixture.debugElement;
    })

    it('thumbnail container exists', () => {

      // arrange
      const thumbnailContainer = componentDe.query(By.css('.thumbnail-container'));

      // assert
      expect(thumbnailContainer).toBeTruthy();
    });

    it('check css transform', () => {

      // arrange
      const thumbnailDiv = componentDe.query(By.css('.thumbnails'));

      // assert
      expect(thumbnailDiv.nativeElement.style.transform).toEqual('translateX(NaNpx)')
    });

    it('should check the role of the image', () => {

      // arrange
      const images = componentDe.queryAll(By.css('img'));

      // assert
      expect(images.length).toEqual(2);
      expect(images[0].nativeElement.alt).toEqual('Gallery image 0');
      expect(images[0].nativeElement.className).toEqual('thumbnail-item selected');

      expect(images[1].nativeElement.alt).toEqual('Gallery image 1');
      expect(images[1].nativeElement.className).toEqual('thumbnail-item');
    });

    it('should select the second item on click', () => {

      // arrange
      const images = componentDe.queryAll(By.css('img'));

      // act
      click(images[1]);

      // assert
      expect(images.length).toEqual(2);
      expect(expect(galleryServiceMock.setItemIndex).toHaveBeenCalledWith(1));
    });
  });

  describe('should display items, but not all images loaded yet', () => {

    beforeEach(() => {
      galleryServiceMock.galleryItems.set(galleryItems);

      fixture = TestBed.createComponent(ThumbnailListComponent);
      fixture.componentInstance.itemLoaded();

      fixture.detectChanges();
      componentDe = fixture.debugElement;
    })

    it('check css transform', () => {

      // arrange
      const thumbnailDiv = componentDe.query(By.css('.thumbnails'));

      // assert
      expect(thumbnailDiv.nativeElement.style.transform).toEqual('translateX(0)')
    });
  });

});
