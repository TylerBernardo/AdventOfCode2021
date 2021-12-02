const fs = require("fs")
//parse input
function makeInput(){
  var output = []
  var file = fs.readFileSync("input.txt",'utf-8')
  for(var line of file.split("\n")){
    output.push(line)
  }
  return output
}
//save parsed input
var pInput = makeInput()
//part one code
function part1(input){
  //set up cord system
  var cords = [0,0]
  //iterate through commands
  for(command of input){
    //split command into direction and  magnitutde
    command  =  command.split(" ")
    switch(command[0]){
      //if command is "forward", add magnitude  to x component
      case "forward":
        cords[0]+= parseInt(command[1])
        break
      //if command is "up", subtract magnitude from y component
      case "up":
        cords[1]-= parseInt(command[1])
        break
      //if command is "down", add magnitude to y component
      case "down":
        cords[1]+= parseInt(command[1])
        break
    }
  }
  //return the product of x and y components
  return cords[0] *  cords[1]
}
//part two code
function part2(input){
  //set up cord system
  var cords = [0,0]
  //keep track of aim
  var aim = 0
  //iterate through commands
  for(command of input){
    //split command into direction and magnitude
    command  =  command.split(" ")
    switch(command[0]){
      //if command is "forward", add magnitude to the x component, and the product of aim and magnitude to the y component
      case "forward":
        cords[0]+= parseInt(command[1])
        cords[1] += parseInt(command[1]) * aim
        break
      //if the command is "up", decrease the aim by the magnitude
      case "up":
        aim -= parseInt(command[1])
        break
      //if the command is "down", increase the aim by the magnitude
      case "down":
        aim += parseInt(command[1])
        break
    }
  }
  //return the product of the x and y components
  return cords[0] *  cords[1]
}
//Run part one and two
console.log(part2(pInput))
console.log(part2(pInput))
