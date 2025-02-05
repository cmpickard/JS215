// Write a Function named myMap that is similar to the built-in
// Array.prototype.map method. Your Function should take an array and another
// Function (the callback) as arguments, and return a new Array. The new
// Array's values should be the return values of the callback Function.

// function myMap(array, func) {
//   // ...
// }

// let plusOne = n => n + 1;
// myMap([1, 2, 3, 4], plusOne);       // [ 2, 3, 4, 5 ]

function myMap(array, callback) {
  let result = [];
  for (let idx = 0; idx < array.length; idx++) {
    let returnVal = callback(array[idx], idx, array);
    result.push(returnVal);
  }

  return result;
}

let plusOne = num => num + 1;
console.log(myMap([1, 2, 3, 4], plusOne));       // [ 2, 3, 4, 5 ]