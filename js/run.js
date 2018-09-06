//Define the canvas
function Run(canvasId) {
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 10;
  this.boids = []; //population of boids
  this.zombies = []; //population of zombies
  this.humans = []; //population of humans
  this.obstacles = [];
  //
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
      this.score += 0.5;

      this.display();
      this.moveAll();
      this.drawAll();

      if (this.humans.length == 0) {
        this.gameOver();
      }
    }.bind(this),
    1000 / this.fps
  );
};

Run.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Run.prototype.reset = function() {
  /*   for (var i = 0; i < 25; i++) {
    //generate Boids
    var x = Math.random() * this.canvas.width;
    var y = Math.random() * this.canvas.height;
    var boid = new Boid(x, y, this);
    this.boids.push(boid);
  } */
  for (var i = 0; i < 60; i++) {
    //generate Humans
    var x = Math.random() * this.canvas.width;
    var y = Math.random() * this.canvas.height;
    var human = new Human(x, y, this);
    this.humans.push(human);
  }
  for (var i = 0; i < 10; i++) {
    //generate Zombies
    var x = Math.random() * this.canvas.width;
    var y = Math.random() * this.canvas.height;
    var zombie = new Zombie(x, y, this);
    this.zombies.push(zombie);
  }
  //this.generateObstacles(10);

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
  this.humans.forEach(function(human, index, flock) {
    human.move(flock);
  });
  this.die(this.humans, this.zombies);
};

Run.prototype.drawAll = function() {
  this.boids.forEach(function(boid) {
    boid.draw();
  });
  this.zombies.forEach(function(zombie) {
    zombie.draw();
  });
  this.humans.forEach(function(human) {
    human.draw();
  });
  this.obstacles.forEach(function(obstacle) {
    obstacle.draw();
  });
};

Run.prototype.die = function(humans, zombies) {
  //Check if a zombie touches a human and kill it
  humans.forEach(function(human, index, flock) {
    zombies.forEach(function(zombie, ind, zombies) {
      if (
        human.x >= zombie.x - human.painD &&
        human.x <= zombie.x + human.painD &&
        human.y >= zombie.y - human.painD &&
        human.y <= zombie.y + human.painD
      ) {
        console.log("Someone has been killed");
        human.run.ctx.fillStyle = "#ff3600";
        human.run.ctx.beginPath();
        human.run.ctx.arc(human.x, human.y, 8, 0, Math.PI * 2);
        human.run.ctx.fill();
        //Die & resurrect
        zombies.push(new Zombie(human.x, human.y, human.run));
        humans.splice(index, 1);
      }
    });
  });
  console.log("There are " + zombies.length + " zombies");
};

//Display
Run.prototype.display = function() {
  this.displayNboids();
  this.displayScore();
};
Run.prototype.displayNboids = function() {
  var spanNboids = document.getElementById("boids-left");
  var nBoids = this.humans.length;
  spanNboids.innerHTML = nBoids;
  spanNboids.style.color = "white";
};
Run.prototype.displayScore = function() {
  var spanScore = document.getElementById("score");
  spanScore.innerHTML = Math.floor(this.score);
  spanScore.style.color = "white";
};
Run.prototype.displayStatus = function(status, color) {
  var pStatus = document.getElementById("status=bar");
  pStatus.innerHTML = status;
  pStatus.style.color = color;
};
//Game Start
Run.prototype.welcome = function() {
  var introDiv = document.getElementById("intro");
  $("#instructions").hide();
  introDiv.addEventListener("click", function() {
    $("#intro").hide();
    $("#keys").hide();
    $("#welcome").hide();
    $("#canvas").show();
    $("#instructions").show();
    //$(".data").fadeIn()
    this.start();
  }.bind(this));
};
//Game over
Run.prototype.gameOver = function() {
  this.stop();
  run.welcome();
  $("#instructions").hide();
  $("#intro").show();
  $("#keys").show();
  $("#welcome").show();
  this.reset();
};
Run.prototype.stop = function() {
  clearInterval(this.interval);
};

//Colisions
Run.prototype.generateObstacles = function(number) {
  for (var i = 0; i < number; i++) {
    this.obstacles.push(new Obstacle(this));
  }
};

Run.prototype.isCollision = function() {
  // colisiones genéricas
  // (p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y )
  this.humans.forEach(function(human) {
    if (
      this.obstacles.some(
        function(obstacle) {
          return (
            human.x >= obstacle.x &&
            human.x <= obstacle.x + obstacle.w &&
            human.y >= obstacle.y &&
            human.y <= obstacle.y + obstacle.h
          );
        }.bind(this)
      )
    ) {
    }
  });
};
