window.onload = init;

function init(){

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var colorBtn = document.getElementById("colorBtn");
	var strokeSizeSlider = document.getElementById("strokeSizer");
	var strokeSizeTxt = document.getElementById("strokeSizeTxt")

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

	strokeSizeSlider.oninput = function sliderChangeListener(e){
		strokeSizeTxt.value = this.value;
		ctx.lineWidth = this.value;
	}

	strokeSizeTxt.onchange = function sliderTxtChangeListener(e){
		strokeSizeSlider.value = this.value;
		ctx.lineWidth = this.value;
	}

	penDown = false;

	canvas.onmousedown = function mouseDownListener(e){
		penDown = true;
		ctx.beginPath();
	}

	canvas.onmouseup = function mouseUpListener(e){
		penDown = false;
		ctx.closePath();
	}

	canvas.onmouseout = function mouseOutListener(e){
		penDown = false;
		ctx.closePath();
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

	colorBtn.onchange = function colorChangeListener(e){
		console.log(this.jscolor);
		ctx.strokeStyle = "#" + this.jscolor;
	}
}
