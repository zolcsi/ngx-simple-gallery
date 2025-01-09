import { Constants } from '../constants';
import { LibConfig } from '../model/lib-config';

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

  static defaultLibConfig(): LibConfig {
    return {
      emptyMessage: Constants.defaultEmptyMessage,
      galleryThumbnailSize: Constants.defaultGalleryThumbnailSize,
      modalStartIndex: Constants.defaultModalStartIndex,
      showModalThumbnailList: Constants.defaultShowModalThumbnailList,
    };
  }
}
