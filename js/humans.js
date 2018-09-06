function Human(x, y, run) {
  Boid.call(this, x, y, run);
  //Range
  this.reach = 60;
  this.chase = [];
  this.painD = 6;
  //Forces & weights
  this.escV = new Vector(0, 0);
  this.disV = new Vector(0, 0);
  this.escWeight = 80;
  this.disVWeight = 100;
  //Aesthetics
  this.color = "#FFB6C1";
  //Interacction
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

Human.prototype.getTotalAcceleration = function() {
  this.accV.add(this.separate(this.run.humans));
  this.accV.add(this.cohere(this.run.humans));
  this.accV.add(this.aligned(this.run.humans));
  this.accV.add(this.escape(this.run.zombies)); //Add escape force
  this.accV.normalize(this.maxSpeed);
  return this.accV;
};

//Interaction variables
var TOP_KEY = 38;
var SPACE = 32;
var A_KEY = 65;
var S_KEY = 83;
var D_KEY = 68;
var actionColor = "#0092FF";

Human.prototype.setListeners = function() {
  //"this = humans" within "on key" function using bind
  document.onkeydown = function(event) {
    //DISPERSE
    if (event.keyCode == D_KEY) {
      console.log("DISPERSE!");
      this.forEach(function(human, index, humans) {
        human.color = actionColor;
        human.range = 50;
        human.minD = 15; //more distance between
        human.reach = 60;
        human.cohWeight = -100;
        human.aliWeight = 0;
        human.sepWeight = 0;
        human.escWeight = 100;
      });
      this[0].run.displayStatus("Disperse, you fools!", actionColor);
    }

    //TESTUDO
    if (event.keyCode == S_KEY) {
      console.log("TESTUDO!");
      this.forEach(function(human, index, humans) {
        human.color = actionColor;
        human.range = 50;
        human.minD = 20; //more distance between
        human.reach = 60;
        human.cohWeight = 0;
        human.aliWeight = 0;
        human.sepWeight = -10;
        human.escWeight = 20;
      });
      this[0].run.displayStatus("Make yourself a ball!", actionColor);
    }
    //RUN SOLO
    if (event.keyCode == A_KEY) {
      console.log("RUN SOLO!");
      this.forEach(function(human, index, humans) {
        human.color = actionColor;
        human.range = 50;
        human.minD = 20; //more distance between
        human.reach = 20;
        human.cohWeight = 0;
        human.aliWeight = 0;
        human.sepWeight = 5;
        human.escWeight = 300;
      });
      this[0].run.displayStatus("Every man for himself!", actionColor);
    }
  }.bind(this.run.humans);

  //Back to normal
  document.onkeyup = function(event) {
    console.log("REGROUP!");
    this.forEach(function(human, index, humans) {
      human.color = "#FFB6C1";
      human.range = 100;
      human.minD = 15;
      human.reach = 60;
      human.cohWeight = 5;
      human.aliWeight = 6;
      human.sepWeight = 4;
      human.escWeight = 80;
    });
    this[0].run.displayStatus("Wait for my orders", "#ff3600"); //Boids don't cry
  }.bind(this.run.humans);
};
