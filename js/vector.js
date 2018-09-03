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
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
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
    if (l != 0) {
      this.x /= l;
      this.y /= l;
    } else {
      this.x = 0;
      this.y = 0;
    }
    if (!a) this.multiplyScalar(a);
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
