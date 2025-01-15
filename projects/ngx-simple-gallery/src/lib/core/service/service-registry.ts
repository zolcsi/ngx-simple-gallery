import { InjectionToken } from '@angular/core';
import { GalleryService } from './gallery.service';

export class ServiceRegistry {
  static readonly GALLERY_SERVICES = new InjectionToken<Map<string, GalleryService>>('GALLERY_SERVICES', {
    providedIn: 'root',
    factory: (): Map<string, GalleryService> => new Map<string, GalleryService>(),
  });

  static randomInstanceId(): string {
    return Math.random().toString(36).substring(2, 10);
  }
}
