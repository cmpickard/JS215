/* eslint-disable max-len */
// Nested Array Transformer
// Write a function called nestedArrayTransformer that takes two arguments:
// 1.  A nested array of integers
// 2.  A transformation function
// The function should apply the transformation function to each element in the
// nested array structure, maintaining the original nesting structure, and
// return the transformed nested array.
// // javascript

// function nestedArrayTransformer(nestedArray, transformFn) {
//   // Your code here
// }

// // Example transformation function
// function double(num) {
//   return num * 2;
// }

// // Test cases
// console.log(nestedArrayTransformer([1, [2, 3, [4]], 5], double));
// // Should output: [2, [4, 6, [8]], 10]

// console.log(nestedArrayTransformer([[], [[[1]]], [2, 3]], num => num + 1));
// // Should output: [[], [[[2]]], [3, 4]]

// console.log(nestedArrayTransformer([null, [undefined, ['']], 0, [false]], String));
// // Should output: ['null', ['undefined', ['""']], '0', ['false']]

// console.log(nestedArrayTransformer([1, [2, [3, [4]]], 5], num => {
//   if (typeof num !== 'number') return num;
//   return num % 2 === 0 ? num * 2 : num * 3;
// }));
// // Should output: [3, [4, [9, [8]]], 15]

// console.log(nestedArrayTransformer([1, [2, 3], 4], () => 'a'));
// // Should output: ['a', ['a', 'a'], 'a']

/*
input: nested array of integers, function suitable for passing to a map
output: nested array -- copy
rules:
- the return value should have the exact same nesting strucutre as the input
array, but with each element having been transformed using the input function
- the return value should be a COPY of the original array; the original array
should not be mutated
- input may be sparse

Qs:
- what if array contains non-ints?
- what if the array is sparse?
- will the function ever throw errors when passed a single integer argument?
- what if no input?
- what if too many inputs?
- what if inputs are wrong type?

Data Structure:
array -- i'll make a copy of the input array, and then modify it's elements
in-place

Algorithm:
- deep copy the input array? -- or will my iteration process be sufficient for
that?
  --create function to do that
- iterate through the copy, for each element: -- with map
  -- check whether array. if not, return inputFunction(currentElement)
    -- if so, recursive call on current element, passing in element / function

*/
function double(num) {
  return num * 2;
}
// return map on [1, [2, 3, [4]], 5]
// el = 1 => returns 2
// el = [2, 3, [4]] =>
//  calls nestTransformer([2, 3, [4]], func)
//  return map on [2, 3, [4]]
//  el = 2 => returns 4
//  el = 3 => returns 6
//  el = [4] => calls nestTransformer([4], func)
//     return map on [4]
//     el = 4 => return 8
//     call returns [8]
//   => returns [8]
//   call return [4, 6, [8]]
// el = 5 => returns 10
// return value = [2, [4, 6, [8]], 10]

function nestTransformer(array, func) {
  return array.map(el => {
    return Array.isArray(el) ? nestTransformer(el, func) : func(el);
  });
}

// Test cases
let arr = [1, [2, 3, [4]], 5];
console.log(nestTransformer(arr, double));
// Should output: [2, [4, 6, [8]], 10]
console.log(arr[0] === 1); // true

console.log(nestTransformer([[], [[[1]]], [2, 3]], num => num + 1));
// Should output: [[], [[[2]]], [3, 4]]

console.log(nestTransformer([null, [undefined, ['']], 0, [false]], String));
// // Should output: ['null', ['undefined', ['""']], '0', ['false']]

console.log(nestTransformer([1, [2, [3, [4]]], 5], num => {
  if (typeof num !== 'number') return num;
  return num % 2 === 0 ? num * 2 : num * 3;
}));
// // Should output: [3, [4, [9, [8]]], 15]

console.log(nestTransformer([1, [2, 3], 4], () => 'a'));
// // Should output: ['a', ['a', 'a'], 'a']