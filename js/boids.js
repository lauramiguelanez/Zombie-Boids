var Boid = function(x, y, run) {
    this.run = run;
    //Each BOID is represented by a position
    this.x = x || 0;
    this.y = y || 0;
    //delta movimiento
    this.dx = 0;
    this.dy = 0;
    this.range = 40;
    //speed
    //this.speed = (speedX, speedY);
    this.maxSpeed = (2, 2);
    this.acceleration = (0, 0);
    //forces
    this.sepV = new Vector(1, 1);
    this.cohV = new Vector(1, 1);
    this.aliV = new Vector(1, 1);
    this.accV = new Vector(1, 1);
    this.dirV = new Vector(this.x - this.dx, this.y - this.dy);
    //forces equilibrium
    this.sepWeight = 0.25;
    this.cohWeight = 1;
    this.aliWeight = 0.75;
  };
  //Return the position coordinates of the void
  Boid.prototype.pos = function() {
    return this.x, this.y;
  };
  Boid.prototype.set = function(nX, nY) {
    this.x = nX;
    this.y = nY;
    return this;
  };
  //Vector operations

  //Get data
  Boid.prototype.initialize = function() {
    this.speed.x += (Math.random() - 0.5) * 2;
    this.speed.y += (Math.random() - 0.5) * 2;
  };
  Boid.prototype.getDist = function(boid, other) {
    /* return Math.sqrt(
      Math.pow(boid.x - other.x, 2) + Math.pow(boid.y - other.y, 2) */
    return Math.pow(boid.x - other.x, 2) + Math.pow(boid.y - other.y, 2);
  };
  //Forces
  Boid.prototype.separate = function() {
    this.run.boids.forEach(function(boid, index, boids) {
      for (var i = index + 1; i < boids.length; i++) {
        var d = boid.getDist(boid, boids[i]);
        if (d > 0 && d < boid.range) {
          (boid.x - boids[i].x == 0) ? boid.sepV.x += 0 : boid.sepV.x += 2 / (boid.x - boids[i].x);
          (boid.y - boids[i].y == 0) ? boid.sepV.y += 0 : boid.sepV.y += 2 / (boid.y - boids[i].y);
        }
      }
    });
    this.sepV = this.sepV.normalize(this.sepWeight); //normalize & weigh
    return this.sepV;
  };
  Boid.prototype.cohere = function() {
    this.run.boids.forEach(function(boid, index, boids) {
      for (var i = index + 1; i < boids.length; i++) {
        var d = boid.getDist(boid, boids[i]);
        var neighbours = 0;
        if (d > 0 && d < boid.range) {
          if (boid.x - boids[i].x !== 0 && boid.y - boids[i].y !== 0) {
            boid.cohV.x += boids[i].x;
            boid.cohV.y += boids[i].y;
            neighbours++;
          } else {
            boid.cohV.x += 0;
            boid.cohV.y += 0;
          }
        }
        if (neighbours != 0) {
          boid.cohV.x /= neighbours;
          boid.cohV.y /= neighbours;
        } else {
          boid.cohV.x = 0;
          boid.cohV.y = 0;
        }
      }
    });
    this.cohV = this.cohV.normalize(this.cohWeight); //normalize & weigh
    return this.cohV;
  };
  Boid.prototype.align = function () {
    this.run.boids.forEach(function(boid, index, boids) {
      boid.dirV.x = boid.x - boid.dx;
      boid.dirV.y = boid.y - boid.dy;

      for (var i = index + 1; i < boids.length; i++) {
        var d = boid.getDist(boid, boids[i]);
        var neighbours = 0;
        if (d > 0 && d < boid.range) {
          boid.aliV.x += boids[i].dirV.x;
          boid.aliV.y += boids[i].dirV.y;
          neighbours++;
        }
      }
      if (neighbours != 0) {
        boid.aliV.x /= neighbours;
        boid.aliV.y /= neighbours;
      } else {
        boid.aliV.x = 0;
        boid.aliV.y = 0;
      }
    });
    this.aliV = this.aliV.normalize(this.aliWeight); //normalize & weigh
    return this.aliV;
  };
  Boid.prototype.getTotalAcceleration = function() {
    this.accV.add(this.separate());
    this.accV.add(this.cohere());
    this.accV.add(this.align());
    this.accV.normalize(this.maxSpeed);
    return this.accV;
  };
  Boid.prototype.modifyAcceleration = function() {}
  //Animation
  Boid.prototype.move = function() {
    this.dx = this.getTotalAcceleration().x;
    this.dy = this.getTotalAcceleration().y;
    //this.dx += Math.random() * 2 - 1;
    //this.dy += Math.random() * 2 - 1;
    this.x += this.dx;
    this.y += this.dy;

    console.log(this.x, this.y);

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
  Boid.prototype.draw = function() {
    var size = 5;
    this.run.ctx.fillStyle = "#ff3600";
    this.run.ctx.beginPath();
    this.run.ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
    this.run.ctx.fill();
  }

//End of Class

//Other Math
/* function getAngle(a, b) {
  var dx = b.x - a.x;
  var dy = b.y - a.y;
  return Math.atan2(dy, dx);
} */

function sortNumber(a, b) {
  return a - b;
}
