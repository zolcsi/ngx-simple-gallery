import { ConfigUtils } from './config-utils';

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

    it('should return 0 when startIndex is NaN', () => {
      const startIndex = NaN;
      const numOfItems = 10;
      const result = ConfigUtils.normalizeStartIndex(startIndex, numOfItems);
      expect(result).toBe(0);
    });
  });
});
