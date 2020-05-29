  var main = document.getElementById("main");
  

  class Graph{
     constructor(noOfVertices){
      this.NoOfVertices = noOfVertices;
      this.adjList = new Map();
     }

     addVertex(v){
       this.adjList.set(v , []);
     }

     addEdge(source, destination, cost){
       this.adjList.get(source).push(destination, cost);
       this.adjList.get(destination).push(source, cost);
     }

     addDiagnolEdge(source, destination, cost){
       this.adjList.get(source).push(destination, cost);
     }

    printGraph(){
      let vertices = this.adjList.keys();
      console.log("Printing Graph ---");
      for(let key of vertices){
          let values = this.adjList.get(key);
          console.log(key + " -> " + values);
      }
    }

  }

  function dij(graph){
      this.sortedArray = [];
      this.visited = [];
      this.unvisited = [];
      this.parent = {};
      this.distance = {};
      this.cost = [];
      _parentThis = this;
      this.list = graph.adjList;
      this.keys = graph.adjList.keys();


      this.init = function(){
        _parentThis.visited = [];
        _parentThis.unvisited = [];
        _parentThis.parent = {};
        _parentThis.distance = {};
        _parentThis.cost = [];

         for(var vertex of _parentThis.keys){
             _parentThis.unvisited.push(vertex);
         }        
      }  
      
      this.printParent = function(src){
      	 this.pkeys = Object.keys(_parentThis.parent);
      	 for(let key of this.pkeys){
      	 	console.log("Key:- " + key + ": Value :- "+_parentThis.parent[key]);
      	 }
      }
      
     
	    this.checkWall = function(neighboursList){
	  	    _this = this;
            this.neighboursTemp = neighboursList.slice(0);
            this.finalNeigh = neighboursList.slice(0);
            
            ////console.log(this.neighboursTemp + "All neighbours with wall --------------");

            for(let n of this.neighboursTemp){
            	if(document.getElementById(n) == null && typeof(n)!= "number"){
            		////console.log("Catched Wall " + n);
            		removeWallNode(n);
            	}            	
            }
            
            function removeWallNode(node){
            	this.node = node;
              this.index = _this.finalNeigh.indexOf(this.node);
            	_this.finalNeigh.splice(this.index, 2);
            }

            ////console.log(this.finalNeigh + " final neighbours --------------");
            return this.finalNeigh;
      }
      
      this.run = function(src, dest){
              _this = this
              this.src = src;
              this.current = src;
              this.finalDest = dest;
              this.neighbours = _parentThis.list.get(this.current).slice(0);

            for(let vertex of _parentThis.unvisited){
            	_parentThis.parent[vertex] = null;
	            if(vertex != this.src){
	               _parentThis.distance[vertex] = Infinity;  //rest of _parentThis.unvisited not marked to Infinity    
	            }
	            else{
	               _parentThis.distance[vertex] = 0;   // first source node _parentThis.distance initialized with Zero
	            }	
            }  

        	 _parentThis.visited.push(src);   //first source node marked in visited array
		     _parentThis.cost.push(0);
		      
		     var rItem = _parentThis.unvisited.indexOf(src); 
		     _parentThis.unvisited.splice(rItem,1);  //removed source node from _parentThis.unvisited array 
            
              

           while(_parentThis.unvisited.length !=0){ // loop until unvisited become empty
              this.temp = 0;
              // getting the this.neighbours of the current node 
              ////console.log("current outside " + _this.current); 
                                     
              if(this.current == undefined && _parentThis.unvisited.length>0){
                  this.current = _parentThis.unvisited[0];
                  ////console.log("new outside after undefined caught " + _this.current);
                  this.neighbours = this.checkWall(_parentThis.list.get(_this.current).slice(0));
              }

              if(this.neighbours.length == 0 && _parentThis.unvisited.length>0){
                  _parentThis.visited.push(_this.current);
                  let index = _parentThis.unvisited.indexOf(_this.current);
                  _parentThis.unvisited.splice(index,1);

                   this.current = _parentThis.unvisited[0];
                   this.neighbours = this.checkWall(_parentThis.list.get(_this.current).slice(0));
                  ////console.log("new outside after no neighbour found in current node " + _this.current);
                  continue;
               }

              this.neighbours = this.checkWall(_parentThis.list.get(_this.current).slice(0));
              //console.log("current neighbours----------- " + this.neighbours);              
          
	            for(var l=0;l<_parentThis.visited.length;l++){      // loop for checking the this.neighbours marked visited 
	                let indx  = this.neighbours.indexOf(_parentThis.visited[l]);
	                if(indx!= -1 ){
	                let found = this.neighbours.splice(indx, 2);    //if found, neighbour node already _parentThis.visited then removed from this.neighbours this.list.
	              }
	            }

              //console.log("Final neighbours for calculations "+this.neighbours);

              

              if(this.neighbours.length == 0 || this.current == undefined){
                
                (this.neighbours.length == 0) && _parentThis.visited.push(this.current);
                continue;
              }  
               this.shortNode = [];
               this.shortNode.push(this.neighbours[0]);
               this.shortNode.push(this.neighbours[1]);                            

               let k;
               for(var i=1; i<this.neighbours.length;i+=2){
                this.temp = _parentThis.distance[_this.current] + this.neighbours[i];
                k = i;
                  if(this.temp<_parentThis.distance[this.neighbours[--k]]){
                      k = i;  
                      _parentThis.distance[this.neighbours[--k]] = this.temp;
                      k = i;
                      _parentThis.parent[this.neighbours[--k]] = _this.current;
                  }
                  else{                                              
                      }
                }


       
            let jj;
            for(var i =1; i<this.neighbours.length; i +=2){
              jj =i-1;
              if(_parentThis.distance[this.shortNode[0]] <= _parentThis.distance[this.neighbours[jj]]){
                  
               }
              else{
                    this.shortNode = [];
                    this.shortNode.push(this.neighbours[jj]);
                    this.shortNode.push(this.neighbours[i]);
                  }       
            }
        
           
            _this.current = this.shortNode[0];
            _parentThis.visited.push(_this.current);
            
            this.cost.push(this.shortNode[1]);
            let index = _parentThis.unvisited.indexOf(_this.current);
            _parentThis.unvisited.splice(index,1);


            
        }//end of While loop
          console.log(_parentThis.parent + "Parent.keys");
          var kkkk = Object.keys(_parentThis.parent);
          for(var k of kkkk){
          	console.log("keys -:" + k + "value ->" + _parentThis.parent[k]);
          }

          addID(_parentThis.visited);
          traverse(this.src, this.finalDest, _parentThis.parent)

      }//end of run function
        
  }





  function traverse(source, destination, parent){
    let src = source;
    let dest = destination;
    let parArr  = parent;

    
    let arr=[];
    this.temp = dest;
    arr.push(this.temp);

    while(this.temp != null){
      let temp2 = parArr[this.temp];
      if(temp2 != null){
        arr.push(temp2);
      }
      this.temp = temp2;
    }
    arr.sort();

    console.log("final Parent for Print--------------------------------------------:? + " + arr);  
    callInDelay(arr, "shortPathNode"); 
     
  }

  function setClass(node, classname){
    this.classname = classname;
    //document.getElementById(node).classList.remove("visited");
    document.getElementById(node).className = this.classname;

  }

  function callInDelay(arr, classname){
    var i = 0;
    _this =this
    this.classname = classname;
    this.arr = arr;
    loop();
      function loop(){
         if(i<_this.arr.length){
           window.setTimeout(function(){
             setClass(this.arr[i], _this.classname);
             i++;
             loop(); 
           },100);
         } 
      }        
   }

 function addID(nodes){
  let i = 0;
  _this = this
   this.nodes = nodes;   
    loop();
      function loop(){
         if(i<_this.nodes.length){
           window.setTimeout(function(){
            if(document.getElementById(_this.nodes[i]) == null){

            }else{
              document.getElementById(_this.nodes[i]).classList.add("visited");
            }
             i++;
             loop(); 
           },0);
         } 
      }           
  }

  
