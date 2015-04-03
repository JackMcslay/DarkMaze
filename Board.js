function Board(table,markerTable){
	this.Table = table;	
	this.Player = new Player(this);
	this.Dragon = new Dragon(this);
	this.Treasure = new Treasure(this);
	this.Generate();
	this.DragonMarkerSlot = new Room(this,null,null);
	this.TreasureMarkerSlot = new Room(this,null,null);
	markerTable.appendChild(this.DragonMarkerSlot.Sprite);
	markerTable.appendChild(this.TreasureMarkerSlot.Sprite);
}

Board.prototype.Generate = function(){
	var x,y;
	this.Table.innerHTML = '';	
	this.Walls = new Array();
	this.Rooms = new Array();
	
	var prevRow = null;
	for (y = 0; y < this.Height; y++){
		var tr = document.createElement('tr');
		var prevRoom = null;
		var curRow = Array();
		for (x = 0; x < this.Width; x++){		
			var room = new Room(this,prevRoom,prevRow == null ? null : prevRow[x]);
			tr.appendChild(room.Sprite);
			curRow.push(room);
			prevRoom = room;
		}
		this.Table.appendChild(tr);
		prevRow = curRow;
	}
}
Board.prototype.Start = function(playerStart){
	this.Console.Clear();
	var minTiles = this.Width * this.Height * this.MinimumArea;
	var tiles,blocked;
	
	for (var i = 0; i < this.Rooms.length; i++){
		this.Rooms[i].Clear();
	}
	
	var count = 0;
	
	//Clear walls and then set random blocked walls
	for (var i = 0; i < this.Walls.length; i++){
		this.Walls[i].Clear();
	}
	while (count < this.WallCount){
		var idx = Math.floor(Math.random() * this.Walls.length);
		if (!this.Walls[idx].Blocked){
			this.Walls[idx].Blocked = true;
			count++;
		}
	}
	
	var steps = 0;
	while(true) {
		
		//Get all available tiles
		tiles = Array();
		tiles.push(playerStart);
		blocked = Array();
		var checkRoom = function(dir){
			if(dir == null){
				return;
			}
			var room = dir.Room;
			if(tiles.indexOf(room) >= 0) return;
			
			if(dir.Wall.Blocked){
				if(blocked.indexOf(room) < 0){
					blocked.push(room);
				}
				return;
			}
			tiles.push(room);
			for (var i in room.Adjacent){
				checkRoom(room.Adjacent[i]);
			}
		}
		for (var i in playerStart.Adjacent){
			checkRoom(playerStart.Adjacent[i]);
		}	

		//repeat until there's an acceptable area
		if (tiles.length >= minTiles){
			break;
		}
		steps++;
		var _block = Array();
		
		for(var i = 0; i < blocked.length;i++){
			if (tiles.indexOf(blocked[i]) < 0){
				_block.push(blocked[i]);
			}
		}
		
		if (_block.length == 0){
			break;
		}
		
		var freeBlock = _block[(Math.floor(Math.random() * _block.length)) % _block.length];
		var candidates = Array();
		for (var i in freeBlock.Adjacent){
			var adj = freeBlock.Adjacent[i];
			if (adj != null && tiles.indexOf(adj.Room) >= 0){
				candidates.push(adj.Wall);
			}
		}
		var freeWall = candidates[(Math.floor(Math.random() * candidates.length)) % candidates.length];
		
		freeWall.Blocked = false;
		count--;
	}

	var room;
	var difx,dify;

	//Set treasure
	do {
		room = tiles[Math.floor(Math.random() * tiles.length)];
		difx = Math.abs(playerStart.Coords.X - room.Coords.X);
		dify = Math.abs(playerStart.Coords.Y - room.Coords.Y);
	} 
	//do not spawn the treasure on the player's room
	while (difx <= this.Dragon.AwakeDistance && dify <= this.Dragon.AwakeDistance);
	this.Treasure.Start(room);
	this.Dragon.Start(room);
	
	//Set player
	this.Player.Start(playerStart);
	this.Running = true;
	
}

Board.prototype.Walls = null;
Board.prototype.Rooms = null;
Board.prototype.PlayerCount = 0;
Board.prototype.MinimumArea = BOARD_MINIMUM_AREA;
Board.prototype.WallCount = BOARD_WALL_COUNT;
Board.prototype.Width = BOARD_WIDTH;
Board.prototype.Height = BOARD_HEIGHT;
Board.prototype.EndGame = function(){
	this.Player.Alive= false;
	var itv;
	var board = this;
	var widx = 0;
	var ridx = 0;

	itv = 6000/this.Walls.Length;
	var wfunc = setInterval(function(){
		if (board.Player.Alive || widx >= board.Walls.length){
			clearInterval(wfunc);
		}
		else {
			board.Walls[widx++].Reveal();
		}
	},itv);
	itv = 6000/this.Rooms.Length;
	var rfunc = setInterval(function(){
		if (board.Player.Alive || ridx >= board.Rooms.length){
			clearInterval(rfunc);
		}
		else {
			board.Rooms[ridx++].Reveal();
		}
	},itv);
	
	this.Treasure.Room.Put(this.Treasure);
	//var itv = 6/this.Rooms.Length;
	
	
}
Board.prototype.UpdateSize = function(){
	if (this.Player.Room)
	this.Player.Room.Put(this.Player);
	if (this.Dragon.Room)this.Dragon.Room.Put(this.Dragon);
	if (this.Treasure.Room)this.Treasure.Room.Put(this.Treasure);
}
Board.prototype.EndTurn = function(){
	this.Player.EndTurn();
}
Board.SpriteOnResize = function(){
	var rect = this.getBoundingClientRect();
	var pRect = this.parentNode.getBoundingClientRect();
	
	var wDif = ((pRect.right - pRect.left) - (rect.right - rect.left))/2;
	var hDif = ((pRect.bottom - pRect.top) - (rect.bottom - rect.top))/2;
		
	this.style.top = ''+(pRect.top+hDif)+'px';
	this.style.left = ''+(pRect.left+wDif)+'px';
	//this.style.bottom = ''+(pRect.bottom-hDif)+'px';
	//this.style.right = ''+(pRect.right-hDif)+'px';
}
