import { TestBed } from '@angular/core/testing';
import { ServiceRegistry } from './service-registry';

describe('testing ServiceRegistry class', () => {

  describe('testing randomInstanceId()', () => {
    it('should provide random string of length 8', () => {
      expect(ServiceRegistry.randomInstanceId()).toMatch(/^[a-zA-Z0-9]{8}$/);
    });
  });

  describe('testing GALLERY_SERVICES injection token', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        providers: [{ provide: ServiceRegistry.GALLERY_SERVICES, useValue: [] }],
      });
    });

    it('should provide an empty array of gallery services', () => {
      const services = TestBed.inject(ServiceRegistry.GALLERY_SERVICES);
      expect(services).toEqual([]);
    });

    it('should provide a custom array of gallery services', () => {
      const customServices = [{ id: 'test-service' }];
      TestBed.configureTestingModule({
        providers: [{ provide: ServiceRegistry.GALLERY_SERVICES, useValue: customServices }],
      });
      const services = TestBed.inject(ServiceRegistry.GALLERY_SERVICES);
      expect(services).toEqual(customServices);
    });
  });
});
