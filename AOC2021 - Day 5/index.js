const fs = require("fs")

function makeInput(){
  var output = []
  var file = fs.readFileSync("input.txt",'utf-8')
  for(var line of file.split("\n")){
    var row = line.split(" -> ")
    var toPush  =  []
    for(r of  row){
      toPush.push(r.split(","))
    }
    output.push(toPush)
  }
  return output
}

var pInput = makeInput()

function Grid(){
  this.rows = [[0]];
  this.expand = function(){
    var toAdd = []
    for(var i = 0; i < this.rows.length; i++){
      toAdd.push(0)
    }
    this.rows.push(toAdd)
    for(row of this.rows){
      row.push(0)
    }
  }
  this.expandTo = function(n){
    while(this.rows.length < n){
      this.expand()
    }
  }
  this.mark = function(v1,v2){
    //vector of total change in direction
    v1[0] = parseInt(v1[0])
    v1[1] = parseInt(v1[1])
    v2[0] = parseInt(v2[0])
    v2[1] = parseInt(v2[1])
    var diff = [v2[0] - v1[0],v2[1] - v1[1]]
    //normalized vector
    
    if(diff[0]  ==  0){
      var d1 =  0
    }else{
      var d1 = diff[0]/Math.abs(diff[0])
    }
    if(diff[1]  ==  0){
      var d2 =  0
    }else{
      var d2 = diff[1]/Math.abs(diff[1])
    }
    var dir = [d1,d2]
    var toI = diff[0]
    if(toI == 0){
      toI = diff[1]
    }
      //fault will be in x direction
      for(var i = 0; i < Math.abs(toI); i++){
        var result = [v1[0]  + (dir[0] *(i + 1)),v1[1] + (dir[1] *(i + 1))]
        while(this.rows.length < Math.abs(result[0]) + 1 || this.rows.length < Math.abs(result[1]) + 1){
          this.expand()
        }
        this.rows[result[1]][result[0]] += 1
      }
      this.rows[v1[1]][v1[0]]++

  }
}

function d5p1(input){
  var output = 0;
  var data = []
  var grid = new Grid()
  //comapre if x1=x2 or y1=y2
  for(s of input){
    if(s[0][0] == s[1][0] || s[0][1] == s[1][1]){
      data.push(s)
    }
  }
  for(move of data){
    grid.mark(move[0],move[1])
  }
  for(row of grid.rows){
    for(tile of row){
      if(tile > 1){output++}
    }
  }
  return output
}

function d5p2(input){
  var output = 0;
  var grid = new Grid()
  //comapre if x1=x2 or y1=y2
  for(move of input){
    grid.mark(move[0],move[1])
  }
  for(row of grid.rows){
    for(tile of row){
      if(tile > 1){output++}
    }
  }
  return output
}

console.log(d5p1(pInput))
console.log(d5p2(pInput))
