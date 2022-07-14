import {SkCanvas, Skia} from '@shopify/react-native-skia';
import type {SkData, SkTypeface} from '@shopify/react-native-skia';

import {CanvasRenderingContext2D} from './canvas2dcontext';
import HTMLImage from './htmlimage';
import {addToFontCache, Descriptors} from './font';
import {Path2D} from './path2d';

export function MakeCanvas(canvas: SkCanvas) {
  return new HTMLCanvas(canvas);
}

export class HTMLCanvas {
  _context: CanvasRenderingContext2D;
  _toCleanup: any[];

  constructor(skcanvas: SkCanvas) {
    this._context = new CanvasRenderingContext2D(skcanvas);
    this._toCleanup = [];
  }

  decodeImage(data: SkData) {
    var img = Skia.Image.MakeImageFromEncoded(data);
    if (!img) {
      throw 'Invalid input';
    }
    this._toCleanup.push(img);
    return new HTMLImage(img);
  }

  loadFont(buffer: SkData, descriptors: Descriptors) {
    const newFont: SkTypeface | null = Skia.Typeface.MakeFreeTypeFaceFromData(buffer);
    if (!newFont) {
      return null;
    }
    this._toCleanup.push(newFont);
    addToFontCache(newFont, descriptors);
  }

  makePath2D(path: any) {
    var p2d = new Path2D(path);
    this._toCleanup.push(p2d._getPath());
    return p2d;
  }

  getContext(type: string) {
    if (type === '2d') {
      return this._context;
    }
    return null;
  }

  dispose() {
    // this._context._dispose();
    this._toCleanup.forEach(function (i) {
      i.delete();
    });
  }
}
