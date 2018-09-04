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

    this.dist = [];
    //speed
    //this.speed = (speedX, speedY);
    this.maxSpeed = (2, 2);
    this.acceleration = (0, 0);
    //forces
    this.sepV = new Vector(0, 0);
    this.cohV = new Vector(0, 0);
    this.aliV = new Vector(0, 0);
    this.accV = new Vector(0, 0);
    this.dirV = new Vector(this.x - this.dx, this.y - this.dy);
    //forces equilibrium
    this.sepWeight = 1;
    this.cohWeight = 1;
    this.aliWeight = 1;

    /*    ///P5 version:
    this.acceleration = new Vector(0, 0);
    this.velocity();
    this.position = new Vector(x, y);
    this.r = 3.0;
    this.maxspeed = 3; // Maximum speed
    this.maxforce = 0.05; */
  }

  /* //init
velocity() {
  createVector(Math.random() * 2 - 1, Math.random() * 2 - 1);
} */

  //Forces
  getDist() {
    this.run.boids.forEach(function(other) {
      this.dist.push((this == other) ? 0 : Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2)));
    }.bind(this));
    return this.dist;
  }

  separate() {
    this.run.boids.forEach(function(boid, ind, boids) {
      boids.forEach(function(other, index, others) {

        if (boid.dist[index] > 0 && boid.dist[index] < boid.range) {

          if (boid != other) {
            boid.sepV.x += 2 / (boid.x - other.x);
            boid.sepV.y += 2 / (boid.y - other.y);
          } else {
            boid.sepV.x += 0;
            boid.sepV.y += 0;
          }
        }
      });
    });
    this.sepV = this.sepV.normalize(this.sepWeight); //normalize & weigh
    return this.sepV;
  }
  cohere(d) {
    var d = this.run.d;
    this.run.boids.forEach(function(boid, index, boids) {
      this.boids.forEach(function(other) {
        var neighbours = 0;
        if (d > 0 && d < boid.range) {
          if (boid != other) {
            boid.cohV.x += other.x;
            boid.cohV.y += other.y;
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
      });
    });
    this.cohV = this.cohV.normalize(this.cohWeight); //normalize & weigh
    return this.cohV;
  }
  align(d) {
    var d = this.run.d;
    var neighbours = 0;
    this.run.boids.forEach(function(boid, index, boids) {
      boid.dirV.x = boid.x - boid.dx;
      boid.dirV.y = boid.y - boid.dy;
      this.boids.forEach(function(other) {
        if (d > 0 && d < boid.range) {
          boid.aliV.x += boids[i].dirV.x;
          boid.aliV.y += boids[i].dirV.y;
          neighbours++;
        }
      });
      if (neighbours != 0) {
        boid.aliV.x /= neighbours;
        boid.aliV.y /= neighbours;
      } else {
        boid.aliV.x = 0;
        boid.aliV.y = 0;
      }
    });
    this.aliV = this.aliV.normalize(this.maxSpeed); //normalize & weigh
    return this.aliV;
  }
  getTotalAcceleration() {
    this.accV.add(this.separate());
    //this.accV.add(this.cohere());
    //this.accV.add(this.align());
    this.accV.normalize(this.maxSpeed);
    return this.accV;
  }
  //Animation
  move() {
    this.getDist(); //get distance to all others
    //console.log(this.dist);

    this.dx = this.getTotalAcceleration().x;
    this.dy = this.getTotalAcceleration().y;
    this.dx += Math.random() * 2 - 1;
    this.dy += Math.random() * 2 - 1;
    this.x += this.dx;
    this.y += this.dy;

    this.dist = []; //clean dist array
    
    //console.log(this.x, this.y);

    //Boundaries
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
    var size = 3;
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

function sortNumber(a, b) {
  return a - b;
}
