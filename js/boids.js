function Boid(x, y, run) {
  this.run = run;
  //Each BOID is represented by a position
  this.x = x || 0;
  this.y = y || 0;
  //delta movimiento
  this.dx = 0;
  this.dy = 0;
  this.range = 40;
  this.minD = 200;

  this.dist = [];
  //speed
  //this.speed = (speedX, speedY);
  this.maxSpeed = (3, 3);
  //forces
  this.sepV = new Vector(0, 0);
  this.cohV = new Vector(0, 0);
  this.aliV = new Vector(0, 0);
  this.accV = new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);
  this.dirV = new Vector(this.x - this.dx, this.y - this.dy);
  //forces equilibrium
  this.sepWeight = 10;
  this.cohWeight = 10;
  this.aliWeight = 10;
}

//Forces
Boid.prototype.getDist = function() {
  this.run.boids.forEach(
    function(other) {
      this.dist.push(
        this.x == other.x && this.y == this.y
          ? 0
          : Math.sqrt(
              Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2)
            )
      );
    }.bind(this)
  );
  return this.dist;
};

Boid.prototype.separate = function() {
  this.run.boids.forEach(function(boid, ind, boids) {
    boids.forEach(function(other, index, others) {
      if (boid.dist[index] > 0 && boid.dist[index] < boid.minD) {
        if (boid.x != other.x && boid.y != other.y) {
          boid.sepV.x += (boid.x - other.x) / boid.dist;
          boid.sepV.y += (boid.y - other.y) / boid.dist;
        } else {
          boid.sepV.x += 0;
          boid.sepV.y += 0;
        }
      }
    });
  });
  this.sepV = this.sepV.normalize(this.sepWeight); //normalize & weigh
  this.sepV.x = isNaN(this.sepV.x) ? 0 : this.sepV.x;
  this.sepV.y = isNaN(this.sepV.y) ? 0 : this.sepV.y;
  console.log(this.sepV);
  return this.sepV;
};

Boid.prototype.cohere = function() {
  this.run.boids.forEach(function(boid, ind, boids) {
    var neighbours = 0;
    boids.forEach(function(other, index, others) {
      if (boid.dist[index] > 0 && boid.dist[index] < boid.range) {
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
};
Boid.prototype.align = function() {
  this.run.boids.forEach(function(boid, ind, boids) {
    var neighbours = 0;
    boid.dirV.x = boid.x - boid.dx;
    boid.dirV.y = boid.y - boid.dy;
    boids.forEach(function(other, index, others) {
      if (boid.dist[index] > 0 && boid.dist[index] < boid.range) {
        boid.aliV.x += other.dirV.x;
        boid.aliV.y += other.dirV.y;
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
  this.aliV = this.aliV.normalize(this.aliWeight); //normalize & weigh
  return this.aliV;
};
Boid.prototype.getTotalAcceleration = function() {
  //this.accV.add(this.separate());
  //this.accV.add(this.cohere());
  //this.accV.add(this.align());
  this.accV.normalize(this.maxSpeed);
  return this.accV;
};
//Animation
Boid.prototype.move = function() {
  this.getDist(); //get distance to all others
  //console.log(this.dist);

  this.dx = this.getTotalAcceleration().x;
  this.dy = this.getTotalAcceleration().y;

  isNaN(this.x) || isNaN(this.y) ? alert("There are NaN") : 0;

  //this.dx += Math.random() * 2 - 1;
  //this.dy += Math.random() * 2 - 1;
  this.x += this.dx;
  this.y += this.dy;

  this.dist = []; //clean dist array

  //console.log(this.x, this.y);

  //Boundaries
  if (this.x < 0) {
    this.x = this.run.canvas.width;
  }
  if (this.x > this.run.canvas.width) {
    //this.x = 0;
    //this.accV.negate();
  }
  if (this.y < 0) {
    this.y = this.run.canvas.height;
  }
  if (this.y > this.run.canvas.height) {
    this.y = 0;
  }
};
Boid.prototype.draw = function() {
  var size = 3;
  this.run.ctx.fillStyle = "#ff3600";
  this.run.ctx.beginPath();
  this.run.ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
  this.run.ctx.fill();
};

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
