const fs = require("fs")

function makeInput(){
  var output = []
  var file = fs.readFileSync("input.txt",'utf-8')
  for(var line of file.split("\n")){
    output.push(line)
  }
  return file.split(",")
}

var pInput = makeInput()

function Fish(age){
  this.age  =  age
  this.tick = function(){
    this.age--
    if(this.age == -1){
      this.age = 6
      return true//this.spawn()
    }
    return null
  }
  this.spawn = function(){
    this.age == 6
    return new Fish(8)
  }
}

function d6p1(input){
  var population =  []
  var dataPoints = []
  //parse input  even more
  for(fish of input){
    population.push(new Fish(parseInt(fish)))
  }
  for(var i = 0; i <80; i++){
    var toAdd = 0
    for(fish of population){
      var result = fish.tick()
      if(result == true){
        toAdd++
      }
    }
    for(var x = 0; x < toAdd; x++){
      population.push(new Fish(8))
    }
    dataPoints.push([i,population.length])
  }
  console.log(dataPoints)
  return population.length
}

function Groups(){
  this.zero = 0
  this.one = 0
  this.two = 0
  this.three = 0
  this.four = 0
  this.five = 0
  this.six = 0
  this.seven = 0
  this.eight = 0
}

function d6p2(input){
  var output = 0
  var groups = new Groups()
  //parse input into array
  for(fish of input){
    switch(parseInt(fish)){
      case(1):
        groups.one++
        break
      case(2):
        groups.two++
        break
      case(3):
        groups.three++
        break
      case(4):
        groups.four++
        break
      case(5):
        groups.five++
        break
    }
  }
    for(var i = 0; i < 256; i++){
      var zero = groups.zero
      groups.zero = groups.one
      groups.one = groups.two
      groups.two = groups.three
      groups.three = groups.four
      groups.four = groups.five
      groups.five = groups.six
      groups.six = groups.seven + zero
      groups.seven = groups.eight
      groups.eight = zero
      if(zero.length == 0){continue}
      /*for(x in zero){
        groups.eight.push(0)
      }*/
    }
  
  return groups.zero + groups.one + groups.two + groups.three + groups.four + groups.five + groups.six + groups.seven + groups.eight
}

console.log(d6p2(pInput))

