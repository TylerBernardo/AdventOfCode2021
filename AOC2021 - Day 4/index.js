const fs = require("fs")

function makeInput(){
  var output = []
  var file = fs.readFileSync("input.txt",'utf-8')
  for(var line of file.split("\n\n")){
    var row = line.split("\n")
    var card = []
    for(r of row){
      r = r.split(" ")
      for(n in r){
        if(r[n] === ""){
          r.splice(n,1)
        }
      }
      card.push(r)
    }
    output.push(card)
  }
  return output
}

var pInput = makeInput()
var puzzleOrder = [26,38,2,15,36,8,12,46,88,72,32,35,64,19,5,66,20,52,74,3,59,94,45,56,0,6,67,24,97,50,92,93,84,65,71,90,96,21,87,75,58,82,14,53,95,27,49,69,16,89,37,13,1,81,60,79,51,18,48,33,42,63,39,34,62,55,47,54,23,83,77,9,70,68,85,86,91,41,4,61,78,31,22,76,40,17,30,98,44,25,80,73,11,28,7,99,29,57,43,10]

function compareVector(v1,v2){
  if(v1[0]  ==  v2[0] && v1[1] == v2[1]){
    return true
  }
  return false
}

//make bingo object

function Bingo(grid){
  this.grid = grid;
  this.sum = function(){};
  this.count = 5
  //turn this.grid into an array of Nodes
  this.convert = function(){
    for(row in this.grid){
      for(tile in this.grid[row]){
        this.grid[row][tile] = new Node(parseInt(this.grid[row][tile]),parseInt(tile),parseInt(row),this)
      }
    }
  }
  //have the ability to check a given number(if it exists)
  this.check = function(n){
    //iterate through all Nodes and check N
    for(var  row in this.grid){
      for(var node in this.grid[row]){
        if(this.grid[row][node].n == n){
          return this.grid[row][node].check()
        }
      }
    }
    return null
  }
  //scorethe card
  this.score = function(f){
    var  output = 0
    for(row  of this.grid){
      for(tile of row){
        if(tile.checked == false){
          output += tile.n
        }
      }
    }
    output = output * f
    return output
  }
  this.log = function(){
    for(row of this.grid){
      var toLog = []
      for(tile of row){
        toLog.push([tile.n,tile.checked])
      }
      console.log(toLog)
    }
    
  }
}

//have each part of grid be node, that keeps track of it's neighbors. When checking for wins, each node will check it's neighbors, and travel outward from it in a line. line of length 5 = win

function Node(n,x,y,spiral){
  this.n = n;
  //0,0 is top left
  this.x = x;
  this.y = y;
  this.grid =  spiral.grid;
  this.spiral = spiral
  this.checked=false;
  //neighbor will be  array with [Node,[x,y]], where x,y is a vector describiing direction from this Node to that Node
  this.neighbors = []
  //check if node  has a neighbor in a given vector direction
  this.checkNeighbors = function(v){
    for(var neighbor of this.neighbors){
      //console.log(neighbor[1],v)
      if(compareVector(v,neighbor[1])){
        //console.log(neighbor[1],v)
        return neighbor
      }
    }
    return null
  }
  //mark this square as checked. Visit all neighbor nodes and update their neighbors array
  this.check = function(){
    this.checked = true;
    var checks = [[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]]
    for(check of  checks){
      try{
      var cords = [this.x  + check[0],this.y + check[1]]
      var node = this.grid[cords[1]][cords[0]]
      node.neighbors.push([this,[-check[0],-check[1]]])
      }catch{}
    }
    //a win is possible
    this.spiral.count++
    if(this.spiral.count >= 5){
      for(neighbor of this.neighbors){
        //apparently verticals dont count
        if(compareVector(neighbor[1],[1,1])  || compareVector(neighbor[1],[1,-1]) || compareVector(neighbor[1],[-1,1])  || compareVector(neighbor[1],[-1,-1])){
          continue
        }
        //check each distance for 5 in row
        var cords = neighbor[1]
        var checks =[[cords[0],cords[1]],[2*cords[0],2*cords[1]],[3*cords[0],3*cords[1]],[4*cords[0],4*cords[1]],[5*cords[0],5*cords[1]],[-2*cords[0],-2*cords[1]],[-cords[0],-cords[1]],[-3*cords[0],-3*cords[1]],[-4*cords[0],-4*cords[1]],[-5*cords[0],-5*cords[1]]]
        var all = true
        var passed = 1
        for(check  of checks){
          try{
          var node = this.grid[this.y + check[1]][this.x  + check[0]]
          if(!node.checked){
            all = false;
            break
          }else{
            passed++
          }
          }catch{}
        }
        if(all && passed >= 5){
          //match found
          return this.n
        }
      }
    }
  }
  return null
}
//console.log("\n")
//test.check(63)
//console.log(test.grid[1][2])

function  d4p1(input){
  var least = Infinity
  var output = 0
  for(i of input){
    var current = new Bingo(i)
    current.convert()
    for(n in puzzleOrder){
      var move = current.check(puzzleOrder[n])
      if(move != null){
        if(n < least){
          console.log(move,n)
          output = current.score(move)
          least = n
          break
        }
        break
      }
    }
  }
  return output
}

function  d4p2(input){
  var least = 0
  var output = 0
  for(i of input){
    var current = new Bingo(i)
    current.convert()
    for(n in puzzleOrder){
      var move = current.check(puzzleOrder[n])
      if(move != null){
        if(n > least){
          output = current.score(move)
          for(row of i){for(node of row){
            console.log(node.checked)
          }}
          console.log(move,n)
          least = parseInt(n)
          break
        }
        break
      }
    }
  }
  return output
}


console.log(d4p2(pInput))