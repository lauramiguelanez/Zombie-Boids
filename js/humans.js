function Human(x, y, run) {
  Boid.call(this, x, y, run);

  this.reach = 60;
  this.chase = [];
  this.painD = 6;

  this.escV = new Vector(0, 0);
  this.disV = new Vector(0, 0);
  this.escWeight = 80;
  this.disVWeight = 100;
  this.color = "#FFB6C1";

  this.setListeners();
}
Human.prototype = Object.create(Boid.prototype);
Human.prototype.constructor = Human;

Human.prototype.getTarget = function(targets) {
  //get distance to humans
  targets.forEach(
    function(target) {
      this.chase.push(
        this.x == target.x && this.y == this.y
          ? 0
          : Math.sqrt(
              Math.pow(this.x - target.x, 2) + Math.pow(this.y - target.y, 2)
            )
      );
    }.bind(this)
  );
  return this.chase;
};
Human.prototype.escape = function(targets) {
  this.chase = [];
  this.getTarget(targets); //get distances to each boid of the target flock
  var feast = 0;
  var chaseX = 0;
  var chaseY = 0; //nomber of targets at reach
  targets.forEach(
    function(target, index, targets) {
      if (this.chase[index] > 0 && this.chase[index] < this.reach) {
        // If the target is within the Zombie's reach
        chaseX += target.x;
        chaseY += target.y;
        feast++;
      }
    }.bind(this)
  );
  if (feast != 0) {
    chaseX /= -feast;
    chaseY /= -feast;
  } else {
    chaseX = 0;
    chaseY = 0;
  }
  this.escV.x = chaseX;
  this.escV.y = chaseY;
  this.escV = this.escV.normalize(this.escWeight); //normalize & weigh
  return this.escV;
};

Human.prototype.disperse = function(humans) {
  humans.forEach(function(boid, ind, boids) {
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
    boid.disV.x = boid.x - baricenterX;
    boid.disV.y = boid.y - baricenterY;

    /* boid.run.ctx.fillStyle = `green`;
    boid.run.ctx.beginPath();
    boid.run.ctx.arc(baricenterX, baricenterY.y, 6, 0, Math.PI * 2);
    boid.run.ctx.fill(); */
  });

  this.disV = this.disV.normalize(this.disVWeight); //normalize & weigh
  //console.log(this.cohV);
  return this.disV;
};

Human.prototype.getTotalAcceleration = function() {
  this.accV.add(this.separate(this.run.humans));
  this.accV.add(this.cohere(this.run.humans));
  this.accV.add(this.aligned(this.run.humans));
  this.accV.add(this.escape(this.run.zombies)); //Add escape force
  this.accV.normalize(this.maxSpeed);
  return this.accV;
};

var TOP_KEY = 38;
var SPACE = 32;

Human.prototype.setListeners = function() {
  document.onkeydown = function(event) {
    //"this = humans" within this function
    if (event.keyCode == SPACE) {
      console.log("DISPERSE!");
      this.forEach(function(human, index, humans) {
        human.color = "blue";
        human.range = 100;
        human.minD = 10; //more distance between
        human.cohWeight = -1;
        human.aliWeight = 0;
        human.sepWeight = 40;
        human.escWeight = 0;
      });
      this[0].run.displayStatus("Disperse, you fools!", "blue");
    }
  }.bind(this.run.humans);


  //Back to normal
  document.onkeyup = function(event) {
    //"this = humans" within this function
    if (event.keyCode == SPACE) {
      console.log("REGROUP!");
      this.forEach(function(human, index, humans) {
        human.color = "#FFB6C1";
        human.range = 100;
        human.minD = 15; 
        human.cohWeight = 5;
        human.aliWeight = 6;
        human.sepWeight = 4;
        human.escWeight = 80;
      });
      this[0].run.displayStatus("Wait for my orders", "#ff3600"); //Boids don't cry
    }
  }.bind(this.run.humans);
};
