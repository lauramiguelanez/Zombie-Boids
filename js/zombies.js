function Zombie(x, y, run) {
  Boid.call(this, x, y, run);

  this.reach = 60;
  this.dPrey = [];

  this.folV = new Vector(0, 0);
  this.folWeight = 20;
  this.color = "grey"; 
}

Zombie.prototype.getTarget = function(targets) {
  //get distance to humans
  targets.forEach(
    function(target) {
      this.dPrey.push(
        this.x == target.x && this.y == this.y
          ? 0
          : Math.sqrt(
              Math.pow(this.x - target.x, 2) + Math.pow(this.y - target.y, 2)
            )
      );
    }.bind(this)
  );
  return this.dPrey;
};

Zombie.prototype.follow = function(targets) {
  this.getTarget(targets); //get distances to each boid of the target flock
  var feast = 0; //nomber of targets at reach
  target
    .forEach(function(target, index, targets) {
      if (target.dPrey[index] > 0 && this.dPrey[index] < this.reach) {
        // If the target is within the Zombie's reach
        this.folV.x += target.x;
        this.folV.y += target.y;
        feast++;
      }
    })
    .bind(this);
  if (feast != 0) {
    this.folV.x /= feast;
    this.folV.y /= feast;
  } else {
    this.folV.x = 0;
    this.folV.y = 0;
  }
  this.folV = this.folV.normalize(this.folWeight); //normalize & weigh
  return this.folV;
};

Zombie.prototype.getTotalAcceleration = function() {
  this.accV.add(this.separate(this.run.zombies));
  this.accV.add(this.cohere(this.run.zombies));
  this.accV.add(this.align(this.run.zombies));
  this.accV.add(this.follow(this.run.humans)); //Add follow force
  this.accV.normalize(this.maxSpeed);
  return this.accV;
};