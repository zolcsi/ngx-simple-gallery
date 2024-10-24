import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ShowcaseDialogComponent } from './showcase-dialog.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

const galleryItem = {
  src: 'https://picsum.photos/id/200/1200/1800',
};

describe('ImageDialogComponent', () => {
  let component: ShowcaseDialogComponent;
  let componentDe: DebugElement;
  let fixture: ComponentFixture<ShowcaseDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<DialogRef>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('DialogRef', ['close']);
    await TestBed.configureTestingModule({
      imports: [ShowcaseDialogComponent],
      providers: [
        {
          provide: DIALOG_DATA,
          useValue: { galleryItem },
        },
        {
          provide: DialogRef,
          useValue: dialogRefSpy,
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
      expect(image.role).toEqual('presentation');
    });

    it('should check the description of the image', () => {
      expect(imageDe.nativeElement.alt).toEqual('Gallery Image');
    });

    it('should check the src of the image', () => {
      expect(imageDe.nativeElement.src).toEqual(galleryItem.src);
    });

    it('should close the dialog by clicking on the image anywhere', () => {
      imageDe.triggerEventHandler('click', null);
      expect(dialogRefSpy.close).toHaveBeenCalledTimes(1);
    });
  });

  describe('should check the close button', () => {
    let closeButtonDe: DebugElement;

    beforeEach(() => {
      closeButtonDe = componentDe.query(By.css('.close-button'));
    });

    it('should check the role of the close button', () => {
      const closeButton: HTMLElement = closeButtonDe.nativeElement;
      expect(closeButton.role).toEqual('presentation');
    });

    it('should check the children of the close button', () => {
      expect(closeButtonDe.children.length).toEqual(1);
    });

    it('should check the icon of the close button', () => {
      const svgDe = closeButtonDe.children[0];
      expect(svgDe.name).toEqual('svg');
    });

    it('should close the dialog by clicking on the close button', () => {
      closeButtonDe.triggerEventHandler('click', null);
      expect(dialogRefSpy.close).toHaveBeenCalledTimes(1);
    });
  });
});
