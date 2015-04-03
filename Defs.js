var BOARD_WALL_COUNT = 50;
var BOARD_MINIMUM_AREA = 1;
var BOARD_WIDTH = 8;
var BOARD_HEIGHT = 8;
var DRAGON_AWAKE_DISTANCE = 2;
var PLAYER_START_MOVES = 8;
var PLAYER_TREASURE_MAX_MOVES = 4;
var PLAYER_START_LIVES = 3;
var PLAYER_DEATH_PENALTY = 2;

var START = function(boardId){ 
	var board = document.getElementById(boardId);
	board = new Board(board);
	board.Generate();
}



var playSound = function(){}
