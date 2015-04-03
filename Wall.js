function Wall (board,vertical,room1,room2){
	this.Id = board.Walls.length;
	this.Board = board;
	board.Walls.push(this);
	
	this.Vertical = !!vertical;
	this.Room1 = room1;
	this.Room2 = room2;
}

Wall.prototype.Id = 0;
Wall.prototype.Blocked = false;
Wall.prototype.Revealed = false;
Wall.prototype.Vertical = false;
Wall.prototype.Room1 = null;
Wall.prototype.Room2 = null;

Wall.prototype.Reveal = function(){
	if (this.Revealed){
		return;
	}
	this.Revealed = true;
	var revealType = this.Blocked ? 'Wall' : 'Passage';
	if (this.Vertical){
		this.Room2.Sprite.className += ' North'+revealType;
		this.Room1.Sprite.className += ' South'+revealType;
	}
	else {
		this.Room2.Sprite.className += ' West'+revealType;
		this.Room1.Sprite.className += ' East'+revealType;
	}
}

Wall.prototype.Clear = function(){
	this.Revealed = false;
	this.Blocked = false;
}
