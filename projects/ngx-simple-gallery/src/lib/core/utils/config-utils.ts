export class ConfigUtils {
  static normalizeStartIndex(startIndex: number, numOfItems: number): number {
    let result: number;
    switch (true) {
      case isNaN(startIndex):
      case startIndex === undefined:
      case startIndex < 0:
      case numOfItems === 0:
        result = 0;
        break;
      case startIndex >= numOfItems:
        result = numOfItems - 1;
        break;
      default:
        result = startIndex;
        break;
    }

    return result;
  }
}
