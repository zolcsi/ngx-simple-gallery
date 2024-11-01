import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogRef } from '@angular/cdk/dialog';
import { ShowcaseDialogComponent } from './showcase-dialog.component';
import { DebugElement, signal, WritableSignal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { GalleryService } from '../core/service/gallery.service';
import spyOn = jest.spyOn;

const galleryItem = {
  src: 'https://picsum.photos/id/200/1200/1800',
};

describe('ImageDialogComponent', () => {
  let component: ShowcaseDialogComponent;
  let componentDe: DebugElement;
  let fixture: ComponentFixture<ShowcaseDialogComponent>;
  let dialogRefMock: { close: jest.Mock };
  let galleryServiceMock: {
    imageSource: WritableSignal<string>;
    loadNext: jest.Mock;
    loadPrev: jest.Mock;
  };

  beforeEach(async () => {
    dialogRefMock = { close: jest.fn() };
    galleryServiceMock = {
      imageSource: signal(galleryItem.src),
      loadNext: jest.fn(),
      loadPrev: jest.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [ShowcaseDialogComponent],
      providers: [
        {
          provide: DialogRef,
          useValue: dialogRefMock,
        },
        {
          provide: GalleryService,
          useValue: galleryServiceMock,
        },
      ],
    }).compileComponents();

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
      expect(imageDe.nativeElement.src).toEqual(galleryItem.src);
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
});
