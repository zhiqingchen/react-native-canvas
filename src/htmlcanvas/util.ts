/* eslint-disable no-bitwise */
export function allAreFinite(args: string | any[]) {
  for (var i = 0; i < args.length; i++) {
    if (args[i] !== undefined && !Number.isFinite(args[i])) {
      return false;
    }
  }
  return true;
}

export function radiansToDegrees(rad: number) {
  return (rad / Math.PI) * 180;
}

export function degreesToRadians(deg: number) {
  return (deg / 180) * Math.PI;
}

export function almostEqual(floata: number, floatb: number) {
  return Math.abs(floata - floatb) < 0.00001;
}

export function toBase64String(bytes: any) {
  if (typeof Buffer !== 'undefined') {
    // Are we on node?
    return Buffer.from(bytes).toString('base64');
  } else {
    // From https://stackoverflow.com/a/25644409
    // because the naive solution of
    //     btoa(String.fromCharCode.apply(null, bytes));
    // would occasionally throw "Maximum call stack size exceeded"
    var CHUNK_SIZE = 0x8000; //arbitrary number
    var index = 0;
    var length = bytes.length;
    var result = '';
    var slice;
    while (index < length) {
      slice = bytes.slice(index, Math.min(index + CHUNK_SIZE, length));
      result += String.fromCharCode.apply(null, slice);
      index += CHUNK_SIZE;
    }
    return Base64.btoa(result);
  }
}

export function isCanvasKitColor(ob: any) {
  if (!ob) {
    return false;
  }
  return ob.constructor === Float32Array && ob.length === 4;
}

export function multiplyByAlpha(color: any, alpha: number) {
  // make a copy of the color so the function remains pure.
  var result = color.slice();
  result[3] = Math.max(0, Math.min(result[3] * alpha, 1));
  return result;
}

export function getColorComponents(color: any[]) {
  return [Math.floor(color[0] * 255), Math.floor(color[1] * 255), Math.floor(color[2] * 255), color[3]];
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
export const Base64 = {
  btoa: (input = '') => {
    let str = input;
    let output = '';

    for (
      let block = 0, charCode, i = 0, map = chars;
      str.charAt(i | 0) || ((map = '='), i % 1);
      output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))
    ) {
      charCode = str.charCodeAt((i += 3 / 4));

      if (charCode > 0xff) {
        throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
      }

      block = (block << 8) | charCode;
    }

    return output;
  },

  atob: (input = '') => {
    let str = input.replace(/[=]+$/, '');
    let output = '';

    if (str.length % 4 === 1) {
      throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (
      let bc = 0, bs = 0, buffer, i = 0;
      (buffer = str.charAt(i++));
      ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0
    ) {
      buffer = chars.indexOf(buffer);
    }

    return output;
  },
};
