function Vector(x, y) {
  this.x = x;
  this.y = y;
}
Run.prototype.set = function(nX, nY) {
  this.x = nX;
  this.y = nY;
  return this;
};
Run.prototype.length = function() {
  if (this.x != 0 || this.y != 0) {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  } else {
    return 0;
  }
};
Run.prototype.add = function(v) {
  this.x += v.x;
  this.y += v.y;
  return this;
};
Run.prototype.sub = function(v) {
  this.x -= v.x;
  this.y -= v.y;
  return this;
};
Run.prototype.normalize = function(a) {
  var l = this.length();
  this.x == 0 ? (this.x = 0) : (this.x /= l);
  this.y == 0 ? (this.y = 0) : (this.y /= l);
  this.multiplyScalar(a);
  return this;
};
Run.prototype.multiplyScalar = function(a) {
  this.x *= a;
  this.y *= a;
  return this;
};
Run.prototype.negate = function() {
  this.x *= -1;
  this.y *= -1;
  return this;
};
