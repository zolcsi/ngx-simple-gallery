import { ConfigUtils } from './config-utils';
import { GalleryConfig } from '../model/gallery-config';
import { Constants } from '../constants';

describe('ConfigUtils', () => {
  describe('testing normalizeStartIndex()', () => {
    it('should return 0 when startIndex is less than 0', () => {
      const startIndex = -1;
      const numOfItems = 10;
      const result = ConfigUtils.normalizeStartIndex(startIndex, numOfItems);
      expect(result).toBe(0);
    });

    it('should return the startIndex when it is within bounds', () => {
      const startIndex = 5;
      const numOfItems = 10;
      const result = ConfigUtils.normalizeStartIndex(startIndex, numOfItems);
      expect(result).toBe(startIndex);
    });

    it('should return the last index when startIndex is greater than or equal to numOfItems', () => {
      const startIndex = 10;
      const numOfItems = 10;
      const result = ConfigUtils.normalizeStartIndex(startIndex, numOfItems);
      expect(result).toBe(numOfItems - 1);
    });

    it('should return 0 when numOfItems is 0', () => {
      const startIndex = 5;
      const numOfItems = 0;
      const result = ConfigUtils.normalizeStartIndex(startIndex, numOfItems);
      expect(result).toBe(0);
    });

    it('should return 0 when startIndex is undefined', () => {
      const startIndex = undefined as unknown as number;
      const numOfItems = 10;
      const result = ConfigUtils.normalizeStartIndex(startIndex, numOfItems);
      expect(result).toBe(0);
    });

    it('should return 0 when startIndex is NaN', () => {
      const startIndex = NaN;
      const numOfItems = 10;
      const result = ConfigUtils.normalizeStartIndex(startIndex, numOfItems);
      expect(result).toBe(0);
    });
  });

  describe('testing defaultGalleryConfig()', () => {
    it('should return a default modal config object', () => {
      const result = ConfigUtils.defaultLibConfig();
      expect(result).toEqual({
        emptyMessage: Constants.defaultEmptyMessage,
        galleryThumbnailSize: Constants.defaultGalleryThumbnailSize,
        modalStartIndex: Constants.defaultModalStartIndex,
        showModalThumbnailList: Constants.defaultShowModalThumbnailList,
      } as GalleryConfig);
    });
  });
});
