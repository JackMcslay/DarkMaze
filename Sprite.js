var Sprite;
new function(){
	var sprlist = Array();
	Sprite = {
		Create: function(name,parent){
			var out = document.createElement(name);
			out.Dispose = function(){
				var index = sprlist.indexOf(this);
				if (index >= 0){
					sprlist.splice(index,1);
				}
			}
			out.OnResize = null;
			if (parent){
				parent.appendChild(out);
			}
			sprlist.push(out);
			return out;
		},
		UpdateSize: function(){
			for (var i = 0; i < sprlist.length; i++){
				if (typeof sprlist[i].OnResize == 'function'){
					sprlist[i].OnResize();
				}
			}
		}
	};

};
