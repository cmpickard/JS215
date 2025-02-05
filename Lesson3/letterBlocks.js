"use strict";
// THE PROBLEM:
// A collection of spelling blocks has two letters per block, as shown in this
// list:

// B:O   X:K   D:Q   C:P   N:A
// G:T   R:E   F:S   J:W   H:U
// V:I   L:Y   Z:M
// This limits the words you can spell with the blocks to only those words that
// do not use both letters from any given block. You can also only use each
// block once.

// Write a function that takes a word string as an argument, and returns true
// if the word can be spelled using the set of blocks, or false otherwise.
// You can consider the letters to be case-insensitive when you apply the rules.

// Examples:
// isBlockWord('BATCH');      // true
// isBlockWord('BUTCH');      // false
// isBlockWord('jest');       // true

/*
INPUT: string word
OUTPUT: boolean
RULES:
if string has no more than 1 letter occurence from each LETTER_PAIR, return true
if string has 2+ occurences from any letter pair, return false.
case doesn't matter
LETTER PAIRS:
// B:O   X:K   D:Q   C:P   N:A
// G:T   R:E   F:S   J:W   H:U
// V:I   L:Y   Z:M

QUESTIONS:
always 1 input? -- what do if no?
always string? -- what do if no?
what do if empty string?


TEST CASES
*/

// console.log(isBlockWord('BATCH') === true);
// console.log(isBlockWord('BUTCH') === false);
// console.log(isBlockWord('jest') === true);
// console.log(isBlockWord('came') === true);
// console.log(isBlockWord('aaa') === false);
// console.log(isBlockWord('') === true);
// console.log(isBlockWord() === undefined);
// console.log(isBlockWord({}) === undefined);

/*
DATA STRUCTURE
will want to iterate through the string -- use array?
will need to keep track of how many times letter from each pair occur
maybe an object?

alternatively, could iterate through the letter pairs and check how many times
one of them occurs in the string.
{AN: 0, BO: 0, etc.}
If i just use a counter variable, I can use an array instead.

ALGORITHM
(0) validate input - return undefined if typeof input !== 'string'
(1) create object with letter pairs
(2) upcase the string
(3) iterate through object (using keys?) for each key,
  (a) letter 1 = key[0], letter 2 = key[1]
  (b) let count = 0;
  For each letter,
    (c) match key with string.match -- use g flag to we only get matches
    (d) add size of retured arr to count
  (e) if count > 1, return false.
Since i want to return directly from the loop, maybe we use for...of loop

return true, if we make it to the end w/o returning
*/
const BLOCK_LETTERS = [
  'AN',
  'BO',
  'CP',
  'DQ',
  'ER',
  'FS',
  'GT',
  'HU',
  'IV',
  'JW',
  'KX',
  'LY',
  'MZ',
];

function isBlockWord(word) {
  if (typeof word !== 'string') return undefined;
  let upperWord = word.toUpperCase();

  for (let pair of BLOCK_LETTERS) {
    let count = 0;
    let [letter1, letter2] = pair;
    count += (upperWord.match(new RegExp(`${letter1}`, 'g')) || []).length;
    count += (upperWord.match(new RegExp(`${letter2}`, 'g')) || []).length;
    if (count > 1) return false;
  }

  return true;
}

console.log(isBlockWord('BATCH') === true);
console.log(isBlockWord('BUTCH') === false);
console.log(isBlockWord('jest') === true);
console.log(isBlockWord('came') === true);
console.log(isBlockWord('aaa') === false);
console.log(isBlockWord('') === true);
console.log(isBlockWord() === undefined);
console.log(isBlockWord({}) === undefined);
