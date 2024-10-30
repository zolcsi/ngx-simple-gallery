import * as i0 from '@angular/core';
import { Injectable, inject, Component, ChangeDetectionStrategy, input } from '@angular/core';
import { DIALOG_DATA, DialogRef, Dialog } from '@angular/cdk/dialog';

class NgxSimpleGalleryService {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: NgxSimpleGalleryService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: NgxSimpleGalleryService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: NgxSimpleGalleryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

const Constants = {
    defaultEmptyMessage: 'Empty gallery, no images provided.',
    defaultThumbnailSize: 160,
};

class ShowcaseDialogComponent {
    data = inject(DIALOG_DATA);
    dialogRef = inject(DialogRef);
    closeDialog() {
        this.dialogRef.close();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: ShowcaseDialogComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.9", type: ShowcaseDialogComponent, isStandalone: true, selector: "ng-component", ngImport: i0, template: "<div class=\"showcase-dialog\">\n  <div role=\"presentation\" class=\"close-button\" (click)=\"closeDialog()\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n      <path id=\"svgPath\"\n            d=\"M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z\"></path>\n    </svg>\n  </div>\n\n  <img role=\"presentation\" alt=\"Gallery Image\" [src]=\"data.galleryItem.src\" (click)=\"closeDialog()\">\n</div>\n", styles: [":host{display:block}.showcase-dialog{position:relative;background-color:#333}.close-button{position:absolute;top:.125rem;right:.125rem;display:flex;padding:1rem;background-color:#333;border-radius:.25rem;cursor:pointer}img{width:100vw;height:100vh;object-fit:contain}#svgPath{fill:#e0e0e0}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: ShowcaseDialogComponent, decorators: [{
            type: Component,
            args: [{ standalone: true, imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"showcase-dialog\">\n  <div role=\"presentation\" class=\"close-button\" (click)=\"closeDialog()\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n      <path id=\"svgPath\"\n            d=\"M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z\"></path>\n    </svg>\n  </div>\n\n  <img role=\"presentation\" alt=\"Gallery Image\" [src]=\"data.galleryItem.src\" (click)=\"closeDialog()\">\n</div>\n", styles: [":host{display:block}.showcase-dialog{position:relative;background-color:#333}.close-button{position:absolute;top:.125rem;right:.125rem;display:flex;padding:1rem;background-color:#333;border-radius:.25rem;cursor:pointer}img{width:100vw;height:100vh;object-fit:contain}#svgPath{fill:#e0e0e0}\n"] }]
        }] });

class NgxSimpleGalleryComponent {
    galleryItems = input.required({});
    thumbnailSize = input(Constants.defaultThumbnailSize);
    emptyMessage = input(Constants.defaultEmptyMessage);
    dialog = inject(Dialog);
    openDialog(galleryItem) {
        this.dialog.open(ShowcaseDialogComponent, {
            data: {
                galleryItem,
            },
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: NgxSimpleGalleryComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.9", type: NgxSimpleGalleryComponent, isStandalone: true, selector: "ngx-simple-gallery", inputs: { galleryItems: { classPropertyName: "galleryItems", publicName: "galleryItems", isSignal: true, isRequired: true, transformFunction: null }, thumbnailSize: { classPropertyName: "thumbnailSize", publicName: "thumbnailSize", isSignal: true, isRequired: false, transformFunction: null }, emptyMessage: { classPropertyName: "emptyMessage", publicName: "emptyMessage", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div class=\"gallery-wrapper\">\n  @for (image of galleryItems(); track image.src; let i = $index) {\n    <div role=\"presentation\" class=\"thumbnail-wrapper\" (click)=\"openDialog(image)\">\n      <img class=\"thumbnail-image\"\n           [src]=\"image.thumbnail ?? image.src\"\n           [width]=\"thumbnailSize()\"\n           [height]=\"thumbnailSize()\"\n           [alt]=\"'Gallery image ' + i\"/>\n    </div>\n  } @empty {\n    <div class=\"empty-message\">{{emptyMessage()}}</div>\n  }\n</div>\n", styles: [".gallery-wrapper{width:100%;display:flex;flex-wrap:wrap;justify-content:center;gap:1rem}.thumbnail-wrapper{cursor:pointer}.thumbnail-image{object-fit:cover}.empty-message{text-align:center;font-size:1.2rem}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: NgxSimpleGalleryComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-simple-gallery', standalone: true, imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"gallery-wrapper\">\n  @for (image of galleryItems(); track image.src; let i = $index) {\n    <div role=\"presentation\" class=\"thumbnail-wrapper\" (click)=\"openDialog(image)\">\n      <img class=\"thumbnail-image\"\n           [src]=\"image.thumbnail ?? image.src\"\n           [width]=\"thumbnailSize()\"\n           [height]=\"thumbnailSize()\"\n           [alt]=\"'Gallery image ' + i\"/>\n    </div>\n  } @empty {\n    <div class=\"empty-message\">{{emptyMessage()}}</div>\n  }\n</div>\n", styles: [".gallery-wrapper{width:100%;display:flex;flex-wrap:wrap;justify-content:center;gap:1rem}.thumbnail-wrapper{cursor:pointer}.thumbnail-image{object-fit:cover}.empty-message{text-align:center;font-size:1.2rem}\n"] }]
        }] });

/*
 * Public API Surface of ngx-simple-gallery
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgxSimpleGalleryComponent, NgxSimpleGalleryService };
//# sourceMappingURL=ngx-simple-gallery.mjs.map
