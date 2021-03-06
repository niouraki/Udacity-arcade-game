"use strict";
var counting = 0;

//Create the score element
var score = document.createElement("div");
score.id = "score";
score.innerHTML = "Score: 0";
document.body.appendChild(score);

// Enemies our player must avoid
var Enemy = function(x, y, min, max) {
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;

  //Randomize enemy speed in the beginning of the game
  this.changeSpeed(100, 200);
};

Enemy.prototype.update = function(dt) {
  var distance = this.speed * dt;
  this.x += distance;

  //Make the enemies reappear after they exit the screen on the right
  //Changes the speed every time the enemy reappears
  if (this.x > 500) {
    this.x = 0;
    this.changeSpeed(100, 200);
  }
};

//Changes the speed randomly
Enemy.prototype.changeSpeed = function(min, max) {
  this.speed = Math.floor((Math.random() * (max - min + 1)) + min);
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Player = function(x, y) {
  this.sprite = 'images/char-boy.png';
  this.x = x;
  this.y = y;
};

//Check collision
Player.prototype.update = function() {
  for (var i = 0; i < allEnemies.length; i++) {
    if (allEnemies[i].x <= this.x + 75 &&
      allEnemies[i].x >= this.x - 75 &&
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
  } else if (direction === "left" && this.x > 0) {
    this.x -= 100;
  } else if (direction === "down" && this.y < 400) {
    this.y += 90;
  } else if (direction === "up" && this.y > 0) {
    this.y -= 90;
  } else if (direction === "up" && this.y === -50) {
    this.reset();
    this.countScore();
  }

  //Change character sprite on key press
  if (direction === "character1") {
    this.sprite = "images/char-boy.png";
  } else if (direction === "character2") {
    this.sprite = "images/char-horn-girl.png";
  } else if (direction === "character3") {
    this.sprite = "images/char-pink-girl.png";
  } else if (direction === "character4") {
    this.sprite = "images/char-princess-girl.png";
  }
};

//Reset the position of the player once it reaches the water and try to cross it
Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
};

//When player reach water add one point to score
Player.prototype.countScore = function() {
  counting++;
  score.innerHTML = "Score: " + counting;

  if (counting === 5) {
    alert("Great job! Keep going.");
  }
  winningSound.play();
};

//When player collides remove one point from score
Player.prototype.removeScore = function() {
  counting--;
  score.innerHTML = "Score: " + counting;

  if (counting === -1) {
    alert("Stay focused. You can do it!");
  }
  losingSound.play();
};

//instantiates the player object
var player = new Player(200, 400);

//create an array, instantiates the enemy object and push it inside the array
var enemy1 = new Enemy(40, 225, 100, 200);
var enemy2 = new Enemy(40, 145, 90, 210);
var enemy3 = new Enemy(40, 62, 110, 200);
var allEnemies = [enemy1, enemy2, enemy3];

//Create a heart object
var Heart = function(x, y, speed) {
  this.sprite = 'images/Heart.png';
  this.speed = speed;
  this.x = x;
  this.y = y;
  this.spriteWidth = 100;
  this.spriteHeight = 160;
};

Heart.prototype.update = function(dt) {
  var distance = this.speed * dt;
  this.x += distance;

  if (this.x > 500) {
    this.x = 0;
  }

//Collision with heart and points added
  if (player.x < this.x + 50 && player.x + 50 > this.x &&
    player.y < this.y + 50 && player.y + 50 > this.y) {
    player.countScore();
    heart.reset();
    winningSound.play();
  }
};

Heart.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.spriteWidth, this.spriteHeight);
};

//Resets the heart when the player collides with it
Heart.prototype.reset = function() {
  this.x = (101 * Math.floor(Math.random() * 4) + 0);
  this.y = (70 + (85 * Math.floor(Math.random() * 3) + 0));
};

var heart = new Heart(200, 85, 100);

// This listens for key presses and sends the keys to your
// Player.handleInput() method
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: "character1",
    68: "character2",
    83: "character3",
    87: "character4"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

//Sounds from http://soundbible.com/free-sound-effects-1.html
var winningSound = new Audio("sounds/win.wav");
var losingSound = new Audio("sounds/lose.wav");
