// Write a function that takes a two-dimensional array as the argument and
// turns it into a flat array with all duplicated elements removed. Treat
// numbers and number strings (e.g., 1 and '1') as duplicates, and keep the
// one that comes first in the result.

// Examples
// flattenAndUnique([]); // []
// flattenAndUnique([[1, 2, 3], ['3', 4, 5, 'a']]); // [1, 2, 3, 4, 5, 'a']

/*
Input: a 2D array
Output: a flat array
Rules:
- the output array should contain all of the elements from the input array
BUT all 'duplicates' should be removed
- for any duplicate element, the 'first' should be kept in the output array
- 

Definitions:
- a duplicate includes the usual sense of a copy of a single value like 1 & 1,
but also duplication between numbers and number strings
- the first element of a duplicate pair is the one encountered first when
traversing the 2D array from left to right, ignoring all depth?

Questions:
-what about strings like 'Infinity' and 'NaN'?
-what about number strings that start with 0, like '01' is that a duplicate of
1?
-will there be negative or fractional number strings? if so, how should they
be handled?
-what if no input
-what if too many args
-what if non-array
-what if array contains elements that aren't nums or strings?


Data Structure:

Algorithm:

*/

function flattenAndUnique(array) {
  return array;
}

console.log(flattenAndUnique([])); // []
console.log(flattenAndUnique([[1, 2, 3], ['3', 4, 5, 'a']])); 
// [1, 2, 3, 4, 5, 'a']