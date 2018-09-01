//Define the canvas
function Run(canvadId) {
  this.canvas = document.getElementById(canvadId);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;

  this.reset();
}

//Start gets the animations going
Run.prototype.start = function() {
  this.interval = setInterval(
    function() {
      this.clear();

      this.framesCounter++;

      //FrameCounter max 1000
      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }

      this.score += 0.01;

      this.moveAll();
      this.draw();

    }.bind(this),
    1000 / this.fps
  );
};

Run.prototype.stop = function() {
  clearInterval(this.interval);
};

Run.prototype.gameOver = function() {
  this.stop();

  if (confirm("GAME OVER. Run again?")) {
    this.reset();
    this.start();
  }
};

Run.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

////Actualize!!!

Run.prototype.reset = function() {
  var boid,x,y;
  this.boids = [];
  for (var i = 0; i < 50; i++) {
    //generate boids in random position
    x = Math.random() * this.canvas.width;
    y = Math.random() * this.canvas.height
    boid = new Boid (x, y);
    boid.acceleration = (0, 0);
    boid.speed = (Math.random() - 0.5, Math.random() - 0.5);
    boid.maxSpeed = (2, 2);
  /*   boid.acceleration = new Boid(0, 0);
    boid.speed = new Boid (Math.random() - 0.5, Math.random() - 0.5);
    boid.maxSpeed = new Boid (2, 2); */


    boids.push(boid);
  };
  boids.forEach(function(boid) {
    boid.draw();
    console.log(boy.x,boid.y);
  });

  this.framesCounter = 0;
  this.score = 0;
};

/* Run.prototype.draw = function() {
  this.background.draw();
  this.player.draw();
  this.obstacles.forEach(function(obstacle) {
    obstacle.draw();
  });
  this.drawScore();
}; */

/* Run.prototype.isCollision = function() {
  // colisiones genéricas
  // (p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y )
  return this.obstacles.some(
    function(obstacle) {
      return (
        this.player.x + this.player.w >= obstacle.x &&
        this.player.x < obstacle.x + obstacle.w &&
        this.player.y + (this.player.h - 20) >= obstacle.y
      );
    }.bind(this)
  );
}; */

/* Run.prototype.moveAll = function() {
  this.background.move();
  this.player.move();
  this.obstacles.forEach(function(obstacle) {
    obstacle.move();
  });
}; */

Run.prototype.drawScore = function() {
  this.ctx.font = "30px sans-serif";
  this.ctx.fillStyle = "black";
  this.ctx.fillText(Math.floor(this.score), 50, 50);
};
