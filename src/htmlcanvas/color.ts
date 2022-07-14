import {Skia} from '@shopify/react-native-skia';
import {getColorComponents} from './util';
// Functions dealing with parsing/stringifying color go here.

// Create the following with
// node ./htmlcanvas/_namedcolors.js --expose-wasm
// JS/closure doesn't have a constexpr like thing which
// would really help here. Since we don't, we pre-compute
// the map, which saves (a tiny amount of) startup time
// and (a small amount of) code size.
/* @dict */

export function colorToString(skcolor: any[]) {
  // https://html.spec.whatwg.org/multipage/canvas.html#serialisation-of-a-color
  var components = getColorComponents(skcolor);
  var r = components[0];
  var g = components[1];
  var b = components[2];
  var a = components[3];
  if (a === 1.0) {
    // hex
    r = r.toString(16).toLowerCase();
    g = g.toString(16).toLowerCase();
    b = b.toString(16).toLowerCase();
    r = r.length === 1 ? '0' + r : r;
    g = g.length === 1 ? '0' + g : g;
    b = b.length === 1 ? '0' + b : b;
    return '#' + r + g + b;
  } else {
    a = a === 0 || a === 1 ? a : a.toFixed(8);
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
  }
}

export function parseColor(colorStr: string) {
  return Skia.Color(colorStr);
}

export function Color4f(r: number, g: number, b: number, a: number) {
  if (a === undefined) {
    a = 1;
  }
  return Float32Array.of(r, g, b, a);
}

export const CanvasKitColor = {
  TRANSPARENT: Color4f(0, 0, 0, 0),
  BLACK: Color4f(0, 0, 0, 1),
  WHITE: Color4f(1, 1, 1, 1),
  RED: Color4f(1, 0, 0, 1),
  GREEN: Color4f(0, 1, 0, 1),
  BLUE: Color4f(0, 0, 1, 1),
  YELLOW: Color4f(1, 1, 0, 1),
  CYAN: Color4f(0, 1, 1, 1),
  MAGENTA: Color4f(1, 0, 1, 1),
};
