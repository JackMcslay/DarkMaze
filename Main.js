var Main;
var Nodes = {Id:{},TagName:{}};
new function(){
	function register(node){
		if (node.id && ! Nodes.Id[node.id]){
			Nodes.Id[node.id] = node;
		}
		var tagname = '' + node.tagName;
		tagname = tagname.toLowerCase();
		if (! Nodes.TagName[node.id]){
			Nodes.TagName[tagname] = node;
		}
		for (var i = 0; i < node.children.length; i++){
			register(node.children[i]);
		}
		
	}
	Main = function(){
		register(document.documentElement);
		
		var board = new Board(Nodes.Id.Board,Nodes.Id.Markers);
		board.Console = new Console(Nodes.Id.Console);
		board.LivesCounter = Nodes.Id.LivesCounter;
		board.MovesCounter = Nodes.Id.MovesCounter;
		Nodes.Id.EndTurn.onclick = function(){
			board.EndTurn();
		}
		Nodes.Id.EndGame.onclick = function(){
			board.EndGame();
		}
		
		var onresize = function(){
			var w = window.innerWidth;
			var h = window.innerHeight;
			Nodes.TagName.body.className = '';
			Nodes.Id.Board.style.fontSize = '100%';
			var bbox= Nodes.Id.Board.getBoundingClientRect();
			var tbw = bbox.right - bbox.left;
			var tbh = bbox.bottom - bbox.top;
			
			var fontSize = ''+((h / tbh)*90)+'%';
			Nodes.Id.Board.style.fontSize = fontSize;
			Nodes.Id.Markers.style.fontSize = fontSize;
			bbox= Nodes.Id.Board.getBoundingClientRect();
			tbh = bbox.bottom - bbox.top;
			var margin = ((h - tbh)/2);

			Nodes.Id.Board.style.top = ''+margin+'px';
			Nodes.Id.Board.style.left = ''+margin+'px';

			bbox= Nodes.Id.Board.getBoundingClientRect();
			Nodes.Id.Hud.style.left = ''+(bbox.right+margin)+'px';
			Nodes.Id.Console.style.left = ''+(bbox.right+margin)+'px';
			bbox= Nodes.Id.Hud.getBoundingClientRect();
			Nodes.Id.Console.style.bottom = ''+(bbox.bottom - bbox.top)+'px';
			Nodes.Id.Console.style.top = 0;
			
			board.UpdateSize();
			Nodes.TagName.body.className = 'UseTransitions';
		}
		onresize();
		
		window.onresize = onresize;
		//alert(Nodes.TagName.body.innerHTML);
	}

}();
