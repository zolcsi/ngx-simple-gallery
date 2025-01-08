import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpenGalleryDirective } from './open-gallery.directive';
import { GalleryService } from '../core/service/gallery.service';
import { Dialog } from '@angular/cdk/dialog';
import { Component, ElementRef } from '@angular/core';
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
  protected galleryItems = galleryItems;
  protected modalConfig = modalConfig;
}

describe('OpenGalleryDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let elementRefMock: Partial<ElementRef>;
  let dialogMock: Partial<Dialog>;
  let galleryServiceMock: {
    applyModalConfig: jest.Mock,
    setGalleryItems: jest.Mock,
  };

  beforeEach(async () => {
    dialogMock = {
      open: jest.fn()
    };
    elementRefMock = {
      nativeElement: {
        style: {
          cursor: undefined
        }
      }
    };
    galleryServiceMock = {
      applyModalConfig: jest.fn(),
      setGalleryItems: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [OpenGalleryDirective, TestComponent],
      providers: [
        { provide: Dialog, useValue: dialogMock },
        { provide: ElementRef, useValue: elementRefMock },
        { provide: GalleryService, useValue: galleryServiceMock }
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
});
