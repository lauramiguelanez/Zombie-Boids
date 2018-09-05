function Obstacle(run) {
    this.run = run;
  
    this.w = Math.random() * (50 - 3) + 3;
    this.h = Math.random() * (50 - 3) + 3;
  
    this.x = Math.random() * (this.run.canvas.width - 0);
    this.y = Math.random() * (this.run.canvas.height - 0);
  }
  
  Obstacle.prototype.draw = function() {
    this.run.ctx.fillStyle = "#ff3600";
    this.run.ctx.fillRect(this.x, this.y, this.w, this.h);
  };