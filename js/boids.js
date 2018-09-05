function Boid(x, y, run) {
  this.run = run;
  //Each BOID is represented by a position
  this.x = x;
  this.y = y;
  //delta movimiento
  this.dx = 0;
  this.dy = 0;
  // Rage
  this.range = 100;
  this.minD = 2;
  this.dist = [];
  //speed
  this.maxSpeed = (5, 5);
  //forces
  this.sepV = new Vector(0, 0);
  this.cohV = new Vector(0, 0);
  this.aliV = new Vector(0, 0);
  this.accV = new Vector(0, 0); //(Math.random() * 2 - 1, Math.random() * 2 - 1);
  this.dirV = new Vector(this.x - this.dx, this.y - this.dy);
  //forces equilibrium
  this.sepWeight = 3;
  this.cohWeight = 5;
  this.aliWeight = 6;

  //Aesthetics
  this.color = "#ff3600"; //"#ff3600" "white"
}

//Forces
Boid.prototype.getDist = function(flock) {
  flock.forEach(
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

Boid.prototype.separate = function(flock) {
  flock.forEach(function(boid, ind, boids) {
    var sepX = 0;
    var sepY = 0;
    boids.forEach(function(other, index, others) {
      if (boid.dist[index] > 0 && boid.dist[index] < boid.minD) {
        if (boid.x != other.x && boid.y != other.y) {
          sepX += boid.x - other.x; /// boid.dist;
          sepY += boid.y - other.y; /// boid.dist;
        } else {
          sepX = 0;
          sepY = 0;
        }
      }
    });
    boid.sepV.x = sepX;
    boid.sepV.y = sepY;
  });
  this.sepV = this.sepV.normalize(this.sepWeight); //normalize & weigh
  this.sepV.x = isNaN(this.sepV.x) ? 0 : this.sepV.x;
  this.sepV.y = isNaN(this.sepV.y) ? 0 : this.sepV.y;
  return this.sepV;
};

Boid.prototype.cohere = function(flock) {
  flock.forEach(function(boid, ind, boids) {
    var neighbours = 0;
    var baricenterX = 0;
    var baricenterY = 0;
    boids.forEach(function(other, index, others) {
      if (boid.dist[index] > 0 && boid.dist[index] < boid.range) {
        if (boid != other) {
          baricenterX += other.x;
          baricenterY += other.y;
          neighbours++;
        } else {
          baricenterX = 0;
          baricenterY = 0;
        }
      }
      if (neighbours != 0) {
        baricenterX /= neighbours;
        baricenterY /= neighbours;
      } else {
        baricenterX = 0;
        baricenterY = 0;
      }
    });
    boid.cohV.x = baricenterX - boid.x;
    boid.cohV.y = baricenterY - boid.y;

    /* boid.ctx.strokeStyle = "#fff";
    boid.ctx.beginPath();
    boid.ctx.moveTo(baricenterX, baricenterY);
    boid.ctx.lineTo(boid.x, boid.y);
    boid.ctx.stroke(); */
  });
  this.cohV = this.cohV.normalize(this.cohWeight); //normalize & weigh
  //console.log(this.cohV);
  return this.cohV;
};
Boid.prototype.aligned = function(flock) {
  flock.forEach(function(boid, ind, boids) {
    var neighbours = 0;
    var aliX = 0;
    var aliY = 0;
    boid.dirV.x = boid.x - boid.dx;
    boid.dirV.y = boid.y - boid.dy;
    boids.forEach(function(other, index, others) {
      if (boid.dist[index] > 0 && boid.dist[index] < boid.range) {
        aliX += other.dirV.x;
        aliY += other.dirV.y;
        neighbours++;
      }
    });
    if (neighbours != 0) {
      aliX /= neighbours;
      aliY /= neighbours;
    } else {
      aliX = 0;
      aliY = 0;
    }
    boid.aliV.x = aliX;
    boid.aliV.y = aliY;
  });
  this.aliV = this.aliV.normalize(this.aliWeight); //normalize & weigh
  //console.log(this.aliV);
  return this.aliV;
};
Boid.prototype.getTotalAcceleration = function() {
  this.accV.add(this.separate(this.run.boids));
  this.accV.add(this.cohere(this.run.boids));
  this.accV.add(this.aligned(this.run.boids));
  this.accV.normalize(this.maxSpeed);
  return this.accV;
};
//Animation
Boid.prototype.move = function(flock) {
  this.getDist(flock); //get distance to all others
  //console.log(this.dist);

  this.dx = this.getTotalAcceleration().x;
  this.dy = this.getTotalAcceleration().y;

  //isNaN(this.x) || isNaN(this.y) ? alert("There are NaN") : 0;

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
    this.x = 0;
    //this.accV.x *= (-1);
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
  this.run.ctx.fillStyle = `${this.color}`;
  this.run.ctx.beginPath();
  this.run.ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
  this.run.ctx.fill();
};
