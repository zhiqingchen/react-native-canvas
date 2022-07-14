const invert = function(m) {
  // Find the determinant by the sarrus rule. https://en.wikipedia.org/wiki/Rule_of_Sarrus
  var det = m[0]*m[4]*m[8] + m[1]*m[5]*m[6] + m[2]*m[3]*m[7]
          - m[2]*m[4]*m[6] - m[1]*m[3]*m[8] - m[0]*m[5]*m[7];
  if (!det) {
    return null;
  }
  // Return the inverse by the formula adj(m)/det.
  // adj (adjugate) of a 3x3 is the transpose of it's cofactor matrix.
  // a cofactor matrix is a matrix where each term is +-det(N) where matrix N is the 2x2 formed
  // by removing the row and column we're currently setting from the source.
  // the sign alternates in a checkerboard pattern with a `+` at the top left.
  // that's all been combined here into one expression.
  return [
    (m[4]*m[8] - m[5]*m[7])/det, (m[2]*m[7] - m[1]*m[8])/det, (m[1]*m[5] - m[2]*m[4])/det,
    (m[5]*m[6] - m[3]*m[8])/det, (m[0]*m[8] - m[2]*m[6])/det, (m[2]*m[3] - m[0]*m[5])/det,
    (m[3]*m[7] - m[4]*m[6])/det, (m[1]*m[6] - m[0]*m[7])/det, (m[0]*m[4] - m[1]*m[3])/det,
  ];
};

const mapPoints = function(matrix, ptArr) {
  if (ptArr.length % 2) {
    throw 'mapPoints requires an even length arr';
  }
  for (var i = 0; i < ptArr.length; i+=2) {
    var x = ptArr[i], y = ptArr[i+1];
    // Gx+Hy+I
    var denom  = matrix[6]*x + matrix[7]*y + matrix[8];
    // Ax+By+C
    var xTrans = matrix[0]*x + matrix[1]*y + matrix[2];
    // Dx+Ey+F
    var yTrans = matrix[3]*x + matrix[4]*y + matrix[5];
    ptArr[i]   = xTrans/denom;
    ptArr[i+1] = yTrans/denom;
  }
  return ptArr;
};

const identityN = function(n) {
  var size = n*n;
  var m = new Array(size);
  while(size--) {
    m[size] = size%(n+1) === 0 ? 1.0 : 0.0;
  }
  return m;
};

const identity = function() {
  return identityN(3);
};

function multiplyMany(size, listOfMatrices) {
  if (listOfMatrices.length < 2) {
    throw 'multiplication expected two or more matrices';
  }
  var result = multiply(listOfMatrices[0], listOfMatrices[1], size);
  var next = 2;
  while (next < listOfMatrices.length) {
    result = multiply(result, listOfMatrices[next], size);
    next++;
  }
  return result;
}

function stride(v, m, width, offset, colStride) {
  for (var i=0; i<v.length; i++) {
    m[i * width + // column
      (i * colStride + offset + width) % width // row
    ] = v[i];
  }
  return m;
};

function sdot(a, b, c, d) { // to be called with an even number of scalar args
  var acc = 0;
  for (var i=0; i < arguments.length-1; i+=2) {
    acc += arguments[i] * arguments[i+1];
  }
  return acc;
}

// Accept any number 3x3 of matrices as arguments, multiply them together.
// Matrix multiplication is associative but not commutative. the order of the arguments
// matters, but it does not matter that this implementation multiplies them left to right.
const multiply = function(a, b, c) {
  return multiplyMany(3, [a, b, c]);
};

const translated = function(dx, dy) {
  return stride(arguments, identityN(3), 3, 2, 0);
};

const scaled = function(sx, sy, px, py) {
  px = px || 0;
  py = py || 0;
  var m = stride([sx, sy], identityN(3), 3, 0, 1);
  return stride([px-sx*px, py-sy*py], m, 3, 2, 0);
};

const skewed = function(kx, ky, px, py) {
  px = px || 0;
  py = py || 0;
  var m = stride([kx, ky], identityN(3), 3, 1, -1);
  return stride([-kx*px, -ky*py], m, 3, 2, 0);
};

const rotated = function(radians, px, py) {
  px = px || 0;
  py = py || 0;
  var sinV = Math.sin(radians);
  var cosV = Math.cos(radians);
  return [
    cosV, -sinV, sdot( sinV, py, 1 - cosV, px),
    sinV,  cosV, sdot(-sinV, px, 1 - cosV, py),
    0,        0,                             1,
  ];
};

export default {
  invert,
  mapPoints,
  identity,
  multiply,
  translated,
  scaled,
  skewed,
  rotated,
}