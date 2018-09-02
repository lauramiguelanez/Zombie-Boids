function Boids(x, y) {
  //Each BOID is represented by a position
  this.x = x || 0;
  this.y = y || 0;
  //delta distance
  this.dx = 0;
  this.dy = 0;
  this.maxDist;
  //speed
  this.speed = (1, 1);
  this.maxSpeed = (2, 2);
  this.acceleration = (0, 0);
  //forces equilibrium
  this.sepWeight = 0.5;
  this.cohWeight = 0.5;
  this.aliWeight = 0.5;
}

//Return the position coordinates of the void
Boids.prototype.pos = function() {
  return this.x, this.y;
};
Boids.prototype.set = function(nX, nY) {
  this.x = nX;
  this.y = nY;
  return this;
};

//Vector operations
Boids.prototype.length = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};
Boids.prototype.add = function(v) {
  this.x += v.x;
  this.y += v.y;
  return this;
};
Boids.prototype.sub = function(v) {
  this.x -= v.x;
  this.y -= v.y;
  return this;
};
Boids.prototype.normalize = function(a) {
  var l = this.length();
  this.x /= l;
  this.y /= l;
  if (value != null) this.multiplyScalar(value);
  return this;
};
Boids.prototype.multiplyScalar = function(a) {
  this.x *= a;
  this.y *= a;
  return this;
};
Boids.prototype.negate = function() {
  this.x *= -1;
  this.y *= -1;
  return this;
};

//Get data
Boids.prototype.initialize = function() {
  this.speed.x += (Math.random() - 0.5) * 2;
  this.speed.y += (Math.random() - 0.5) * 2;
};
Boids.prototype.getDistance = function(other) {
  this.dx = this.x - other.x;
  this.dy = this.y - other.y;
};
Boids.prototype.getOther = function() {
  return other;
};

//Forces
Boids.prototype.separation = function() {};
Boids.prototype.cohesion = function() {};
Boids.prototype.alignment = function() {};
Boids.prototype.getTotalAcceleration = function() {};
Boids.prototype.modifyAcceleration = function(a) {};

//Animation
Boids.prototype.move = function() {};
Boids.prototype.draw = function() {
  var size = 2;
  ctx.beginPath();
  ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
  ctx.fill();
};
//End of Class

//Other Math
function getAngle(a, b) {
  var dx = b.x - a.x;
  var dy = b.y - a.y;
  return Math.atan2(dy, dx);
}
function getDistance(a, b) {
  var dx = a.x - b.x;
  var dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}
