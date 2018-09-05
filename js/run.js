//Define the canvas
function Run(canvasId) {
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 10;
  this.boids = []; //population of boids
  this.zombies = [];
  this.humans = [];
  this.reset();
}

//Start gets the animations going
Run.prototype.start = function() {
  this.interval = setInterval(
    // in each update do:
    function() {
      this.clear();
      this.framesCounter++;
      //FrameCounter max 1000
      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }
      this.score += 0.1;

      this.display();
      this.moveAll();
      this.drawAll();
    }.bind(this),
    300 / this.fps
  );
};

Run.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Run.prototype.reset = function() {
  for (var i = 0; i < 25; i++) {
    //generate Boids
    var x = Math.random() * this.canvas.width;
    var y = Math.random() * this.canvas.height;
    var boid = new Boid(x, y, this);
    this.boids.push(boid);
  }
  for (var i = 0; i < 25; i++) {
    //generate Zombies
    var x = Math.random() * this.canvas.width;
    var y = Math.random() * this.canvas.height;
    var zombie = new Zombie(x, y, this);
    this.zombies.push(zombie);
  }
  //console.log(this.zombies); //Are zombies created?

  this.framesCounter = 0;
  this.score = 0;
};

Run.prototype.moveAll = function() {
  this.boids.forEach(function(boid, index, flock) {
    boid.move(flock);
  });
  this.zombies.forEach(function(zombie, index, flock) {
    zombie.move(flock);
  });
};

Run.prototype.drawAll = function() {
  this.boids.forEach(function(boid) {
    boid.draw();
  });
  this.zombies.forEach(function(zombie) {
    zombie.draw();
  });
  //this.drawScore();
};

//Display
Run.prototype.display = function() {
  this.displayNboids();
  this.displayScore();
};

Run.prototype.displayNboids = function() {
  var spanNboids = document.getElementById("boids-left");
  var nBoids = this.boids.length;
  spanNboids.innerHTML = nBoids;
};
Run.prototype.displayScore = function(){
  var spanScore = document.getElementById("score");
  spanScore.innerHTML = Math.floor(this.score);
}

/*  Run.prototype.stop = function() {
    clearInterval(this.interval);
  } */

/*   Run.prototype.gameOver = function() {
    this.stop();
    if (confirm("GAME OVER. Run again?")) {
      this.reset();
      this.start();
    }
  } */

/*   Run.prototype.isCollision = function() {
    // colisiones genéricas
    // (p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y )
    return this.obstacles.some(function (obstacle) {
      return (this.player.x + this.player.w >= obstacle.x &&
        this.player.x < obstacle.x + obstacle.w &&
        this.player.y + (this.player.h - 20) >= obstacle.y);
    }.bind(this));
  } */

/*   Run.prototype.drawScore = function() {
    this.ctx.font = "30px sans-serif";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(Math.floor(this.score), 50, 50);
  } */
