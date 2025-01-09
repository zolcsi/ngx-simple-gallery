import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpenGalleryDirective } from './open-gallery.directive';
import { GalleryService } from '../core/service/gallery.service';
import { Dialog } from '@angular/cdk/dialog';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ModalConfig } from '../core/model/modal-config';
import { GalleryItem } from '../core/model/gallery-item';
import { click } from '../../../testing/test-utilities';
import { ShowcaseDialogComponent } from '../showcase-dialog/showcase-dialog.component';

const modalConfig: ModalConfig = {
  showModalThumbnailList: true,
  startIndex: 1
};
const galleryItems: GalleryItem[] = [
  {
    src: 'https : // image number 1',
    thumbnail: 'https : // thumbnail number 1'
  },
  {
    src: 'https : // image number 2',
    thumbnail: 'https : // thumbnail number 2'
  }
];

@Component({
  standalone: true,
  template: ` <h2 [openGallery]="galleryItems" [modalConfig]="modalConfig">Click here to open gallery</h2>`,
  imports: [OpenGalleryDirective]
})
class TestComponent {
  galleryItems = galleryItems;
  modalConfig = modalConfig;
}

describe('OpenGalleryDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let elementRefMock: Partial<ElementRef>;
  let dialogMock: Partial<Dialog>;
  let galleryServiceMock: {
    applyModalConfig: jest.Mock,
    setGalleryItems: jest.Mock,
  };
  let rendererMock: Partial<Renderer2>;

  beforeEach(async () => {
    dialogMock = {
      open: jest.fn()
    };
    elementRefMock = {
      nativeElement: {
        style: {
          backgroundColor: undefined,
          cursor: undefined,
          fontSize: undefined,
          padding: undefined
        }
      }
    };
    galleryServiceMock = {
      applyModalConfig: jest.fn(),
      setGalleryItems: jest.fn()
    };
    rendererMock = {
      setProperty: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [OpenGalleryDirective, TestComponent],
      providers: [
        { provide: Dialog, useValue: dialogMock },
        { provide: ElementRef, useValue: elementRefMock },
        { provide: GalleryService, useValue: galleryServiceMock },
        { provide: Renderer2, useValue: rendererMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should set the cursor style to pointer on initiation', () => {
    // arrange
    const debugElement = fixture.debugElement;
    const openGalleryDirective = debugElement.query(By.directive(OpenGalleryDirective));
    const cursorStyle = openGalleryDirective.nativeElement.style.cursor;

    // assert
    expect(cursorStyle).toBe('pointer');
  });

  it('should set the modal config on initiation', () => {

    // arrange
    jest.spyOn(galleryServiceMock, 'applyModalConfig');

    // assert
    expect(galleryServiceMock.applyModalConfig).toHaveBeenCalledWith(modalConfig);
  });

  it('should set the gallery items and open the modal dialog on click', () => {

    // arrange
    jest.spyOn(galleryServiceMock, 'setGalleryItems');
    jest.spyOn(dialogMock, 'open');
    const debugElement = fixture.debugElement;
    const h2 = debugElement.query(By.css('h2'));

    // act
    click(h2);

    // assert
    expect(galleryServiceMock.setGalleryItems).toHaveBeenCalledWith(galleryItems);
    expect(dialogMock.open).toHaveBeenCalledWith(ShowcaseDialogComponent);
  });

  it('should display a message, that the gallery is empty, on click', () => {
    // arrange
    jest.spyOn(galleryServiceMock, 'setGalleryItems');
    jest.spyOn(dialogMock, 'open');

    fixture.componentInstance.galleryItems = [];
    fixture.detectChanges();

    const debugElement = fixture.debugElement;
    const h2 = debugElement.query(By.css('h2'));

    // act
    click(h2);

    // assert
    expect(galleryServiceMock.setGalleryItems).not.toHaveBeenCalled();
    expect(dialogMock.open).not.toHaveBeenCalled();

    const openGalleryDirective = debugElement.query(By.directive(OpenGalleryDirective));
    expect(openGalleryDirective.nativeElement.style.backgroundColor).toEqual('red');
    expect(openGalleryDirective.nativeElement.style.padding).toEqual('0.5rem 1rem 0.5rem 1rem');
    expect(openGalleryDirective.nativeElement.style.fontSize).toEqual('1.5rem');
    expect(openGalleryDirective.nativeElement.innerHTML).toEqual('<p>Gallery is empty. Provide items through [openGallery]="arrayOfGalleryItems"</p>');
  });
});
