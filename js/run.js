//Define the canvas
 function Run (canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.fps = 10;
<<<<<<< HEAD
    this.boids = []; //population of boids
    this.reset();
    this.d = [[],[]];


  }
  
  //Start gets the animations going
  start() {
    this.interval = setInterval( // in each update do:
=======
    this.boids = [];
    this.reset();
  };
  //Start gets the animations going
  Run.prototype.start = function(){
    this.interval = setInterval(
>>>>>>> 2ae34f7f1c24a09df28e29552c19ba562a7256fd
      function() {
        this.clear();
        this.framesCounter++;
        //FrameCounter max 1000
        if (this.framesCounter > 1000) {
          this.framesCounter = 0;
        }
        this.score += 0.01;
        //Move & Draw
        /* for (var i=0;i<this.boids.length;i++){
          for (var j=0;j<this.boids.length-1;j++){
            this.d[i][j] = 0;
          }
        }; */


        this.getDistances(this.d);
        console.log(this.d[1]);
        this.moveAll();
        this.drawAll();
<<<<<<< HEAD
        this.d = [[],[]];

=======
        
>>>>>>> 2ae34f7f1c24a09df28e29552c19ba562a7256fd
      }.bind(this),
      10000 / this.fps
    );
  }
<<<<<<< HEAD

  clear() {
=======
  Run.prototype.clear = function() {
>>>>>>> 2ae34f7f1c24a09df28e29552c19ba562a7256fd
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
<<<<<<< HEAD

  reset() {
=======
  Run.prototype.reset = function()  {
>>>>>>> 2ae34f7f1c24a09df28e29552c19ba562a7256fd
    for (var i = 0; i < 50; i++) {
      //generate boids in random position
      var x = Math.random() * this.canvas.width;
      var y = Math.random() * this.canvas.height;
      this.boid = new Boid(x, y, this);
<<<<<<< HEAD
      this.boid.acceleration = (0, 0);
=======
      //this.boid = new Boid(x, y, this,Math.random() * 2 - 1,Math.random() * 2 - 1);
      //this.boid.initialize();
      //this.boid.speed = (Math.random() - 0.5, Math.random() - 0.5);
      /*   this.boid.maxSpeed = (2, 2);
      this.boid.acceleration = new Boid(0, 0);
      this.boid.speed = new Boid (Math.random() - 0.5, Math.random() - 0.5);
      this.boid.maxSpeed = new Boid (2, 2); */
>>>>>>> 2ae34f7f1c24a09df28e29552c19ba562a7256fd
      this.boids.push(this.boid);
    }
    this.framesCounter = 0;
    this.score = 0;
  }
<<<<<<< HEAD

  moveAll() {
=======
  Run.prototype.moveAll = function()  {
>>>>>>> 2ae34f7f1c24a09df28e29552c19ba562a7256fd
    this.boids.forEach(function(boid) {
      boid.move();
    });
  }
<<<<<<< HEAD

  drawAll() {
=======
  Run.prototype.drawAll = function()  {
>>>>>>> 2ae34f7f1c24a09df28e29552c19ba562a7256fd
    this.boids.forEach(function(boid) {
      boid.draw();
    });
    //this.drawScore();
  }

  //Get data
/*   getDist(boid, other) {
    return ((boid.x == 0 && boid.y == 0) || (other.x == 0 && other.y == 0)) ? 0 : (Math.sqrt(
      Math.pow(boid.x - other.x, 2) + Math.pow(boid.y - other.y, 2))); 
  } */
 /*  getDistances(dArray) { //En cada posicion calcula las distancias
    this.boids.forEach(function(boid, index, boids) {
      for (var i = index + 1; i < boids.length; i++) {
        dArray.push(run.getDist(boid, boids[i]));
      }
    });
  } */

  getDistances(dArray) { //En cada posicion calcula las distancias
    var eachD;
    this.boids.forEach(function(boid, index, boids) { //poner for each
      this.boids.forEach(function(other){
        eachD = (boid == other) ? 0 : (Math.sqrt(
          Math.pow(boid.x - other.x, 2) + Math.pow(boid.y - other.y, 2)));
        dArray[index].push(eachD);
      })
    }.bind(this));
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
<<<<<<< HEAD
}
=======
>>>>>>> 2ae34f7f1c24a09df28e29552c19ba562a7256fd
