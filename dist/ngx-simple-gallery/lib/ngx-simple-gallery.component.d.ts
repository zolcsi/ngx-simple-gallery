import { GalleryItem } from './core/model/gallery-item';
import * as i0 from "@angular/core";
export declare class NgxSimpleGalleryComponent {
    galleryItems: import("@angular/core").InputSignal<GalleryItem[]>;
    thumbnailSize: import("@angular/core").InputSignal<number>;
    emptyMessage: import("@angular/core").InputSignal<string>;
    private readonly dialog;
    openDialog(galleryItem: GalleryItem): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxSimpleGalleryComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxSimpleGalleryComponent, "ngx-simple-gallery", never, { "galleryItems": { "alias": "galleryItems"; "required": true; "isSignal": true; }; "thumbnailSize": { "alias": "thumbnailSize"; "required": false; "isSignal": true; }; "emptyMessage": { "alias": "emptyMessage"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
