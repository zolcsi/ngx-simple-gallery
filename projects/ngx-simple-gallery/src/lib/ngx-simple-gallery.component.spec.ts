import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxSimpleGalleryComponent } from './ngx-simple-gallery.component';
import { DebugElement, signal, WritableSignal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Constants } from './core/constants';
import { Dialog } from '@angular/cdk/dialog';
import { ShowcaseDialogComponent } from './showcase-dialog/showcase-dialog.component';
import { GalleryItem } from './core/model/gallery-item';
import { GalleryService } from './core/service/gallery.service';
import spyOn = jest.spyOn;

const galleryItemsFixture: GalleryItem[] = [
  {
    src: 'https://picsum.photos/id/001/1200/1800',
  },
  {
    src: 'https://picsum.photos/id/002/1200/1800',
    thumbnail: 'https://picsum.photos/id/002/300/200',
  },
];

const thumbnailWrappersCss = By.css('.thumbnail-wrapper');
const imagesCss = By.css('img.thumbnail-image');
const emptyMessageCss = By.css('.empty-message');

describe('GalleryComponent', () => {
  let component: NgxSimpleGalleryComponent;
  let componentDe: DebugElement;
  let fixture: ComponentFixture<NgxSimpleGalleryComponent>;
  let dialogMock: { open: jest.Mock };
  let galleryServiceMock: {
    galleryItems: WritableSignal<GalleryItem[]>;
    setGalleryItems: jest.Mock;
    setItemIndex: jest.Mock;
  };

  beforeEach(async () => {
    dialogMock = { open: jest.fn() };
    galleryServiceMock = {
      galleryItems: signal([]),
      setGalleryItems: jest.fn(),
      setItemIndex: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [NgxSimpleGalleryComponent],
      providers: [
        {
          provide: Dialog,
          useValue: dialogMock,
        },
        {
          provide: GalleryService,
          useValue: galleryServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxSimpleGalleryComponent);
    fixture.componentRef.setInput('galleryItems', []);
    component = fixture.componentInstance;
    componentDe = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
    expect(galleryServiceMock.setGalleryItems).toHaveBeenCalledTimes(1);
  });

  describe('testing empty gallery', () => {
    it('should have no thumbnail wrappers, as there are no images', () => {
      const thumbnailWrappers = componentDe.queryAll(thumbnailWrappersCss);
      expect(thumbnailWrappers.length).toEqual(0);
    });

    it('should display the empty gallery message', () => {
      const emptyMessageDe = componentDe.query(emptyMessageCss);
      const emptyMessage = emptyMessageDe.nativeElement;
      expect(emptyMessage.textContent).toEqual(Constants.defaultEmptyMessage);
    });
  });

  describe('testing default settings', () => {
    beforeEach(() => {
      galleryServiceMock.galleryItems.set(galleryItemsFixture);
      fixture.detectChanges();
      componentDe = fixture.debugElement;
    });

    it('should not display the empty gallery message', () => {
      const emptyMessageDe = componentDe.query(emptyMessageCss);
      expect(emptyMessageDe).toBeNull();
    });

    it('should display the wrappers for the images', () => {
      const thumbnailWrappersDe = componentDe.queryAll(thumbnailWrappersCss);
      expect(thumbnailWrappersDe.length).toEqual(galleryItemsFixture.length);
    });

    it('should display the images', () => {
      const imagesDe = componentDe.queryAll(imagesCss);
      expect(imagesDe.length).toEqual(galleryItemsFixture.length);
    });

    it('should match the src of the image where no thumbnail is provided', () => {
      const imagesDe = componentDe.queryAll(imagesCss);
      expect(imagesDe[0].nativeElement.src).toEqual(galleryItemsFixture[0].src);
    });

    it('should match the src of the image where thumbnail is provided', () => {
      const imagesDe = componentDe.queryAll(imagesCss);
      expect(imagesDe[1].nativeElement.src).toEqual(galleryItemsFixture[1].thumbnail);
    });

    it('should match the width of the images', () => {
      const defaultThumbnailSize = Constants.defaultThumbnailSize;
      const imagesDe = componentDe.queryAll(imagesCss);
      expect(imagesDe[0].nativeElement.width).toEqual(defaultThumbnailSize);
      expect(imagesDe[1].nativeElement.width).toEqual(defaultThumbnailSize);
    });

    it('should match the width and height of the images', () => {
      const defaultThumbnailSize = Constants.defaultThumbnailSize;
      const imagesDe = componentDe.queryAll(imagesCss);
      expect(imagesDe[0].nativeElement.height).toEqual(defaultThumbnailSize);
      expect(imagesDe[1].nativeElement.height).toEqual(defaultThumbnailSize);
    });

    it('should match the description of the images', () => {
      const imagesDe = componentDe.queryAll(imagesCss);
      expect(imagesDe[0].nativeElement.alt).toEqual('Gallery image 0');
      expect(imagesDe[1].nativeElement.alt).toEqual('Gallery image 1');
    });
  });

  describe('testing custom thumbnail size', () => {
    const customThumbnailSize = 65;

    beforeEach(() => {
      galleryServiceMock.galleryItems.set(galleryItemsFixture);
      fixture.componentRef.setInput('galleryItems', galleryItemsFixture);
      fixture.componentRef.setInput('thumbnailSize', customThumbnailSize);
      fixture.detectChanges();
      componentDe = fixture.debugElement;
    });

    it('should display the images according to the custom thumbnail size - width', () => {
      const imagesDe = componentDe.queryAll(imagesCss);
      expect(imagesDe[0].nativeElement.width).toEqual(customThumbnailSize);
      expect(imagesDe[1].nativeElement.width).toEqual(customThumbnailSize);
    });

    it('should display the images according to the custom thumbnail size - height', () => {
      const imagesDe = componentDe.queryAll(imagesCss);
      expect(imagesDe[0].nativeElement.height).toEqual(customThumbnailSize);
      expect(imagesDe[1].nativeElement.height).toEqual(customThumbnailSize);
    });
  });

  describe('testing click on an image', () => {
    beforeEach(() => {
      galleryServiceMock.galleryItems.set(galleryItemsFixture);
      fixture.detectChanges();
      componentDe = fixture.debugElement;
    });

    it('should open the dialog with the first image', () => {
      // arrange
      const dialogSpyOnOpen = spyOn(dialogMock, 'open');
      const thumbnailWrappersDe = componentDe.queryAll(thumbnailWrappersCss);

      // act
      thumbnailWrappersDe[0].triggerEventHandler('click', null);

      // assert
      expect(dialogSpyOnOpen).toHaveBeenCalledTimes(1);
      expect(dialogSpyOnOpen).toHaveBeenCalledWith(ShowcaseDialogComponent);
      expect(galleryServiceMock.setItemIndex).toHaveBeenCalledTimes(1);
    });
  });
});
