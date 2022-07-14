import type {SkImage} from '@shopify/react-native-skia';

class HTMLImage {
  _skImage: SkImage;
  width: number;
  height: number;
  naturalWidth: number;
  naturalHeight: number;

  constructor(skImage: SkImage) {
    this._skImage = skImage;
    this.width = skImage.width();
    this.height = skImage.height();
    this.naturalWidth = this.width;
    this.naturalHeight = this.height;
  }

  getSkImage() {
    return this._skImage;
  }
}

export default HTMLImage;
