import type {SkTypeface} from '@shopify/react-native-skia';

export interface Descriptors {
  style: string;
  variant: string;
  weight: string;
  sizePx: number;
  family: 'Noto Mono' | 'monospace';
  typeface?: SkTypeface;
}

// Functions dealing with parsing/stringifying fonts go here.
const fontStringRegex = new RegExp(
  '(italic|oblique|normal|)\\s*' + // style
    '(small-caps|normal|)\\s*' + // variant
    '(bold|bolder|lighter|[1-9]00|normal|)\\s*' + // weight
    '([\\d\\.]+)' + // size
    '(px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q)' + // unit
    // line-height is ignored here, as per the spec
    '(.+)', // family
);

export function stripWhitespace(str: string) {
  return str.replace(/^\s+|\s+$/, '');
}

let defaultHeight = 16;
// Based off of node-canvas's parseFont
// returns font size in px, which represents the em width.
export function parseFontString(fontStr: string): Descriptors | null {
  let font: any = fontStringRegex.exec(fontStr);
  if (!font) {
    return null;
  }

  let size = parseFloat(font[4]);
  let sizePx = defaultHeight;
  let unit = font[5];
  switch (unit) {
    case 'em':
    case 'rem':
      sizePx = size * defaultHeight;
      break;
    case 'pt':
      sizePx = (size * 4) / 3;
      break;
    case 'px':
      sizePx = size;
      break;
    case 'pc':
      sizePx = size * defaultHeight;
      break;
    case 'in':
      sizePx = size * 96;
      break;
    case 'cm':
      sizePx = (size * 96.0) / 2.54;
      break;
    case 'mm':
      sizePx = size * (96.0 / 25.4);
      break;
    case 'q': // quarter millimeters
      sizePx = size * (96.0 / 25.4 / 4);
      break;
    case '%':
      sizePx = size * (defaultHeight / 75);
      break;
  }
  return {
    style: font[1],
    variant: font[2],
    weight: font[3],
    sizePx: sizePx,
    family: font[6].trim(),
  };
}

export function getTypeface(fontstr: string) {
  let descriptors: Descriptors | null = parseFontString(fontstr);
  let typeface = getFromFontCache(descriptors as Descriptors);
  descriptors !== null && (descriptors.typeface = typeface);
  return descriptors;
}

// null means use the default typeface (which is currently NotoMono)
let fontCache: any = {
  'Noto Mono': {
    '*': null, // is used if we have this font family, but not the right style/variant/weight
  },
  monospace: {
    '*': null,
  },
};

// descriptors is like https://developer.mozilla.org/en-US/docs/Web/API/FontFace/FontFace
// The ones currently supported are family, style, variant, weight.
export function addToFontCache(typeface: SkTypeface, descriptors: Descriptors) {
  let key =
    (descriptors.style || 'normal') + '|' + (descriptors.variant || 'normal') + '|' + (descriptors.weight || 'normal');
  let fam = descriptors.family;
  if (!fontCache[fam]) {
    // preload with a fallback to this typeface
    fontCache[fam] = {
      '*': typeface,
    };
  }
  fontCache[fam][key] = typeface;
}

export function getFromFontCache(descriptors: Descriptors) {
  let key =
    (descriptors.style || 'normal') + '|' + (descriptors.variant || 'normal') + '|' + (descriptors.weight || 'normal');
  let fam = descriptors.family;
  if (!fontCache[fam]) {
    return null;
  }
  return fontCache[fam][key] || fontCache[fam]['*'];
}
