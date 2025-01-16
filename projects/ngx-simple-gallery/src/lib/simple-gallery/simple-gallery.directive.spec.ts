import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleGalleryDirective } from './simple-gallery.directive';
import { GalleryService } from '../core/service/gallery.service';
import { Dialog } from '@angular/cdk/dialog';
import { Component, ElementRef, Renderer2, signal, WritableSignal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { GalleryConfig } from '../core/model/gallery-config';
import { GalleryItem } from '../core/model/gallery-item';
import { click } from '../../../testing/test-utilities';
import { ShowcaseDialogComponent } from '../showcase-dialog/showcase-dialog.component';
import { ConfigUtils } from '../core/utils/config-utils';
import { ServiceRegistry } from '../core/service/service-registry';
import { NoopScrollStrategy } from '@angular/cdk/overlay';

const galleryConfig: GalleryConfig = {
  emptyMessage: 'Gallery is empty',
  showModalThumbnailList: true,
  modalStartIndex: 1,
};
const galleryItems: GalleryItem[] = [
  {
    src: 'https : // image number 1',
    thumbnail: 'https : // thumbnail number 1',
  },
  {
    src: 'https : // image number 2',
    thumbnail: 'https : // thumbnail number 2',
  },
];

@Component({
  standalone: true,
  template: ` <h2 simpleGallery [galleryItems]="galleryItems" [galleryConfig]="galleryConfig">
    Click here to open gallery
  </h2>`,
  imports: [SimpleGalleryDirective],
})
class TestComponent {
  galleryItems = galleryItems;
  galleryConfig = galleryConfig;
}

describe('SimpleGalleryDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let elementRefMock: Partial<ElementRef>;
  let dialogMock: Partial<Dialog>;
  let galleryServiceMock: {
    applyGalleryConfig: jest.Mock;
    getLibConfig: WritableSignal<GalleryConfig>;
    setGalleryItems: jest.Mock;
  };
  let galleryServicesMock: { get: jest.Mock; set: jest.Mock };
  let rendererMock: Partial<Renderer2>;

  beforeEach(async () => {
    dialogMock = {
      open: jest.fn(),
    };
    elementRefMock = {
      nativeElement: {
        style: {
          backgroundColor: undefined,
          cursor: undefined,
          fontSize: undefined,
          padding: undefined,
        },
      },
    };
    galleryServiceMock = {
      applyGalleryConfig: jest.fn(),
      getLibConfig: signal({ ...ConfigUtils.defaultLibConfig() }),
      setGalleryItems: jest.fn(),
    };
    galleryServicesMock = {
      get: jest.fn().mockReturnValue(galleryServiceMock),
      set: jest.fn(),
    };
    rendererMock = {
      setProperty: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [SimpleGalleryDirective, TestComponent],
      providers: [
        { provide: Dialog, useValue: dialogMock },
        { provide: ElementRef, useValue: elementRefMock },
        { provide: GalleryService, useValue: galleryServiceMock },
        { provide: Renderer2, useValue: rendererMock },
        { provide: ServiceRegistry.GALLERY_SERVICES, useValue: galleryServicesMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should set the cursor style to pointer on initiation', () => {
    // arrange
    const debugElement = fixture.debugElement;
    const simpleGalleryDirective = debugElement.query(By.directive(SimpleGalleryDirective));
    const cursorStyle = simpleGalleryDirective.nativeElement.style.cursor;

    // assert
    expect(cursorStyle).toBe('pointer');
  });

  it('should set the modal config on initiation', () => {
    // arrange
    jest.spyOn(galleryServiceMock, 'applyGalleryConfig');

    // assert
    expect(galleryServiceMock.applyGalleryConfig).toHaveBeenCalledWith(galleryConfig);
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
    expect(dialogMock.open).toHaveBeenCalledWith(
      ShowcaseDialogComponent,
      expect.objectContaining({
        data: expect.stringMatching(/.{8}/),
        scrollStrategy: new NoopScrollStrategy(),
      }),
    );
  });

  it('should display a message, when the gallery is empty, on click', () => {
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

    const simpleGalleryDirective = debugElement.query(By.directive(SimpleGalleryDirective));
    expect(simpleGalleryDirective.nativeElement.style.backgroundColor).toEqual('red');
    expect(simpleGalleryDirective.nativeElement.style.padding).toEqual('0.5rem 1rem 0.5rem 1rem');
    expect(simpleGalleryDirective.nativeElement.style.fontSize).toEqual('1.5rem');
    expect(simpleGalleryDirective.nativeElement.innerHTML).toEqual('<p>Empty gallery, no images provided.</p>');
  });
});
