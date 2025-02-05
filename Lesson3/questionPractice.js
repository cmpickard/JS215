// Problem 1
// A distinct string is a string that is present only once in an array.

// Given an array of strings, arr, and an integer, k, return the kth distinct
// string present in arr. If there are fewer than k distinct strings, return
// an empty string "".

// Note that the result string is the one encountered earliest in the array.
// Example
// distinctString(["d","b","c","b","c","a"], 2); // "a"

/*
are we guaranteed 2 arguments?

are we guaranteed to get an array as the first input?
is the array guaranteed to contain only strings?

are we guaranteed to get an int as the second input?

what should be returned if the array is empty?
what if k is zero or negative?
can the input be mutated?

for the purposes of assessing string equality, does that just amount to
str1 === str2, or are there special rules?

are empty strings considered equal to each other?

what should be done with sparse arrays?

*/

// Problem 2
// Given an array of integers, nums, return the third largest number in the
// array. If the third largest number does not exist, return the greatest
// number.

// You are not allowed to sort the array.
// Example
// thirdMax([3, 2, 1]); // 1

/*
  What happens w/ / will there be no inputs?
  What happens w/ / will there be extra inputs?
  What happens w/ / will there a non-array input?
  What happens w/ / will there be empty arrays?
  What happens w/ / will there be sparse arrays?
  What happens w/ / will there be non-numbers in the array?
  What happens w/ / will there be NaNs or Infinities?
  What happens w/ / will there be comparisons between -0 and 0?
  What happens if there are more than one of a num? (e.g. [1, 1, 1, 2, 3])

*/

// Problem 3
// Write a function, primeNumberPrinter, that prints all prime numbers
// present as substrings in a given string.
// Example
// primeNumberPrinter("a4bc2k13d"); // [2, 13]

/*
  Can be / what do about no input?
  Can be / what do about non-string input?
  Can be / what do about too many input?
  Can be / what do about empty string input?
  Can be / what do about strings w/ no primes?
  Primes will be in decimal notation?
  No return value?
  Print each on its own line?
  Does it matter what order they're printed?
  0 and 1 are non-prime, right?
  What about substrings that are also prime? (17 -- 17 and 7 are both prime)
  What about negative numbers?
*/

// Problem 4
// Write a function that takes a two-dimensional array as the argument and
// turns it into a flat array with all duplicated elements removed. Treat
//  numbers and number strings (e.g., 1 and '1') as duplicates, and keep the
//  one that comes first in the result.
// Examples
// flattenAndUnique([]); // []
// flattenAndUnique([[1, 2, 3], ['3', 4, 5, 'a']]); // [1, 2, 3, 4, 5, 'a']

/*
  What do if input not 2D array?
  What do if no input?
  What do it too much input?
  What do if 3D+ array?
  Will all elements of input 2d array be arrays?
  Max length of 2D array?
  What do if empty arrays inside 2d array? (e.g. [[[]], [[]]])
  What does duplication look like for objects / arrays?
  How does duplication work between other primitives (e.g. 0 and '',
  true and 0, undefined and null, etc.)? Are we using the abstract equals
  rules? Is there a preferential type to type-casting into when judging
  duplication among mixed-typed values?
  Are 'a' and NaN duplicates?
  what do with sparse arrays?

*/