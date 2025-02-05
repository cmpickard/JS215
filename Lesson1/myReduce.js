// Write a function named myReduce that's similar to the
// Array.prototype.reduce method. It takes an array and a function as arguments,
// and optionally, a third argument that serves as an initial value.
// If the caller omits the initial value, myReduce should use the first
// element of the Array as the initial value. myReduce should return the
// value returned by the last invocation of the callback function.

// function myReduce(array, func, initial) {
//   // ...
// }

// let smallest = (result, value) => (result <= value ? result : value);
// let sum = (result, value) => result + value;

// myReduce([5, 12, 15, 1, 6], smallest);           // 1
// myReduce([5, 12, 15, 1, 6], sum, 10);            // 49

function myReduce(array, callback, accumulator) {
  let skipFirst = false;

  if (accumulator === undefined) {
    accumulator = array[0];
    skipFirst = true;
  }

  for (let idx = 0; idx < array.length; idx++) {
    if (skipFirst && idx === 0) continue;
    accumulator = callback(accumulator, array[idx], idx, array);
  }

  return accumulator;
}

let arr1 = [1, 2, 3, 4];

let calcSum = (a, b) => a + b;
let calcProduct = (a, b) => a * b;

console.log(arr1.reduce(calcSum)); // 10
console.log(arr1.reduce(calcProduct)); // 24
console.log(myReduce(arr1, calcSum)); // 10
console.log(myReduce(arr1, calcProduct)); // 24
console.log(myReduce(arr1, calcSum, 10)); // 20
console.log(myReduce(arr1, calcProduct, 10)); // 240

let smallest = (result, value) => (result <= value ? result : value);
let sum = (result, value) => result + value;

console.log(myReduce([5, 12, 15, 1, 6], smallest));           // 1
console.log(myReduce([5, 12, 15, 1, 6], sum, 10));            // 49