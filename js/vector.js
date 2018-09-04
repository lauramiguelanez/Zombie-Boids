var Vector = function (x, y) {
    this.x = x;
    this.y = y;
  };

  Vector.prototype.set = function (nX, nY) {
    this.x = nX;
    this.y = nY;
    return this;
  };
  Vector.prototype.length = function () {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  };
  Vector.prototype.add = function (v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  };
  Vector.prototype.sub = function (v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  };
  Vector.prototype.normalize = function (a) {
    var l = this.length();
    (l == 0) ? this.x = 0 : this.x /= l;
    (l == 0) ? this.y = 0 : this.y /= l;
    if (!a) this.multiplyScalar(a);
    return this;
  };
  Vector.prototype.multiplyScalar = function (a) {
    this.x *= a;
    this.y *= a;
    return this;
  };
  Vector.prototype.negate = function () {
    this.x *= -1;
    this.y *= -1;
    return this;
<<<<<<< HEAD
  }
}
=======
  };
>>>>>>> 2ae34f7f1c24a09df28e29552c19ba562a7256fd
