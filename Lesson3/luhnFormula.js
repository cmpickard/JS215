"use strict";

// ----- THE PROBLEM
// The Luhn formula is a simple checksum formula used to validate a variety
// of identification numbers, such as credit card numbers and Canadian Social
// Insurance Numbers.

// The formula verifies a number against its included check digit, which is
// usually appended to a partial number to generate the full number. This
// number must pass the following test:

// Counting from the rightmost digit and moving left, double the value of
// every second digit
// For any digit that thus become 10 or more, subtract 9 from the result
// 1111 becomes 2121
// 8763 becomes 7733 (from 2 x 6 = 12 -> 12 - 9 = 3 and
//   2 x 8 = 16 -> 16 - 9 = 7)
// Add all these digits together
// 1111 becomes 2121 sums as 2 + 1 + 2 + 1 to give a checksum of 6
// 8763 becomes 7733, and 7 + 7 + 3 + 3 is 20
// If the total (the checksum) ends in 0 (put another way, if the total modulo
// 10 is congruent to 0), then the number is valid according to the Luhn
// Formula; else it is not valid. Thus, 1111 is not valid (as shown above, it
// comes out to 6), while 8763 is valid (as shown above, it comes out to 20).

// Write a program that, given a number in string format, check if it is valid
// per the Luhn formula. This should treat, for example, "2323 2005 7766 3554"
// as valid. You can ignore all non-numeric characters in the input string.

/*
_____PEDAC_____
INPUT: number, as a string -- may contain non-numeric chars
OUTPUT: boolean?

RULES:
-ignore all non-digit chars
-starting from the second-right-most digit, double this digit then every other
digit
-if the doubled number is 10 or more, substract 9. keep the result.
  e.g. 9 => 9, 8 => 7, 7 => 5, 6 => 3, 5 => 1, 4 => 8, 3 => 6, 2 => 4, 1 => 2,
  0 => 0
-the non-doubled digits are unchanged
-A new number is now created -- no digits have moved around, but every other
digit may have changed
-Add up all the digits in the resulting number
-take remainder of dividing by 10: sumDigits % 10
-if remainder is 0, return true; else, return false.

QUESTIONS:
-No input?
-Too many args?
-Non-string input?
-No numbers in string or empty string?
-we assume digits are 0-9, and we're using decimal nums?
-output is boolean?
-max length of string?

-----TEST CASES
*/
// function validLuhn(numString) {
//   return numString;
// }

// // valid inputs
// console.log(validLuhn('8763') === true);
// console.log(validLuhn('2323 2005 7766 3554') === true);
// console.log(validLuhn('42') === true);
// console.log(validLuhn('42', 'howdy!') === true);
// console.log(validLuhn('0') === true);
// console.log(validLuhn('00') === true);
// console.log(validLuhn('000000000000000') === true);
// console.log(validLuhn('9100') === true);
// console.log(validLuhn('.,!)*&!!%!_*&%!-%*4.,.,.,;2') === true);

// // invalid inputs
// console.log(validLuhn() === false);
// console.log(validLuhn('') === false);
// console.log(validLuhn(null) === false);
// console.log(validLuhn(42) === false);
// console.log(validLuhn('41') === false);
// console.log(validLuhn('420') === false);
// console.log(validLuhn('1111') === false);
// console.log(validLuhn('_)*&)*&%*&%$&^%$') === false);

/*
-----DATA STRUCTURE
Tasks:
(o) check for valid input
(i) clean the string
(ii) do calculation
(iii) check result

string cleaning can be done w/ a regex and a string
the calculation will require iterating through the chars of the string,
then performing math on some of them (after converting to nums?)
then converting them to nums for summing them
then taking the remainder

that soudns like a job for an array

-----ALGORITHM
(0) Check for invalid input -- return false if invalid
  -- verify that typeof input === 'string'
(1) clean the string using replace -- all non digits removed
(2) convert to an array of number primitives
(3) reverse the array
(4) use map to replace every other num (index % 2 === 1) with the relevant value
  -- use hash for lookup? or calc by hand? HASH
(5) use reduce to sum the digits in the map array
(6) take the remainder from division by 10
(7) return (remainder === 0)

*/
const NUM_CHANGE = {
  0: 0,
  1: 2,
  2: 4,
  3: 6,
  4: 8,
  5: 1,
  6: 3,
  7: 5,
  8: 7,
  9: 9,
};

function validLuhn(numString) {
  if (typeof numString !== 'string') return false;

  let nums = cleanAndReorder(numString);
  let sum = calcLuhnSum(nums);
  return (sum % 10 === 0);
}

function cleanAndReorder(numString) {
  let cleaned = numString.replace(/[^0-9]/g, '');
  return [...cleaned].map(digit => Number(digit)).reverse();
}

function calcLuhnSum(nums) {
  let newNums = nums.map((num, idx) => {
    return (idx % 2 === 1) ? NUM_CHANGE[num] : num;
  });

  return (newNums.length !== 0) ? newNums.reduce((sum, num) => sum + num) : -1;
}


// valid inputs
console.log(validLuhn('8763'));
console.log(validLuhn('8763') === true);
console.log(validLuhn('2323 2005 7766 3554') === true);
console.log(validLuhn('42') === true);
console.log(validLuhn('42', 'howdy!') === true);
console.log(validLuhn('0') === true);
console.log(validLuhn('00') === true);
console.log(validLuhn('000000000000000') === true);
console.log(validLuhn('9100') === true);
console.log(validLuhn('.,!)*&!!%!_*&%!-%*4.,.,.,;2') === true);

// invalid inputs
console.log(validLuhn() === false);
console.log(validLuhn('') === false);
console.log(validLuhn(null) === false);
console.log(validLuhn(42) === false);
console.log(validLuhn('41') === false);
console.log(validLuhn('420') === false);
console.log(validLuhn('1111') === false);
console.log(validLuhn('_)*&)*&%*&%$&^%$') === false);