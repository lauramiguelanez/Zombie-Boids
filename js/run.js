//Define the canvas
 function Run (canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.fps = 10;
    this.boids = [];
    this.reset();
  };
  //Start gets the animations going
  Run.prototype.start = function(){
    this.interval = setInterval(
      function() {
        this.clear();
        this.framesCounter++;
        //FrameCounter max 1000
        if (this.framesCounter > 1000) {
          this.framesCounter = 0;
        }
        this.score += 0.01;
        //Move & Draw
        this.moveAll();
        this.drawAll();
        
      }.bind(this),
      1000 / this.fps
    );
  }
  Run.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //this.ctx.fillStyle = "#FA959F";
  }
  Run.prototype.reset = function()  {
    for (var i = 0; i < 50; i++) {
      //generate boids in random position
      var x = Math.random() * this.canvas.width;
      var y = Math.random() * this.canvas.height;
      this.boid = new Boid(x, y, this);
      //this.boid = new Boid(x, y, this,Math.random() * 2 - 1,Math.random() * 2 - 1);
      //this.boid.initialize();
      //this.boid.speed = (Math.random() - 0.5, Math.random() - 0.5);
      /*   this.boid.maxSpeed = (2, 2);
      this.boid.acceleration = new Boid(0, 0);
      this.boid.speed = new Boid (Math.random() - 0.5, Math.random() - 0.5);
      this.boid.maxSpeed = new Boid (2, 2); */
      this.boids.push(this.boid);
    }
    this.framesCounter = 0;
    this.score = 0;
  }
  Run.prototype.moveAll = function()  {
    this.boids.forEach(function(boid) {
      boid.move();
    });
  }
  Run.prototype.drawAll = function()  {
    this.boids.forEach(function(boid) {
      boid.draw();
    });
    //this.drawScore();
  }


  /*  Run.prototype.stop = function()  {
    clearInterval(this.interval);
  } */

  /*   Run.prototype.gameOver = function()  {
    this.stop();
    if (confirm("GAME OVER. Run again?")) {
      this.reset();
      this.start();
    }
  } */

  /*   Run.prototype.isCollision = function()  {
    // colisiones genéricas
    // (p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y )
    return this.obstacles.some(function (obstacle) {
      return (this.player.x + this.player.w >= obstacle.x &&
        this.player.x < obstacle.x + obstacle.w &&
        this.player.y + (this.player.h - 20) >= obstacle.y);
    }.bind(this));
  } */

  /*   Run.prototype.drawScore = function()  {
    this.ctx.font = "30px sans-serif";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(Math.floor(this.score), 50, 50);
  } */
