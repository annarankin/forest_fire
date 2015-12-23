var game = {};

game.trees = [];

game.makeTree = function(top,left) {
  var $tree = $('<div class="tree">');
  $tree.css('position', 'absolute');
  $tree.css('top', top + 'px');
  $tree.css('left', left + 'px');
  $('.game-board').append($tree);
  this.trees.push($tree);
};

game.treeCoords = [
  {top: 10, left: 65},
  {top: 10, left: 165},
  {top: 10, left: 265},
  {top: 135, left: 65},
  {top: 135, left: 165},
  {top: 135, left: 265},
  {top: 255, left: 65},
  {top: 255, left: 165},
  {top: 255, left: 265}
];

game.setFire = function(tree) {
  var $tree = $(tree);
  $tree.addClass('aflame');
  $tree.one('click', function(event) {
    $(event.target).removeClass('aflame');
  });
};

game.decreaseCounter = function() {
  this.counter--;
  $('#counter').text(this.counter);
  return this.counter;
};

game.gameOver = function() {
  window.clearInterval(this.treeFireInterval);
  $('.tree').off();
  var $trees = $('.tree:not(.aflame)');
  $('#notice').text("You saved " + $trees.length + " trees!");
  $('button').one('click', game.start.bind(game));

};

game.initialize = function() {
  this.treeCoords.forEach(function(tree) {
    this.makeTree(tree.top, tree.left);
  }.bind(this));
};

game.start = function() {

  $('.tree').each(function(idx, tree) {
    this.setFire(tree);
  }.bind(this));

  this.counter = 10;
  $('#counter').text(this.counter);
  
  this.treeFireInterval = window.setInterval(function() {
    var currentCount = this.decreaseCounter();
    if (currentCount <= 0) {
      console.log("Game Over!");
      this.gameOver();
      return;
    }

    var $trees = $('.tree:not(.aflame)');
    if ($trees.length < 1) { return; }
    var randIndex = Math.floor(Math.random() * $trees.length);
    var $unfortunateTree = $trees.eq(randIndex);

    console.log($trees.length);
    this.setFire($unfortunateTree);

  }.bind(this), 1000);
};

$(function() {
  game.initialize();
  $('button').one('click', game.start.bind(game));

});