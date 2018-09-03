class Boid {
  constructor(x, y, run) {
    this.run = run;
    //Each BOID is represented by a position
    this.x = x || 0;
    this.y = y || 0;
    //delta movimiento
    this.dx = 0;
    this.dy = 0;
    this.range = 40;
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
  direction() {
    return this.dx, this.dy;
  }
  //Vector operations

  //Get data
  initialize() {
    this.speed.x += (Math.random() - 0.5) * 2;
    this.speed.y += (Math.random() - 0.5) * 2;
  }
  getDist(boid, other) {
    distX = boid.x - other.x;
    distY = boid.y - other.y;
    return Math.sqrt(distX ^ (2 + distY) ^ 2);
  }
  getOther() {
    return other;
  }
  //Forces
  separate() {
    this.sepV = new Vector(1, 1);

    //this.sepV = this.sepV.normalize(1); //normalize & weigh
    return this.sepV;

    //Check closest 3 and move away

    /*   this.run.boids.forEach(function(boid, index, boids) {
      var distX, distY, eachDist;
      for (var i = index + 1; i < boids.length; i++) {
        distX = boid.x - boids[i].x;
        distY = boid.y - boids[i].y;
        eachDist = Math.sqrt(distX ^ (2 + distY) ^ 2);
        if (eachDist <= boid.maxDist) {
          return distX, distY;
        } else {
          return 0, 0;
        }
      }
      this.sepV = this.sepV.normalize(this.sepWeight); //normalize & weigh
      return this.sepV;
    }); */
  }
  cohere() {
    this.cohV = new Vector(1, 1);

    this.cohV = this.cohV.normalize(1); //normalize & weigh
    console.log(this.cohV);
    return this.cohV;
  }
  align() {
    this.aliV = new Vector(1, 1);

    //this.aliV = this.aliV.normalize(1); //normalize & weigh
    return this.aliV;
  }
  getTotalAcceleration() {
    this.accV = new Vector (1,1);
    this.accV.add(this.separate());
    this.accV.add(this.cohere());
    this.accV.add(this.align());
    //this.accV.normalize(1);
    return this.accV;
  }
  modifyAcceleration(a) {}
  //Animation
  move() {
    //this.dx = (this.getTotalAcceleration()).x;
    //this.dy = (this.getTotalAcceleration()).y;
    this.dx = Math.random();
    this.dy = Math.random();
    this.x += this.dx;
    this.y += this.dy;

    if (this.x < 0) {
      this.x = this.run.canvas.width;
    }
    if (this.x > this.run.canvas.width) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = this.run.canvas.height;
    }
    if (this.y > this.run.canvas.height) {
      this.y = 0;
    }
  }
  draw() {
    var size = 2;
    this.run.ctx.fillStyle = "#ff3600";
    this.run.ctx.beginPath();
    this.run.ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
    this.run.ctx.fill();
  }
}

//End of Class

//Other Math
/* function getAngle(a, b) {
  var dx = b.x - a.x;
  var dy = b.y - a.y;
  return Math.atan2(dy, dx);
} */
/* function getDistance(a, b) {
  var dx = a.x - b.x;
  var dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
} */
