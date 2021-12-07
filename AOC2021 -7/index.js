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

function d7p1(input){
  var output = Infinity;
  for(crab of input){
    crab = parseInt(crab)
  }
  input.sort(function(a, b) {
  return a - b;
});
  for(var x = 0; x < input[input.length - 1]; x++){
    var test = 0
    for(crab of input){
      test += Math.abs(crab -x)
    }
    if(test < output){
      output = test
    }
  }
  return output
}

function additiveFactorial(n){
  var output = 0
  for(var i = 0; i < n; i++){
    output += i + 1
  }
  return output
}

function d7p2(input){
  var output = Infinity;
  for(crab of input){
    crab = parseInt(crab)
  }
  input.sort(function(a, b) {
  return a - b;
});
  for(var x = 0; x < input[input.length - 1]; x++){
    var test = 0
    for(crab of input){
      if(test > output){continue}
      test += additiveFactorial(Math.abs(crab -x))
    }
    if(test < output){
      output = test
    }
  }
  return output
}

console.log(d7p2(pInput))