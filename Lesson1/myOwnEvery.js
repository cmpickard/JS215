// Write a function named myOwnEvery that's similar to the Array.prototype.every
// method. It should take an array and a function as arguments, and return
// true if every element passed to the function evaluates as truthy.

// Copy Code
// function myOwnEvery(array, func) {
//   // ...
// }

// let isAString = value => typeof value === 'string';
// myOwnEvery(['a', 'a234', '1abc'], isAString);       // true

function myOwnEvery(array, callback) {
  for (let idx = 0; idx < array.length; idx++) {
    if (!callback(array[idx], idx, array)) return false;
  }

  return true;
}

let isAString = value => typeof value === 'string';
console.log(myOwnEvery(['a', 'a234', '1abc'], isAString));       // true
