export class TransformationUtils {
  static calcTranslateX(itemOffsetLeft: number, containerWidth: number, itemWidth: number): number {
    return -(itemOffsetLeft - containerWidth / 2 + itemWidth / 2);
  }
}
