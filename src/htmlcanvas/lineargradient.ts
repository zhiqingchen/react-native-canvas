import {Skia} from '@shopify/react-native-skia';
import type {SkShader} from '@shopify/react-native-skia';

import {parseColor} from './color';
import matrixFunc from './matrixFunc';
import {TileMode} from './enums';

export class LinearCanvasGradient {
  _shader: SkShader | null;
  _colors: any[];
  _pos: any[];
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  constructor(x1: number, y1: number, x2: number, y2: number) {
    this._shader = null;
    this._colors = [];
    this._pos = [];
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
  addColorStop(offset: number, color: any) {
    if (offset < 0 || offset > 1 || !isFinite(offset)) {
      throw 'offset must be between 0 and 1 inclusively';
    }

    color = parseColor(color);
    // From the spec: If multiple stops are added at the same offset on a
    // gradient, then they must be placed in the order added, with the first
    // one closest to the start of the gradient, and each subsequent one
    // infinitesimally further along towards the end point (in effect
    // causing all but the first and last stop added at each point to be
    // ignored).
    // To implement that, if an offset is already in the list,
    // we just overwrite its color (since the user can't remove Color stops
    // after the fact).
    var idx = this._pos.indexOf(offset);
    if (idx !== -1) {
      this._colors[idx] = color;
    } else {
      // insert it in sorted order
      for (idx = 0; idx < this._pos.length; idx++) {
        if (this._pos[idx] > offset) {
          break;
        }
      }
      this._pos.splice(idx, 0, offset);
      this._colors.splice(idx, 0, color);
    }
  }

  _copy() {
    var lcg = new LinearCanvasGradient(this.x1, this.y1, this.x2, this.y2);
    lcg._colors = this._colors.slice();
    lcg._pos = this._pos.slice();
    return lcg;
  }

  _dispose() {
    if (this._shader) {
      // this._shader.delete();
      this._shader = null;
    }
  }

  _getShader(currentTransform: any[]) {
    // From the spec: "The points in the linear gradient must be transformed
    // as described by the current transformation matrix when rendering."
    var pts = [this.x1, this.y1, this.x2, this.y2];
    matrixFunc.mapPoints(currentTransform, pts);
    var sx1 = pts[0];
    var sy1 = pts[1];
    var sx2 = pts[2];
    var sy2 = pts[3];

    this._dispose();

    this._shader = Skia.Shader.MakeLinearGradient(
      // [sx1, sy1],
      {x: sx1, y: sy1},
      // [sx2, sy2],
      {x: sx2, y: sy2},
      this._colors,
      this._pos,
      TileMode.Clamp,
    );

    return this._shader;
  }
}
