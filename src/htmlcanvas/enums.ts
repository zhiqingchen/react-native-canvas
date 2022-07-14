/* eslint-disable no-bitwise */
export enum BlendMode {
  Clear, //!< r = 0
  Src, //!< r = s
  Dst, //!< r = d
  SrcOver, //!< r = s + (1-sa)*d
  DstOver, //!< r = d + (1-da)*s
  SrcIn, //!< r = s * da
  DstIn, //!< r = d * sa
  SrcOut, //!< r = s * (1-da)
  DstOut, //!< r = d * (1-sa)
  SrcATop, //!< r = s*da + d*(1-sa)
  DstATop, //!< r = d*sa + s*(1-da)
  Xor, //!< r = s*(1-da) + d*(1-sa)
  Plus, //!< r = min(s + d, 1)
  Modulate, //!< r = s*d
  Screen, //!< r = s + d - s*d

  Overlay, //!< multiply or screen, depending on destination
  Darken, //!< rc = s + d - max(s*da, d*sa), ra = kSrcOver
  Lighten, //!< rc = s + d - min(s*da, d*sa), ra = kSrcOver
  ColorDodge, //!< brighten destination to reflect source
  ColorBurn, //!< darken destination to reflect source
  HardLight, //!< multiply or screen, depending on source
  SoftLight, //!< lighten or darken, depending on source
  Difference, //!< rc = s + d - 2*(min(s*da, d*sa)), ra = kSrcOver
  Exclusion, //!< rc = s + d - two(s*d), ra = kSrcOver
  Multiply, //!< r = s*(1-da) + d*(1-sa) + s*d

  Hue, //!< hue of source with saturation and luminosity of destination
  Saturation, //!< saturation of source with hue and luminosity of
  //!< destination
  Color, //!< hue and saturation of source with luminosity of destination
  Luminosity, //!< luminosity of source with hue and saturation of
}

export enum ClipOp {
  Difference,
  Intersect,
}

export enum SaveLayerFlag {
  SaveLayerInitWithPrevious = 1 << 2,
  SaveLayerF16ColorType = 1 << 4,
}

export enum PaintStyle {
  Fill,
  Stroke,
}

export enum StrokeCap {
  Butt,
  Round,
  Square,
}

export enum StrokeJoin {
  Miter,
  Round,
  Bevel,
}

export enum FillType {
  Winding,
  EvenOdd,
  InverseWinding,
  InverseEvenOdd,
}

export enum PathOp {
  Difference, //!< subtract the op path from the first path
  Intersect, //!< intersect the two paths
  Union, //!< union (inclusive-or) the two paths
  XOR, //!< exclusive-or the two paths
  ReverseDifference,
}

export enum PathVerb {
  Move,
  Line,
  Quad,
  Conic,
  Cubic,
  Close,
}

export enum AlphaType {
  Unknown,
  Opaque,
  Premul,
  Unpremul,
}

export enum ColorType {
  Unknown, //!< uninitialized
  Alpha_8, //!< pixel with alpha in 8-bit byte
  RGB_565, //!< pixel with 5 bits red, 6 bits green, 5 bits blue, in 16-bit word
  ARGB_4444, //!< pixel with 4 bits for alpha, red, green, blue; in 16-bit word
  RGBA_8888, //!< pixel with 8 bits for red, green, blue, alpha; in 32-bit word
  RGB_888x, //!< pixel with 8 bits each for red, green, blue; in 32-bit word
  BGRA_8888, //!< pixel with 8 bits for blue, green, red, alpha; in 32-bit word
  RGBA_1010102, //!< 10 bits for red, green, blue; 2 bits for alpha; in 32-bit word
  BGRA_1010102, //!< 10 bits for blue, green, red; 2 bits for alpha; in 32-bit word
  RGB_101010x, //!< pixel with 10 bits each for red, green, blue; in 32-bit word
  BGR_101010x, //!< pixel with 10 bits each for blue, green, red; in 32-bit word
  Gray_8, //!< pixel with grayscale level in 8-bit byte
  RGBA_F16Norm, //!< pixel with half floats in [0,1] for red, green, blue, alpha;
  //   in 64-bit word
  RGBA_F16, //!< pixel with half floats for red, green, blue, alpha;
  //   in 64-bit word
  RGBA_F32, //!< pixel using C float for red, green, blue, alpha; in 128-bit word

  // The following 6 colortypes are just for reading from - not for rendering to
  R8G8_unorm, //!< pixel with a uint8_t for red and green

  A16_float, //!< pixel with a half float for alpha
  R16G16_float, //!< pixel with a half float for red and green

  A16_unorm, //!< pixel with a little endian uint16_t for alpha
  R16G16_unorm, //!< pixel with a little endian uint16_t for red and green
  R16G16B16A16_unorm, //!< pixel with a little endian uint16_t for red, green, blue
  //   and alpha
  SRGBA_8888,
}

export enum BlurStyle {
  Normal, //!< fuzzy inside and outside
  Solid, //!< solid inside, fuzzy outside
  Outer, //!< nothing inside, fuzzy outside
  Inner, //!< fuzzy inside, nothing outside
}

export enum FilterMode {
  Nearest,
  Linear,
}

export enum MipmapMode {
  None,
  Nearest,
  Linear,
}

export enum ImageFormat {
  JPEG = 3,
  PNG = 4,
  WEBP = 6,
}

export enum TileMode {
  /**
   *  Replicate the edge color if the shader draws outside of its
   *  original bounds.
   */
  Clamp,

  /**
   *  Repeat the shader's image horizontally and vertically.
   */
  Repeat,

  /**
   *  Repeat the shader's image horizontally and vertically, alternating
   *  mirror images so that adjacent images always seam.
   */
  Mirror,

  /**
   *  Only draw within the original domain, return transparent-black everywhere else.
   */
  Decal,
}
