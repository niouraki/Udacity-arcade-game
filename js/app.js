// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    var distance = this.speed * dt;
    this.x = this.x + distance;

//Make the enemies reappear after exit the screen on the right
    if (this.x > 500) {
      this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
  this.sprite = 'images/char-boy.png';
  this.x = x;
  this.y = y;
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    if (direction === "right" && this.x < 400) {
      this.x += 100;
    }else if (direction === "left" && this.x > 0) {
      this.x -= 100;
    }else if (direction === "down" && this.y < 400) {
      this.y += 100;
    }else if (direction === "up" && this.y > 0) {
      this.y -= 100;
    }else if (direction === "up" && this.y === 0) {
      this.reset();
    }
    console.log(this.x, this.y);
};

//Resets the position of the player once he or she reached the water and tries to cross it
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//instantiates the player object
var player = new Player(200, 400);

//creates an array, instantiates the enemy object and pushes it inside the array
var enemy1 = new Enemy(8, 225, 120);
var enemy2 = new Enemy(8,145, 80);
var enemy3 = new Enemy(8, 62, 90);
var allEnemies = [enemy1, enemy2, enemy3];



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
