var counting = 0;

//Create the score element
var score = document.createElement("div");
score.id = "score";
score.innerHTML = "Score: 0";
document.body.appendChild(score);

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

Enemy.prototype.update = function(dt) {
    var distance = this.speed * dt;
    this.x = this.x + distance;

//Make the enemies reappear after they exit the screen on the right
    if (this.x > 500) {
      this.x = 0;
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Player = function (x, y) {
  this.sprite = 'images/char-boy.png';
  this.x = x;
  this.y = y;
};

//Check collision
Player.prototype.update = function() {
  for(var i = 0; i < allEnemies.length; i++) {
    if(allEnemies[i].x <= this.x + 40 &&
        allEnemies[i].x >= this.x - 40 &&
        allEnemies[i].y <= this.y + 40 &&
        allEnemies[i].y >= this.y - 40) {
          this.reset();
          this.removeScore();
      }
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Make player move but don't allow it to move off screen
Player.prototype.handleInput = function(direction) {
    if (direction === "right" && this.x < 400) {
      this.x += 100;
    }else if (direction === "left" && this.x > 0) {
      this.x -= 100;
    }else if (direction === "down" && this.y < 400) {
      this.y += 90;
    }else if (direction === "up" && this.y > 0) {
      this.y -= 90;
    }else if (direction === "up" && this.y === -50) {
      this.reset();
      this.countScore();
    }
};

//Reset the position of the player once it reaches the water and try to cross it
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

//When player reach water add one point to score
Player.prototype.countScore = function() {
    counting++
    score.innerHTML = "Score: " + counting;

    if (counting === 5) {
      alert("Great job! Keep going.")
    }
}

//When player collides remove one point from score
Player.prototype.removeScore = function() {
  counting--
  score.innerHTML = "Score: " + counting;

  if(counting === -1) {
    alert("Stay focused. You can do it!")
  }
}

//instantiates the player object
var player = new Player(200, 400);

//create an array, instantiates the enemy object and push it inside the array
var enemy1 = new Enemy(40, 225, 100);
var enemy2 = new Enemy(40,145, 75);
var enemy3 = new Enemy(40, 62, 90);
var enemy4 = new Enemy(0, 225, 60);
var enemy5 = new Enemy(0, 145, 140);
var enemy6 = new Enemy(0, 62, 150);
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];



// This listens for key presses and sends the keys to your
// Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
