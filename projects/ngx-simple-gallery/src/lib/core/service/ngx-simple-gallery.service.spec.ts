import { TestBed } from '@angular/core/testing';

import { NgxSimpleGalleryService } from './ngx-simple-gallery.service';

describe('NgxSimpleGalleryService', () => {
  let service: NgxSimpleGalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSimpleGalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
