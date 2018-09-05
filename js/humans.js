function Human(x, y, run) {
  Boid.call(this, x, y, run);

  this.reach = 50;
  this.chase = [];

  this.escV = new Vector(0, 0);
  this.escWeight = 50;
  this.color = "#FFB6C1";
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
  var feast = 0; //nomber of targets at reach
  targets
.forEach(function(target, index, targets) {
      if (this.chase[index] > 0 && this.chase[index] < this.reach) {
        // If the target is within the Zombie's reach
        this.escV.x += target.x;
        this.escV.y += target.y;
        feast++;
      }
    }
    .bind(this));
  if (feast != 0) {
    this.escV.x /= -feast;
    this.escV.y /= -feast;
  } else {
    this.escV.x = 0;
    this.escV.y = 0;
  }
  this.escV = this.escV.normalize(this.escWeight); //normalize & weigh
  return this.escV;
};

Human.prototype.getTotalAcceleration = function() {
  this.accV.add(this.separate(this.run.humans));
  this.accV.add(this.cohere(this.run.humans));
  this.accV.add(this.aligned(this.run.humans));
  this.accV.add(this.escape(this.run.zombies)); //Add follow force
  this.accV.normalize(this.maxSpeed);
  return this.accV;
};
