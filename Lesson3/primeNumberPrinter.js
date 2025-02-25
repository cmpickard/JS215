// Write a function, primeNumberPrinter, that prints all prime numbers present
// as substrings in a given string.

// Example
// primeNumberPrinter("a4bc2k13d"); // [2, 13, 3]

/*
Input: a string with a variety of characters, possibly including digits
Output: an array of numbers, the prime numbers present in the string
Rules:
-any substring of the input string that represents a prime number should be
included in the output array -- and nothing else should be included
-the output array should have numbers, not strings

Definitions:
a prime number is a positive integer greater than 1 that is not the product of
two smaller positive numbers

Questions:
- what if no input? (wont happen)
- what if too many args? (ignore)
- what if input is not a string? (won't happen)
- what if string is empty? (return empty array)
- what is string contains no prime numbers (return empty array)
- what abt input like '17' -- is that both 7 and 17? or just 17? or just 7?
(it's both 7 and 17)
- are the numbers in base 10? (yes)
- do i need to worry about decimal points and minus signs in the input?
- does the order of output matter (no)


Data Structure:
An array of substrings

Algorithm:

- return [] if string.length === 0
- call allSubstrings on string, save returned array
  HELPER FUNCTION: allSubstrings
  -input: string
  -output: array of all substrings
- map substring array, converting all the substrings to numbers
- filter the mapped array, removing any elements that converted to NaN
- filter the mapped-and-filterd array, removing any elements that are non-prime
  HELPER FUNCTION: isPrime
  -input: number
  -output: boolean
- return array of double filtered nums

allSubstrings:
  -declare result array
  -iterate through the input string, with char, startIndex. on each iteration
    -grab all the substrings that start at startIndex, into an array
    HELPER FUNCTION: allLeadingSubstrings
    -input: string
    -output: array of strings
    -push that array into result
  - return result.flat()

allLeadingSubstring:
  create array size = input.length
  fill with nulls
  map, with index, on each iteration
    return slice from 0 to index + 1

isPrime:
  return false if input is less than 2
  return true if input === 2 or 3
  for loop: num from 2 to Math.floor(input / 2). on each iteration
    -check if input number % num === 0, if so return false
  return true

*/

function primeNumberPrinter(string) {
  if (string.length === 0) return [];
  let substrs = allSubstrings(string);
  let numStrs = substrs.map(str => Number(str));
  let nums = numStrs.filter(num => !Number.isNaN(num));
  return nums.filter(isPrime);
  // need to remove duplicates?
}

function allSubstrings(string) {
  let result = [];
  [...string].forEach((_, idx) => {
    result.push(leadingSubstrings(string.slice(idx)));
  });

  return result.flat();
}

function leadingSubstrings(string) {
  return new Array(string.length)
    .fill(null)
    .map((_, idx) => string.slice(0, idx + 1));
}

function isPrime(num) {
  if (num === 0 || num === 1) return false;
  if (num === 2 || num === 3) return true;
  for (let divisor = 2; divisor <= Math.floor(num / 2); divisor++) {
    if (num % divisor === 0) return false;
  }

  return true;
}

// //Test cases
console.log(primeNumberPrinter("a4bc2k13d")); // [2, 13, 3]
console.log(primeNumberPrinter("a17bf")); // [17, 7]
console.log(primeNumberPrinter("a23fdj07")); // [2, 3, 23, 7] ???
console.log(primeNumberPrinter("asdf;lasdfn737a;sadf")); // [7, 37, 73, 7, 3]

// - what if too many args? (ignore)
console.log(primeNumberPrinter("a17bf", true)); // [17, 7]
// - what if string is empty? (return empty array)
console.log(primeNumberPrinter("")); // []
// - what is string contains no prime numbers (return empty array)
console.log(primeNumberPrinter("a4bf8")); // []