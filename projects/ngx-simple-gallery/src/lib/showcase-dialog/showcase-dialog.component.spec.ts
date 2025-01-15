import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ShowcaseDialogComponent } from './showcase-dialog.component';
import { DebugElement, signal, WritableSignal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { GalleryService } from '../core/service/gallery.service';
import { GalleryItem } from '../core/model/gallery-item';
import { GalleryConfig } from '../core/model/gallery-config';
import { ConfigUtils } from '../core/utils/config-utils';
import { ServiceRegistry } from '../core/service/service-registry';
import spyOn = jest.spyOn;

const galleryItems: GalleryItem[] = [
  {
    src: 'image-number-one',
    thumbnail: 'thumbnail number 1',
  },
  {
    src: 'image-number-two',
    thumbnail: 'thumbnail number 2',
  },
];

describe('ImageDialogComponent', () => {
  let component: ShowcaseDialogComponent;
  let componentDe: DebugElement;
  let fixture: ComponentFixture<ShowcaseDialogComponent>;
  let dialogRefMock: { close: jest.Mock };
  let galleryServiceMock: {
    imageSource: WritableSignal<string>;
    galleryItems: WritableSignal<GalleryItem[]>;
    getIsLoading: WritableSignal<boolean>;
    getLibConfig: WritableSignal<GalleryConfig>;
    loadNext: jest.Mock;
    loadPrev: jest.Mock;
    stopLoading: jest.Mock;
  };
  let galleryServicesMock: { get: jest.Mock };

  beforeEach(async () => {
    dialogRefMock = { close: jest.fn() };
    galleryServiceMock = {
      imageSource: signal(galleryItems[0].src),
      galleryItems: signal([]),
      getIsLoading: signal(false),
      getLibConfig: signal({ ...ConfigUtils.defaultLibConfig(), showModalThumbnailList: false }),
      loadNext: jest.fn(),
      loadPrev: jest.fn(),
      stopLoading: jest.fn(),
    };
    galleryServicesMock = {
      get: jest.fn().mockReturnValue(galleryServiceMock),
    };

    await TestBed.configureTestingModule({
      imports: [ShowcaseDialogComponent],
      providers: [
        { provide: DialogRef, useValue: dialogRefMock },
        { provide: GalleryService, useValue: galleryServiceMock },
        { provide: DIALOG_DATA, useValue: 'TEST_INSTANCE_ID' },
        { provide: ServiceRegistry.GALLERY_SERVICES, useValue: galleryServicesMock },
      ],
    }).compileComponents();

    galleryServiceMock.galleryItems.set(galleryItems);

    fixture = TestBed.createComponent(ShowcaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    componentDe = fixture.debugElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('should check the image', () => {
    let imageDe: DebugElement;
    let image: HTMLElement;

    beforeEach(() => {
      imageDe = componentDe.query(By.css('img'));
      image = imageDe.nativeElement;
    });

    it('should check the role of the image', () => {
      expect(image.getAttribute('role')).toEqual('presentation');
    });

    it('should check the description of the image', () => {
      expect(imageDe.nativeElement.alt).toEqual('Gallery Image');
    });

    it('should check the src of the image', () => {
      expect(imageDe.nativeElement.src).toContain(galleryItems[0].src);
    });

    it('should close the dialog by clicking on the image anywhere', () => {
      const dialogRefSpyOnClose = spyOn(dialogRefMock, 'close');
      imageDe.triggerEventHandler('click', null);
      expect(dialogRefSpyOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('should check the close button', () => {
    let closeButtonDe: DebugElement;

    beforeEach(() => {
      closeButtonDe = componentDe.query(By.css('.close-button'));
    });

    it('should check the role of the close button', () => {
      const closeButton: HTMLElement = closeButtonDe.nativeElement;
      expect(closeButton.getAttribute('role')).toEqual('presentation');
    });

    it('should check the children of the close button', () => {
      expect(closeButtonDe.children.length).toEqual(1);
    });

    it('should check the icon of the close button', () => {
      const svgDe = closeButtonDe.children[0];
      expect(svgDe.name).toEqual('svg');
    });

    it('should close the dialog by clicking on the close button', () => {
      const dialogRefSpyOnClose = spyOn(dialogRefMock, 'close');
      closeButtonDe.triggerEventHandler('click', null);
      expect(dialogRefSpyOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('should check the next button', () => {
    let nextButtonDe: DebugElement;

    beforeEach(() => {
      nextButtonDe = componentDe.query(By.css('.right-chevron'));
    });

    it('should check the role of the next button', () => {
      const nextButton: HTMLElement = nextButtonDe.nativeElement;
      expect(nextButton.getAttribute('role')).toEqual('presentation');
    });

    it('should check the children of the next button', () => {
      expect(nextButtonDe.children.length).toEqual(1);
    });

    it('should check the icon of the next button', () => {
      const svgDe = nextButtonDe.children[0];
      expect(svgDe.name).toEqual('svg');
    });

    it('should trigger next image loading by clicking on the next button', () => {
      const galleryServiceSpyOnNext = spyOn(galleryServiceMock, 'loadNext');
      nextButtonDe.triggerEventHandler('click', null);
      expect(galleryServiceSpyOnNext).toHaveBeenCalledTimes(1);
    });
  });

  describe('should check the previous button', () => {
    let prevButtonDe: DebugElement;

    beforeEach(() => {
      prevButtonDe = componentDe.query(By.css('.left-chevron'));
    });

    it('should check the role of the prev button', () => {
      const prevButton: HTMLElement = prevButtonDe.nativeElement;
      expect(prevButton.getAttribute('role')).toEqual('presentation');
    });

    it('should check the children of the prev button', () => {
      expect(prevButtonDe.children.length).toEqual(1);
    });

    it('should check the icon of the prev button', () => {
      const svgDe = prevButtonDe.children[0];
      expect(svgDe.name).toEqual('svg');
    });

    it('should trigger prev image loading by clicking on the prev button', () => {
      const galleryServiceSpyOnPrev = spyOn(galleryServiceMock, 'loadPrev');
      prevButtonDe.triggerEventHandler('click', null);
      expect(galleryServiceSpyOnPrev).toHaveBeenCalledTimes(1);
    });
  });

  describe('testing keydown events to navigate forward/backward', () => {
    it('should press the right arrow to load the next item', () => {
      const galleryServiceSpyOnNext = spyOn(galleryServiceMock, 'loadNext');
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });

      document.dispatchEvent(event);

      expect(galleryServiceSpyOnNext).toHaveBeenCalledTimes(1);
    });

    it('should press the left arrow to load the previous item', () => {
      const galleryServiceSpyOnPrev = spyOn(galleryServiceMock, 'loadPrev');
      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });

      document.dispatchEvent(event);

      expect(galleryServiceSpyOnPrev).toHaveBeenCalledTimes(1);
    });
  });

  describe('testing imageLoaded()', () => {
    it('should call the stopLoading()', () => {
      // arrange
      const galleryServiceSpyOnStopLoading = spyOn(galleryServiceMock, 'stopLoading');
      const imageDe = componentDe.query(By.css('img'));

      // act
      imageDe.nativeElement.dispatchEvent(new Event('load'));

      // assert
      expect(galleryServiceSpyOnStopLoading).toHaveBeenCalledTimes(1);
    });
  });
});
