// Write a function that's similar to Array.prototype.filter. It takes an array
// and a function as arguments, and returns an array whose values are only
// those that the function passed returns as true.

// function myFilter(array, func) {
//   // ...
// }

// let isPythagoreanTriple = function (trip) {
//   return Math.pow(trip.a, 2) + Math.pow(trip.b, 2) === Math.pow(trip.c, 2);
// };

// myFilter([{ a: 3, b: 4,  c: 5 },
//           { a: 5, b: 12, c: 13 },
//           { a: 1, b: 2,  c: 3 },], isPythagoreanTriple);

// // returns [ { a: 3, b: 4, c: 5 }, { a: 5, b: 12, c: 13 } ]

function myFilter(array, callback) {
  let result = [];

  for (let idx = 0; idx < array.length; idx++) {
    let returnVal = callback(array[idx], idx, array);
    if (returnVal) result.push(array[idx]);
  }

  return result;
}

let isPythagoreanTriple = function (trip) {
  return Math.pow(trip.a, 2) + Math.pow(trip.b, 2) === Math.pow(trip.c, 2);
};

console.log(myFilter([{ a: 3, b: 4,  c: 5 },
  { a: 5, b: 12, c: 13 },
  { a: 1, b: 2,  c: 3 },], isPythagoreanTriple));

// returns [ { a: 3, b: 4, c: 5 }, { a: 5, b: 12, c: 13 } ]
