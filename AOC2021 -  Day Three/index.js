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

function d3p1(input){
  var output = ""
  var output2 = ""
  var cols = []
  var length = input[0].split("").length
  for(var x  = 0; x < length; x++){
    cols.push([])
  }
  console.log(cols)
  for(row of input){
    row = row.split("")
    for(p in row){
      cols[p].push(row[p])
    }
  }
  console.log(cols)
  for(col of cols){
    col = col.join('')
    col2 = col
    col =  col.split("0").length
    col2 = col2.split("1").length
    if(col > col2){
      output +="0"
      output2+="1"
    }else{
      output+="1"
      output2+="0"
    }
  }
  output = parseInt(output,2) * parseInt(output2,2)
  return output
}

function oxygen(input){
  console.log(input)
  for(var i = 0; i > -1; i++){
    var z = []
    var o = []
    for(row in input){
      row = input[row]
      if(row.charAt(i) == "0"){
        o.push(row)
      }else{
        z.push(row)
      }
    }
    if(z.length>=o.length){
      input = z
    }else{
      input = o
    }
    if(input.length == 1){
      return input
    }
  }
}

function co2(input){
  console.log(input)
  for(var i = 0; i > -1; i++){
    var z = []
    var o = []
    for(row in input){
      row = input[row]
      if(row.charAt(i) == "0"){
        o.push(row)
      }else{
        z.push(row)
      }
    }
    if(z.length>=o.length){
      input = o
    }else{
      input = z
    }
    if(input.length == 1){
      return input
    }
  }
}

function  d3p2(input){
  var o = oxygen(input)
  var c = co2(input)
  console.log(o,c)
  return parseInt(o,2) * parseInt(c,2)
}

console.log(d3p2(pInput))