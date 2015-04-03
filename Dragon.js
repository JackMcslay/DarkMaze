function Dragon(board){
	this.Sprite = Sprite.Create('span');
	this.Sprite.id = 'Dragon';
	this.Sprite.OnResize = Board.SpriteOnResize;
	this.Board = board;
}

Dragon.prototype.Awake = false;
Dragon.prototype.AwakeDistance = DRAGON_AWAKE_DISTANCE;

Dragon.prototype.Start = function(room){
	this.Board.DragonMarkerSlot.Put(this);
	this.Room = room;
	this.Awake = false;
	this.Sprite.className = '';
	//this.Room.Sprite.appendChild(this.Sprite);
}
Dragon.prototype.CheckAwake = function(){	
	if (this.Awake){
		return;
	}
	var plCoords = this.Board.Player.Room.Coords;
	var drCoords = this.Room.Coords;
	
	var difx = Math.abs(plCoords.X-drCoords.X);
	var dify = Math.abs(plCoords.Y-drCoords.Y);
	if (difx <= this.AwakeDistance && dify <= this.AwakeDistance){
		this.Awake = true;
		playSound('WakeUp');
		this.Board.Console.Log('The dragon awakens');
		this.Sprite.className = 'Awake';
	}

}
Dragon.prototype.Move = function(){
	if (!this.Awake) return;
	var board= this.Board;
	var goal = board.Player.Room == board.Player.StartRoom ? board.Treasure : board.Player;
	var plCoords = goal.Room.Coords;
	var drCoords = this.Room.Coords;

	var difx = plCoords.X-drCoords.X;
	var dify = plCoords.Y-drCoords.Y;
	var room = this.Room;
	if (difx > 0){
		room = room.Adjacent.East.Room;
	}
	else if(difx < 0) {
		room = room.Adjacent.West.Room;
	}
	if (dify > 0){
		room = room.Adjacent.South.Room;
	}
	else if(dify < 0) {
		room = room.Adjacent.North.Room;
	}
	playSound('Dragon');
	this.Board.Console.Log('The dragon moves');
	
	if (room == board.Player.Room){
		room.Put(this);
		board.Player.Kill(true);
	}
	else {
		this.Room = room;
	}
}
