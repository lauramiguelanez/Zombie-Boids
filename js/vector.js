class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  set(nX, nY) {
    this.x = nX;
    this.y = nY;
    return this;
  }
  length() {
    return Math.sqrt(this.x ^ (2 + this.y) ^ 2);
  }
  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }
  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }
  normalize(a) {
    var l = this.length();
    this.x /= l;
    this.y /= l;
    if (a != null) this.multiplyScalar(a);
    return this;
  }
  multiplyScalar(a) {
    this.x *= a;
    this.y *= a;
    return this;
  }
  negate() {
    this.x *= -1;
    this.y *= -1;
    return this;
  }
}
