import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpenGalleryDirective } from './open-gallery.directive';
import { GalleryService } from '../core/service/gallery.service';
import { Dialog } from '@angular/cdk/dialog';
import { signal } from '@angular/core';

describe('OpenGalleryDirective', () => {
  let fixture: ComponentFixture<OpenGalleryDirective>;
  let directive: OpenGalleryDirective;
  let galleryServiceMock: Partial<GalleryService>;

  beforeEach(async () => {
    galleryServiceMock = {
      setItemIndex: jest.fn(),
      getItemIndex: signal(0),
      setModalConfig: jest.fn(),
      setGalleryItems: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [OpenGalleryDirective],
      providers: [
        { provide: Dialog, useValue: {} },
        { provide: GalleryService, useValue: galleryServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OpenGalleryDirective);
    directive = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set the cursor style to pointer', () => {
    const debugElement = fixture.debugElement;
    const nativeElement = debugElement.nativeElement;
    expect(nativeElement.style.cursor).toBe('pointer');
  });

  it('should set the start index of the gallery service', () => {
    const startIndex = 2;
    directive.startIndex = startIndex;
    expect(galleryServiceMock.getItemIndex).toHaveBeenCalled();
  });

  // it('should set the modal config of the gallery service', () => {
  //   const modalConfig: ModalConfig = {
  //     width: '500px',
  //     height: '500px',
  //   };
  //   directive.modalConfig = modalConfig;
  //   expect(directive.galleryService.getModalConfig()).toEqual(modalConfig);
  // });
  //
  // it('should set the gallery items of the gallery service', () => {
  //   const galleryItems: GalleryItem[] = [
  //     {
  //       url: 'https://example.com/image1.jpg',
  //       alt: 'Image 1',
  //     },
  //     {
  //       url: 'https://example.com/image2.jpg',
  //       alt: 'Image 2',
  //     },
  //   ];
  //   directive.openGallery = galleryItems;
  //   expect(directive.galleryService.getGalleryItems()).toEqual(galleryItems);
  // });
  //
  // it('should open the showcase dialog when clicked', () => {
  //   const dialog = TestBed.inject(Dialog);
  //   spyOn(dialog, 'open');
  //   directive.onClick();
  //   expect(dialog.open).toHaveBeenCalledWith(ShowcaseDialogComponent);
  // });
});
