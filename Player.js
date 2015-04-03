function Player(board){
	this.Board = board;
	this.Number = board.PlayerCount++;
	this.Sprite = Sprite.Create('span');
	this.Sprite.OnResize = Board.SpriteOnResize;
	this.Sprite.id = 'Player';
}

Player.prototype.StartMoves = PLAYER_START_MOVES;
Player.prototype.StartLives = PLAYER_START_LIVES;
Player.prototype.DeathPenalty = PLAYER_DEATH_PENALTY;
Player.prototype.TreasureMaxMoves = PLAYER_TREASURE_MAX_MOVES;
Player.prototype.HasTreasure = false;

Player.prototype.Start = function(room){
	this.StartRoom = room;
	this.StartRoom.Sprite.className = 'PlayerStart';
	this.Alive = true;
	this.HasTreasure = false;
	this.MaxMoves = this.StartMoves;
	this.MovesLeft = this.StartMoves;
	this.Lives = this.StartLives;
	this.Board.LivesCounter.innerHTML = this.Lives;
	this.Board.MovesCounter.innerHTML = ''+this.MovesLeft+'/'+this.MaxMoves;
	this.Sprite.className = '';
	room.Put(this);
	
	this.Board.Console.Log('Starting at X' + (room.Coords.X + 1) + ' Y'+(room.Coords.Y+1) );

}
Player.prototype.MoveTo = function(room){
	if (!this.Alive){
		return;
	}
	
	var roomFound = false;

	for (i in room.Adjacent){
		var adj = room.Adjacent[i];
		if (adj && adj.Room == this.Room){
			roomFound = true;
			adj.Wall.Reveal();
			if (adj.Wall.Blocked){
				playSound('Wall');
				this.Board.Console.Log('You hit a wall trying to go to X' + (room.Coords.X + 1) + ' Y'+(room.Coords.Y+1) );
				this.EndTurn();
				this.UpdateMoves();
				return;
			}
			break;
		}
	}
	if (!roomFound){
		playSound('Error');
		return;
	}
	room.Reveal();
	this.Board.Console.Log('Moved to X' + room.Coords.X + ' Y'+room.Coords.Y );
	room.Put(this);
	this.Board.Dragon.CheckAwake();

	if (room == this.Board.Dragon.Room){
		this.Board.Console.Log('You just walked into the dragon\'s claws');
		this.Board.Dragon.Room.Put(this.Board.Dragon);
		this.Kill();
		return;
	}
	
	if (this.Room == this.Board.Treasure.Room && this.Board.Treasure.Present && ! this.HasTreasure){
		this.HasTreasure = true;
		this.Sprite.className = 'WithTreasure';
		this.Board.Treasure.Get();
		this.EndTurn();
		return;
	}
	
	if (this.Room == this.StartRoom && this.HasTreasure){
		this.Alive = false;
		playSound('Victory');
		this.Board.Console.Log('VICTORY!');
		return;
	}

	playSound('Move');
	
	this.MovesLeft--;
	if (this.MovesLeft <= 0){
		this.EndTurn();		
	}
	
	this.UpdateMoves();

}
Player.prototype.Kill = function(turnEnded){
	this.MaxMoves -= this.DeathPenalty;
	this.Lives--;
	if (this.HasTreasure){
		this.Board.Treasure.Return();
		this.Sprite.className = '';
	}
	this.Board.LivesCounter.innerHTML = this.Lives;	
	this.UpdateMoves();

	
	if (this.Lives <= 0 || this.MaxMoves < this.TreasureMaxMoves || this.HasTreasure){
		this.Alive = false;
		playSound('GameOver');
		this.Board.Console.Log('GAME OVER!');
		this.Board.EndGame();
	}
	else {
		this.StartRoom.Put(this);
		this.MovesLeft = this.MaxMoves;
		playSound('Attack');
		this.Board.Console.Log('You have been wounded');
		if (!turnEnded) this.EndTurn();
	}
}
Player.prototype.EndTurn = function(){
	this.Board.Dragon.Move();
	this.MovesLeft = this.HasTreasure ? this.TreasureMaxMoves : this.MaxMoves;
	playSound('Player'+(this.Number+1));
	this.Board.Console.Log('Player '+(this.Number+1)+'\'s turn');
}
Player.prototype.UpdateMoves = function(){
	this.Board.MovesCounter.innerHTML = ''+this.MovesLeft+'/'+this.MaxMoves;
}

