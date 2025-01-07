import { TransformationUtils } from './transformation-utils';

describe('TransformationUtils', () => {
  describe('calcTranslateX', () => {
    it('should return the correct translateX value when item is at the center of the container', () => {
      const itemOffsetLeft = 100;
      const containerWidth = 200;
      const itemWidth = 50;
      const expectedTranslateX = -25;

      const result = TransformationUtils.calcTranslateX(itemOffsetLeft, containerWidth, itemWidth);
      expect(result).toEqual(expectedTranslateX);
    });

    it('should return the correct translateX value when item is at the left edge of the container', () => {
      const itemOffsetLeft = 0;
      const containerWidth = 200;
      const itemWidth = 75;
      const expectedTranslateX = 62.5;

      const result = TransformationUtils.calcTranslateX(itemOffsetLeft, containerWidth, itemWidth);
      expect(result).toEqual(expectedTranslateX);
    });

    it('should return the correct translateX value when item is at the right edge of the container', () => {
      const itemOffsetLeft = 150;
      const containerWidth = 200;
      const itemWidth = 50;
      const expectedTranslateX = -75;

      const result = TransformationUtils.calcTranslateX(itemOffsetLeft, containerWidth, itemWidth);
      expect(result).toEqual(expectedTranslateX);
    });

    it('should return 0 when container width is 0', () => {
      const itemOffsetLeft = 0;
      const containerWidth = 0;
      const itemWidth = 0;
      const expectedTranslateX = -0;

      const result = TransformationUtils.calcTranslateX(itemOffsetLeft, containerWidth, itemWidth);
      expect(result).toEqual(expectedTranslateX);
    });
  });
});
