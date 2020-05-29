var row, col, isActive;
var main,table, thief, police, tabledata;
var flag = false;
var touchWall, searchButton,clearButton;
var destinationNode = "1-3";
var sourceNode = "0-0";
var weight, obj;
var bodyM;
init();

function init(){
	main  = document.getElementById("main");
	bodyM = document.getElementsByTagName("body");
	table = createTag("table")
	table.cellSpacing  = 0;
	table.id= "Table";
	main.appendChild(table);
	tabledata = new Graph(10);

	for(var i=0;i<10;i++){
		row = createTag("tr");
		table.appendChild(row);
		for(var j=0;j<10;j++){
	  		col = createTag("td")
	  		col.classList.add("dropzone");
	  		col.id = i+"-"+j;
	  		col.style.padding = "30px";
	  		col.setAttribute("data",i+"-"+j);
	  		//col.innerHTML = i+"-"+j;
        	tabledata.addVertex(i+"-"+j);
  	  	    row.appendChild(col);
     		col.addEventListener("mousedown", drawWall);
     	    col.addEventListener("mouseover", hoverCell);
     		col.addEventListener("mouseup", removehover);
     		col.addEventListener("click", clickCell);
		}
	}

	table.addEventListener("mouseleave", disableHover);

	var numrow =1;
	   for(var i=0;i<table.rows.length;i++){
	     var numcol=1;
	     /*var nextCol = 1;
	     var prevCol = 0;*/
	     for(var j=0;j<table.rows[i].cells.length;j++){
	        if(numcol<table.rows[i].cells.length){
	          tabledata.addEdge(i+"-"+j, i+"-"+numcol, 1);
	          numcol++;
	        }
	        if(numrow<table.rows.length){
	          tabledata.addEdge(i+"-"+j, numrow+"-"+j, 1);	          
	        }
	        /*if(numrow<table.rows.length && j<table.rows[i].cells.length-1){ //for right diagnol node
	          tabledata.addDiagnolEdge(i+"-"+j, numrow+"-"+nextCol, 1);
	          nextCol++;
	        }
	        if(numrow<table.rows.length && j>0){ //for right diagnol node
	          tabledata.addDiagnolEdge(i+"-"+j, numrow+"-"+prevCol, 1);
	          prevCol++;
	        }*/	
	      }
	      numrow++;
	   }
	obj = new dij(tabledata);
	obj.init();
	drawPolice();
	drawthief();
	searchBtn(obj);
	clearBtn();

	
}

function searchBtn(obj){
	
	searchButton = createTag("button");
	bodyM[0].appendChild(searchButton);
	searchButton.innerHTML = "Search";
	searchButton.id = "SearchButton";
	searchButton.addEventListener("click", function(){
	  
	  obj.run(sourceNode, destinationNode);


	});
}

function clearBtn(){
	clearButton = createTag("button");
	bodyM[0].appendChild(clearButton);
	clearButton.id = "ClearButton";
	clearButton.innerHTML = "Clear Board";
	clearButton.addEventListener("click", function(){
		location.reload();
		
	});
}
function drawPolice(){
	police  = createTag("img");
	police.src = "police.png";
	police.classList.add("draggable");
	police.classList.add("yes-drop");
	police.id = "Police";
	bodyM[0].appendChild(police);
}

function drawthief(){
	thief  = createTag("img");
	thief.src = "thief.png";
	thief.classList.add("draggable");
	thief.classList.add("yes-drop");
	thief.id = "Thief";
	bodyM[0].appendChild(thief);
}
function drawWall(e){
	isActive =true;
}

function disableHover(){
	isActive =false;
}

function hoverCell(e){

	if(isActive){
		if(e.target.id == sourceNode || e.target.id == destinationNode){
			return;
		}
		if(e.target.id != "wall"){
				console.log("working", e.target.id);
				////console.log(e.target.id);
				updateWallCell(e.target.getAttribute("data"));
				//e.target.classList.toggle("wall");
				e.target.id = "wall";

				let lft = e.clientX; 
				let top = e.clientY; 
				
				var imgFire = createTag("img");
				imgFire.src = "images/fire.gif";
				//bodyM[0].appendChild(imgFire);
				imgFire.style.pointerEvents = "none";
				imgFire.style.position = "absolute";
				imgFire.style.height = "80px";
				imgFire.style.left = (lft -60) + "px";
				imgFire.style.top = (top-60) + "px";
			}
		else{
			e.target.id = e.target.getAttribute("data");

			removeWallCell(e.target.getAttribute("data"));
		}

	}


}

function clickCell(e){

	if(e.target.id == sourceNode || e.target.id == destinationNode){
		return;
	}

	if(e.target.id != "wall"){
			
			updateWallCell(e.target.getAttribute("data"));

			let lft = e.clientX; 
			let top = e.clientY; 
			console.log(lft + " - LEFT");
			console.log(top + " - Top ");

			e.target.id = "wall";
			var imgFire = createTag("img");
			imgFire.src = "images/fire.gif";
			//bodyM[0].appendChild(imgFire);
			imgFire.style.pointerEvents = "none";
			imgFire.style.position = "absolute";
			imgFire.style.height = "80px";
			imgFire.style.left = (lft - 45) + "px";
			imgFire.style.top = (top - 65) + "px";			
			
			e.target.id = "wall";
		}
	else{
		e.target.id = e.target.getAttribute("data");
		removeWallCell(e.target.getAttribute("data"));
	}	
}

function removehover(e){
	isActive = false;

}

function updateWallCell(node){
	//obj.visited.push(node);
	//obj.init(sourceNode);
	
	let index = obj.unvisited.indexOf(node);
	obj.unvisited.splice(index,1);
	delete obj.parent[node];	
	
	//console.log(obj.unvisited);
	//tabledata.printGraph();	
}

function removeWallCell(node){
	//obj.init(sourceNode);
	
	obj.unvisited.push(node);
	obj.parent[node] = null;

	//console.log(obj.unvisited);
	//tabledata.printGraph();
	//let index = obj.unvisited.indexOf(node);
	//obj.visited.splice(index,1);	
}

function createTag(tag){
	return document.createElement(tag);
}

function getElement(id){
	return document.getElementById(id);
}





//---------------------------------------------------------

interact('.draggable').draggable({
    // enable inertial throwing
    inertia: false,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "#Table",
      endOnly: false,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: false,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {


     /* var textEl = event.target.querySelector('p');
	
      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(event.dx * event.dx +
                     event.dy * event.dy)|0) + 'px');*/
    }
  });

function dragMoveListener (event) {
   
    var target = event.target,


        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
		
//////console.log(target.getAttribute('data-x'),"-----",target.getAttribute('data-y'));
    // translate the element
    
    ////console.log("mouze "+x);

  if(flag == false){

    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';
	  
    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
	  
	}
	else{
		if(x <= touchWall.offsetLeft){
			
			x = touchWall.offsetLeft-touchWall.offsetWidth-5;		
		}
		else if(x > touchWall.offsetLeft){
			
			x = touchWall.offsetLeft+touchWall.offsetWidth+5;		
		}
	
	
		if(y< touchWall.offsetTop){
			y = touchWall.offsetTop-touchWall.offsetHeight;
		}
		else if(y> touchWall.offsetTop){
			y = touchWall.offsetTop + touchWall.offsetHeight; 
		}

	target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';
	  
    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);	
	}

	target.style.zIndex = "200";

  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;
  
interact('.dropzone').dropzone({
  // only accept elements matching this CSS selector
  accept: '.yes-drop',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.25,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
	
		event.target.classList.add('drop-active');
		isDropped = false;	

  },
  
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget,
    dropzoneElement = event.target;
	dropzoneElement.classList.add('drop-target');
	draggableElement.classList.add('can-drop');

    
    if(dropzoneElement.id == "wall"){
    	flag = true;
    	
    	touchWall = dropzoneElement;

    }
    else{
    	touchWall = dropzoneElement;
    	touchWall.style.animation = "animatePoint 1s infinite";
    	flag = false;	
    	
    }
    
    //draggableElement.textContent = 'Dragged in';
    
  },
  
  ondragleave: function (event) {
    //remove the drop feedback style
	
	if(event.relatedTarget.owner){
		event.relatedTarget.owner = null;
		event.target.guest = null;
	}
	//////console.log(event.target.id,"*******************")
	
    event.target.classList.remove('drop-target');
    event.relatedTarget.classList.remove('can-drop');

    touchWall.style.animation = "none";
    
  },
  
  ondrop: function (event) {
    //event.relatedTarget.innerHTML = 'Dropped';
    	
	////console.log("onDrop: @@@@@@@@@@@@@@@@@@@@@@@");
	
	
	isDropped = true;	
	flag = false;
	//if()
	////console.log(event.target.id);
	if(event.relatedTarget.id == "Police"){
		sourceNode = event.target.id;
	}
	else{
		destinationNode = event.target.id;
	}
	setPositionOfItem(event.relatedTarget, event.target);
  },
  
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    

    
  }
  
});


function setPositionOfItem(dragable, dropzone){
	  
		
		

}