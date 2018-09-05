function Human(x, y, run) {
    Boid.call(this, x, y, run);
    
    this.reach = 60;
  
    this.escV = new Vector(0, 0);
    this.escWeight = 20;
    this.color = "blue";
  }
  Human.prototype = Object.create(Boid.prototype);
  Human.prototype.constructor = Human;

