const fs = require("fs")

function makeInput(){
  var output = []
  var file = fs.readFileSync("input.txt",'utf-8')
  for(var line of file.split("\n")){
    output.push(line)
  }
  return output
}

var pInput = makeInput()

function part1(input){
  var cords = [0,0]
  for(command of input){
    command  =  command.split(" ")
    switch(command[0]){
      case "forward":
        cords[0]+= parseInt(command[1])
        break
      case "up":
        cords[1]-= parseInt(command[1])
        break
      case "down":
        cords[1]+= parseInt(command[1])
        break
    }
  }
  return cords[0] *  cords[1]
}

function part2(input){
  var cords = [0,0]
  var aim = 0
  for(command of input){
    command  =  command.split(" ")
    switch(command[0]){
      case "forward":
        cords[0]+= parseInt(command[1])
        cords[1] += parseInt(command[1]) * aim
        break
      case "up":
        aim -= parseInt(command[1])
        break
      case "down":
        aim += parseInt(command[1])
        break
    }
  }
  return cords[0] *  cords[1]
}
console.log(part2(pInput))