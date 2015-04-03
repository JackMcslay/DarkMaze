function Room(board,west,north){
	this.Id = board.Rooms.length;
	this.Board = board;
	board.Rooms.push(this);
	
	this.Sprite = document.createElement('td');
	this.Sprite.Room = this;
	this.Sprite.onclick = function(){
		this.Room.Action();
	}
	this.Coords = {
		X:west == null ? 0 : west.Coords.X+1,
		Y:north == null ? 0 : north.Coords.Y+1
	};
	
	var adj = {
		West:null,
		North:null,
		East:null,
		South:null	
	};
	if (west != null){
		var wall = new Wall(board,false,west,this);
		adj.West = {
			Wall:wall,
			Room:west
		}
		west.Adjacent.East = {
			Wall:wall,
			Room:this
		}
	}
	if (north != null){
		var wall = new Wall(board,true,north,this);
		adj.North = {
			Wall:wall,
			Room:north
		}
		north.Adjacent.South = {
			Wall:wall,
			Room:this
		}
	}
	this.Adjacent = adj;	
}

Room.prototype.Revealed = false;
Room.prototype.Reveal = function (){
	if (this.Revealed){
		return;
	}
	this.Revealed = true;
	this.Sprite.className += ' Revealed';
}

Room.prototype.Clear = function (){
	this.Revealed = false;
	this.Sprite.className = '';
}
Room.prototype.Action = function(){
	if(this.Board.Player.Alive){
		this.Board.Player.MoveTo(this);
	}
	else {
		this.Board.Start(this);
	}
}
Room.prototype.Put = function(obj){
	this.Sprite.appendChild(obj.Sprite);
	if (obj.Sprite.OnResize)obj.Sprite.OnResize();
	obj.Room = this;
}

