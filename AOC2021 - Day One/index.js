const fs = require("fs")
//parse the input
function makeInput(){
  var output = []
  var file = fs.readFileSync("input.txt",'utf-8')
  for(var line of file.split("\n")){
    output.push(parseInt(line))
  }
  return output
}
//save parsed input
var pInput = makeInput()

/*
This report indicates that, scanning outward from the submarine, the sonar sweep found depths of 199, 200, 208, 210, and so on.

The first order of business is to figure out how quickly the depth increases, just so you know what you're dealing with - you never know if the keys will get carried into deeper water by an ocean current or a fish or something.

To do this, count the number of times a depth measurement increases from the previous measurement. (There is no measurement before the first measurement.) In the example above, the changes are as follows:

199 (N/A - no previous measurement)
200 (increased)
208 (increased)
210 (increased)
200 (decreased)
207 (increased)
240 (increased)
269 (increased)
260 (decreased)
263 (increased)
In this example, there are 7 measurements that are larger than the previous measurement.

How many measurements are larger than the previous measurement?
*/
function part1(input){
  //start count
  var count = 0
  //loop thorugh each input
  for(var x = 1; x < input.length-1; x++){
    //if the current input is greater than the previous input increase the count
    if(input[x]  >input[x-1]){
      count++
    }
  }
  //return the count
  return count
}

/*Instead, consider sums of a three-measurement sliding window. Again considering the above example:

199  A      
200  A B    
208  A B C  
210    B C D
200  E   C D
207  E F   D
240  E F G  
269    F G H
260      G H
263        H
Start by comparing the first and second three-measurement windows. The measurements in the first window are marked A (199, 200, 208); their sum is 199 + 200 + 208 = 607. The second window is marked B (200, 208, 210); its sum is 618. The sum of measurements in the second window is larger than the sum of the first, so this first comparison increased.

Your goal now is to count the number of times the sum of measurements in this sliding window increases from the previous sum. So, compare A with B, then compare B with C, then C with D, and so on. Stop when there aren't enough measurements left to create a new three-measurement sum.

In the above example, the sum of each three-measurement window is as follows:

A: 607 (N/A - no previous sum)
B: 618 (increased)
C: 618 (no change)
D: 617 (decreased)
E: 647 (increased)
F: 716 (increased)
G: 769 (increased)
H: 792 (increased)
In this example, there are 5 sums that are larger than the previous sum.

Consider sums of a three-measurement sliding window. How many sums are larger than the previous sum?
*/

function part2(input){
  //intilize the count and last sum
  var count = 0
  var last = 0
  //loop through each input starting at the 3rd element
  for(var x = 2; x < input.length - 1; x++){
    //take the sum of the current andprevious two elements
    var sum = input[x] +  input[x-1] + input[x-2]
    //if the current sum is greater than the last, increase count
    if(sum  > last){
      count++
    }
    //update the value of last to the current sum
    last = sum
  }
  //return the count lowered by one
  //this is because the first sum is greater than zero, but it shouldn't count towards  the total
  return count - 1
}
//run the part one and two functions
console.log(part1(pInput))
console.log(part2(pInput))
