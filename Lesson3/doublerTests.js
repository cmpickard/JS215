/* eslint-disable no-sparse-arrays */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
// Let's walk through the process of creating test cases for a hypothetical
// interview problem, so that we can get some practice applying these guidelines
// We are given the problem description: "Write a function called doubler that
// doubles every value in an array". We are not given any test cases, so we'll
// have to create them all on our own

// If you want to try building the test cases on your own first, here is the
// list of requirements we derived from the interviewer's answers to our
// questions (the questions and answers are not shown):

// - elements that are numbers should be multiplied by 2
// - elements that are strings should be repeated twice via concatenation
// - other types of elements should be duplicated in the array
// - the input array should not be mutated
// - elements that are special number values should remain unchanged
// - elements that are any other type of number should be treated normally (multiplied by 2)
// - elements that are empty strings should remain unchanged
// - elements that are any other type of string should be treated normally (repeated twice)
// - the input array can contain a mixture of different types of elements
// - non-primitive elements should have their reference duplicated, not their value
// - elements that appear more than once should be treated normally (as specified above)
// - elements that contain nested arrays or objects should be treated normally (duplicated)
// - if the input array contains empty slots (a "sparse array"), they should be removed
// - if an inner array (element) contains empty slots, they should remain unchanged
// - if the input array contains any object properties, they should remain unchanged
// - if an inner array (element) contains any object properties, they should remain unchanged
// - if the array is empty, return an empty array
// - if multiple arguments are passed, ignore all but the first
// - if the argument is a string, treat it as an array of characters
// - if the argument is a non-negative integer, treat it as an array of digits
// - if the argument is an object, treat it as an array of its property values
// - all other kinds of inputs are invalid, and should return the string 'Invalid input'

function doubler(input) {
  return input;
}

console.log(doubler([2, 4])); // [4, 8]
console.log(doubler([3, 13, 19, 0])); // [6, 26, 38, 0]
console.log(doubler(['a'])); // ['aa']
console.log(doubler([10, 'hello world'])); // [20, 'hello worldhello world'])
console.log(doubler([Infinity, -Infinity, NaN])); // [Infinity, -Infinity, NaN]
console.log(doubler([''])); // ['']
console.log(doubler([])); // []
console.log(doubler([1], ['a'])); // [2]
console.log(doubler([0, ,, 1])); // [0, 2]
console.log(doubler([true, false])); // [true, true, false, false]
console.log(doubler([null, undefined])); // [null, null, undefined, undefined]
console.log(doubler('abc')); // ['a', 'a', 'b', 'b', 'c', 'c']
console.log(doubler(123)); // [2, 4, 6]
console.log(doubler({a: 1, b: 2})); // [2, 4]

let array = [1];
let array2 = doubler(array);
console.log(array !== array2);
let multiD = [array];
let [copy1a, copy1b] = doubler(multiD);
console.log(copy1a === array); // true
console.log(copy1b === array); // true
let array3 = [1, , ];
let copy3 = doubler(array3);
console.log(copy3.length === 6); // true
let obj = {a: 1};
console.log(doubler(obj)[1].a === 1); // true
