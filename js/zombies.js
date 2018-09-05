function Zombie (x, y, run) {
    Boid.call(this, x, y, run);

    this.dPrey = [];

}


Zombie.prototype.getTarget= function(target){ //get distance to humans
    target.forEach(
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
}

Zombie.prototype.follow = function(target){
    this.getTarget(target); //get distances to each boid of the target flock

    target.forEach(function(boid, ind, targets){
        
    });
//this.run.humans
}


//  this.follow(this.run.humans);