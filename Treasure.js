function Treasure(board){
	this.Board = board;
	this.Sprite = Sprite.Create('span');
	this.Sprite.OnResize = Board.SpriteOnResize;
	this.Sprite.id = 'Treasure';
}
Treasure.prototype.Start = function(room){
	this.Board.TreasureMarkerSlot.Put(this);
	this.Room = room;
	this.Present = true;
	//this.Sprite.style.display = 'none';
	this.className = '';
}
Treasure.prototype.Get = function(){
	this.Present = false;
	this.Sprite.style.display = '';
	this.Sprite.className = 'Empty';
	playSound('Treasure');
	this.Room.Put(this);
}
Treasure.prototype.Return = function(){
	this.Present = true;
	this.Sprite.className = '';	
}
