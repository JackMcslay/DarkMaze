function Console(node){
	this.Node = node;	
}

Console.prototype.Clear = function(){
	this.Node.innerHTML = '';
}

Console.prototype.Log = function(msg){
	var msg = document.createTextNode(msg);
	var p = document.createElement('p');
	p.appendChild(msg);
	this.Node.appendChild(p);
	var str;
	for (i in this.Node){
		str += i+'\t';
	}
	this.Node.scrollTop=this.Node.scrollHeight;
	//alert(this.Node.scrollTop);
	//alert(this.Node.scrollHeight);
}
//	onmozfullscreenerror	onmozpointerlockchange	onmozpointerlockerror	onblur	onerror	onfocus	onload	onscroll	getAttribute	getAttributeNS	setAttribute	setAttributeNS	removeAttribute	removeAttributeNS	hasAttribute	hasAttributeNS	getElementsByTagName	getElementsByTagNameNS	getElementsByClassName	mozMatchesSelector	setCapture	releaseCapture	mozRequestFullScreen	mozRequestPointerLock	getAttributeNode	setAttributeNode	removeAttributeNode	getAttributeNodeNS	setAttributeNodeNS	getClientRects	getBoundingClientRect	scrollIntoView	insertAdjacentHTML	querySelector	querySelectorAll	remove	tagName	id	classList	attributes	children	firstElementChild	lastElementChild	previousElementSibling	nextElementSibling	childElementCount	onmouseenter	onmouseleave	onwheel	scrollTop	scrollLeft	scrollWidth	scrollHeight	clientTop	clientLeft	clientWidth	clientHeight	scrollTopMax	scrollLeftMax	innerHTML	outerHTML	hasChildNodes	insertBefore	appendChild	replaceChild	removeChild	normalize	cloneNode	isEqualNode	compareDocumentPosition	contains	lookupPrefix	lookupNamespaceURI	isDefaultNamespace	hasAttributes	nodeType	nodeName	baseURI	ownerDocument	parentNode	parentElement	childNodes	firstChild	lastChild	previousSibling	nextSibling	nodeValue	textContent	namespaceURI	prefix	localName	ELEMENT_NODE	ATTRIBUTE_NODE	TEXT_NODE	CDATA_SECTION_NODE	ENTITY_REFERENCE_NODE	ENTITY_NODE	PROCESSING_INSTRUCTION_NODE	COMMENT_NODE	DOCUMENT_NODE	DOCUMENT_TYPE_NODE	DOCUMENT_FRAGMENT_NODE	NOTATION_NODE	DOCUMENT_POSITION_DISCONNECTED	DOCUMENT_POSITION_PRECEDING	DOCUMENT_POSITION_FOLLOWING	DOCUMENT_POSITION_CONTAINS	DOCUMENT_POSITION_CONTAINED_BY	DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC	addEventListener	removeEventListener	dispatchEvent
