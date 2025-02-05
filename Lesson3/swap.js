// Write a function called swap that takes a string as an argument, and
// returns a new string, where the alphabetic characters have taken the
// place of the numeric characters, and vice versa.

// Examples / Test Cases
// function swap(str) {
//   // ...
// }

// console.log(swap("1a2b3c") === "a1b2c3"); // true
// console.log(swap("abcd123") === "123dabc"); // true

/*
Input: string
Ouput: string
Rules:
For a given string, swap the positions of the alphabetic chars with the
positions of the numeric chard according to the following rules:
-the first alph char swaps places with the first num char, the second alph char
swaps places with the second num char, etc.
  -such that each alpha char is *paired* with a single num char and the two swap
-for a string where the number of alpha chars and the number of num chars is not
equal, alphas and nums are paired up until one variety runs out. the remaining
chars from the other variety do not swap
-empty strings should return empty strings
-string may contain upcase letters
-all chars outside of A-Za-z0-9 remain in place in the new string


Questions:
-alphabetic chars are a-zA-Z, yes?
-numeric chars are 0-9?
-all other chars are... left in place? won't be present in the input?
-what do if no input?
-what do if too many args?
-what do if input wrong type?
-what do if empty string?
-what do if input consists of all alphabetics OR of all numerics?
-am i correct that when the number of one group exceeds the number of the other
group, that the excess unmatched members remain in-place?

TEST CASES
*/

// console.log(swap("12a") === "a21"); // true
// console.log(swap("ab1") === "1ba"); // true
// console.log(swap("abcd") === "abcd"); // true
// console.log(swap("1") === "1"); // true
// console.log(swap('') === ''); // true
// console.log(swap("123-4a#b$") === "ab3-41#2$"); // true
// console.log(swap("ab1CD23") === "12a3DbC"); // true

/*
  DATA STRUCTURE
  Result array. The order is preserved, so i could initialize an empty array of
  length = input.length, and then as I learn which letters go at which indices,
  slot them into that result array before finally join()-ing it and returning

  Or maybe 2 3d-arrays like this,
    [['a', 0],['b', 2]...]
    [['8', 1],['5', 3]...]
  then i iterate through the longer of the two, and swap out the inner index
  at each outer index at 0: (0 <=> 1), at 1: (2 <=> 3)
  But on this route, idk what to do with irrelevant chars? where are they saved?


  ALGORITHM
  (1) convert input str to arr using [...str].map and then fill in all the
  indices with null, if char is alphanum, else w/ char. this ensures that our
  un-swapped chars are already in the right place
  (2) create multi-d array with all alphas and their indices e.g. [['a', 0]]
  and another with all nums and their indices
  (3) iterate through the larger of those two multiD arrays? or use shift?
*/

function swap(str) {
  let resultArr = [...str].map(char => {
    return (/[^0-9a-z]/gi.test(char)) ? char : null;
  });

  let alphas = [...str].map((char, idx) => [char, idx])
    .filter(([char, _]) => /[a-z]/gi.test(char));
  let nums = [...str].map((char, idx) => [char, idx])
    .filter(([char, _]) => /[0-9]/gi.test(char));

  performSwap(resultArr, alphas, nums);
  return resultArr.join('');
}

function performSwap(resultArr, alphas, nums) {
  alphas.forEach(([alpha, alphaIdx]) => {
    let numToSwap = nums.shift();
    if (numToSwap === undefined) {
      resultArr[alphaIdx] = alpha;
    } else {
      let [charToSwap, indexToSwap] = numToSwap;
      resultArr[alphaIdx] = charToSwap;
      resultArr[indexToSwap] = alpha;
    }
  });

  nums.forEach(([num, numIdx]) => {
    resultArr[numIdx] = num;
  });
}

console.log(swap("12a") === "a21"); // true
console.log(swap("ab1") === "1ba"); // true
console.log(swap("abcd") === "abcd"); // true
console.log(swap("1") === "1"); // true
console.log(swap('') === ''); // true
console.log(swap("123-4a#b$") === "ab3-41#2$"); // true
console.log(swap("ab1CD23") === "12a3DbC"); // true