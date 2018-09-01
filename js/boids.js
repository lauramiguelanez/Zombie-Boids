class Boids {
  constructor(x, y) {
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
  pos() {
    return this.x, this.y;
  }
  set(nX, nY) {
    this.x = nX;
    this.y = nY;
    return this;
  }

  //Vector operations
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
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
    if (value != null) this.multiplyScalar(value);
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

  //Get data
  initialize() {
    this.speed.x += (Math.random() - 0.5) * 2;
    this.speed.y += (Math.random() - 0.5) * 2;
  }
  getDistance(other) {
    this.dx = this.x - other.x;
    this.dy = this.y - other.y;
  }
  getOther() {
    return other;
  }

  //Forces
  separation() {}
  cohesion() {}
  alignment() {}
  getTotalAcceleration() {}
  modifyAcceleration(a) {}

  //Animation
  move() {}
  draw() {
    var size = 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
    ctx.fill();
  }
}
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
