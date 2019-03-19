// Enemies our player must avoid
var Enemy = function(rownum, fac, x) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
this.fac = fac;
    this.x = x;
    if(rownum === 1){
  this.y = 239;
    }else if (rownum === 2) {
  this.y = 156;
    }else{
  this.y = 73;
  }
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    //
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x > 460){
      this.x = -30;
    }else{
      this.x+=(101*dt*this.fac);
    }
    this.render();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function() {
  this.x = 200;
  this.y = 405;
  this.life = 3;
  this.sprite = (choosePlayer)();
}
var choosePlayer = function() {
  var str = "Type number of Character to Choose: \n1 Boy \n2 Cat Girl\n3 Horn Girl\n4 Pink Girl\n5 Princess Girl"
  var char = prompt(str);
  switch (char) {
    case "1":
        return "images/char-boy.png";
      break;
    case "2":
        return 'images/char-cat-girl.png';
        break;
    case "3":
        return 'images/char-horn-girl.png';
        break;
    case "4":
        return 'images/char-pink-girl.png';
        break;
    case "5":
        return 'images/char-princess-girl.png';
        break;
    default:
      return "images/char-boy.png";
      break;
  }
};
var choosePlayerUI = function() {
  context.save();
  context.restore();
};

player.prototype.update = function (x, y) {
  if(x !== undefined && y !== undefined){
    this.x = x;
    this.y = y;
  }else if (y === undefined && x !== undefined) {
    this.x = x;
  }else if (x === undefined && y !== undefined) {
    this.y = y;
  }

  this.render();
};
player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite),this.x, this.y);
};
player.prototype.handleInput = function (key) {

  if(key === 'left' || key === 'a'){
    if (this.x !== -2) {
      this.x-=101;
    }
  } else if (key === 'up' || key === 'w') {
    if (this.y !== -10) {
      this.y-=83;
    }
  } else if (key === 'down' || key === 's') {
    if(this.y !== 405){
      this.y+=83;
    }
  } else if (key === 'right' || key === 'd') {
    if (this.x !== 402) {
      this.x+=101;
    }
  } else if (key === 'space') {

  }
  console.log(this.x);
  console.log(this.y);

};
player.prototype.reset = function() {
  this.x = 200;
  this.y = 405;
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(1,1, -2);
var enemy2 = new Enemy(2,1.5, -5);
var enemy3 = new Enemy(3,1, -250);
var enemy4 = new Enemy(2,1, -100);
var enemy5 = new Enemy(3,1.3, -2);
var allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);
allEnemies.push(enemy5);
var player = new player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'a',
        83: 's',
        68: 'd',
        87: 'w',
        13: 'enter',
        32: 'space'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
