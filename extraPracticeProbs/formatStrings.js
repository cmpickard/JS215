/* eslint-disable max-len */
// Problem: String Formatter
// Write a function called formatStrings that takes two arguments:
// 1.  An array of strings
// 2.  A formatting function
// The function should apply the formatting function to each string in the
// input array and return a new array with the formatted strings. The function
// should handle various edge cases and special conditions.
// // javascript

// function formatStrings(strings, formatFn) {
//   // Your code here
// }

// // Example formatting function
// function capitalize(str) {
//   return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
// }

// // Test cases
// let input1 = ['hello', 'WORLD', 'JavaScript'];
// let result1 = formatStrings(input1, capitalize);
// console.log(result1);  // ['Hello', 'World', 'Javascript']
// console.log(input1);   // ['hello', 'WORLD', 'JavaScript'] (original array unchanged)

// let input2 = ['a', '', null, undefined, 123];
// console.log(formatStrings(input2, str => str ? str.toString().repeat(2) : 'N/A'));
// // ['aa', '', 'N/A', 'N/A', '123123']

// let input3 = [];
// console.log(formatStrings(input3, capitalize));  // []

// let input4 = ['test'];
// console.log(formatStrings(input4, () => { throw new Error('Formatter failed'); }));
// // Should handle the error gracefully

// let input5 = ['  trim  ', 'UPPER', 'lower'];
// console.log(formatStrings(input5, str => str.trim().toLowerCase()));
// // ['trim', 'upper', 'lower']

// let input6 = ['a', 'b', 'c'];
// let result6 = formatStrings(input6, str => str.toUpperCase());
// input6[0] = 'z';
// console.log(result6);  // ['A', 'B', 'C'] (deep copy test)

// let input7 = { 0: 'a', 1: 'b', length: 2 };
// console.log(formatStrings(input7, capitalize));  // ['A', 'B'] (array-like object test)

/*
input: (i) an array of strings, (ii) a function that formats a string
output: an array of strings that have been formatted according to the function

rules:
- return value should be new array
- input array should not be mutated
- output array should be a deep copy of the input array (?? but if the elements
are all strings, then... that's a distinction w/o a difference)
- each string in the output array should correspond to the string at the same
index in the input array but where the output array value equals whatever was
returned when we passed the input vaule into the supplied function
- the functions themselves will decide how to handle cases where a non-string
element is passed in.
- however, the functions could decide that what needs to
happen is throwing an error. we need to handle such badly behaved functions in
a way that doesn't halt our program
-- if the input is NOT an array but is array-like in the sense of having
properties with positive integer keys and a length value,
the function should still work
-- if the input is neither an array nor array-like return undefined

questions:
- what if func contains infinite loop?
- what if no input at all?
- what if func doesn't have a way to gracefully handle non-string input?


data structure:
stick with an array
if we receive an array-like object, convert it to an array
otherwise, map input array to output array

algorithm:
use a try...catch...finally statement

- check if array-like: if strings.length === undefined return undefined
- if not array, create an arry from input
  - arr = new Array(string.length).fill(null).map((_, idx) => strings.idx)
- if array, create copy
- map the new array. on each iteration:
  - try to call the function on the currElement and to return result
  - catch error and return 'Error!'
- return map

*/

function formatStrings(strings, func) {
  if (typeof strings !== 'object' || strings.length === undefined) return [];
  let copy;
  if (Array.isArray(strings)) {
    copy = strings.slice();
  } else {
    copy = new Array(strings.length).fill(null).map((_, idx) => strings[idx]);
  }

  return copy.map(elem => {
    try {
      return func(elem);
    } catch ({message}) {
      return message;
    }
  });
}

let arr = ['a', 'b', 'c'];
let allCaps = function capitalizer (string) {
  return string.toUpperCase();
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// no mutation, new array returned
console.log(formatStrings(arr, allCaps)); // ['A', 'B', 'C']
console.log(arr); // ['a', 'b', 'c']

let input1 = ['hello', 'WORLD', 'JavaScript'];
let result1 = formatStrings(input1, capitalize);
console.log(result1);  // ['Hello', 'World', 'Javascript']
console.log(input1);   // ['hello', 'WORLD', 'JavaScript'] (original array unchanged)

let input2 = ['a', '', null, undefined, 123];
console.log(formatStrings(input2, str => (str ? str.toString().repeat(2) : 'N/A')));
// ['aa', 'N/A', 'N/A', 'N/A', '123123']

let input3 = [];
console.log(formatStrings(input3, capitalize));  // []

let input4 = ['test'];
// eslint-disable-next-line max-statements-per-line
console.log(formatStrings(input4, () => { throw new Error('Formatter failed') }));
// Should handle the error gracefully

let input5 = ['  trim  ', 'UPPER', 'lower'];
console.log(formatStrings(input5, str => str.trim().toLowerCase()));
// ['trim', 'upper', 'lower']

let input6 = ['a', 'b', 'c'];
let result6 = formatStrings(input6, str => str.toUpperCase());
input6[0] = 'z';
console.log(result6);  // ['A', 'B', 'C'] (deep copy test)

let input7 = { 0: 'a', 1: 'b', length: 2 };
console.log(formatStrings(input7, capitalize));  // ['A', 'B'] (array-like object test)