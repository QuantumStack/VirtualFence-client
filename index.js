var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Code Snippet from StackOverflow user K3N:
//https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect(), // abs. size of element
	scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
	scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y
	return {
		x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
		y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
	}
}

penDown = false;

canvas.onmousedown = function mouseDownListener(e){
	penDown = true;
}

canvas.onmouseup = function mouseUpListener(e){
	penDown = false;
}

canvas.onmouseout = function mouseOutListener(e){
	penDown = false;
}

canvas.onmousemove = function mouseMoveListener(e){
	var pos = getMousePos(canvas,e);
	if(penDown){
		ctx.lineTo(pos.x,pos.y);
		ctx.stroke();
	}
	else{
		ctx.moveTo(pos.x,pos.y);
	}
}

