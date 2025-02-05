/* eslint-disable max-len */
"use strict";
// THE PROBLEM
// You are given a list of numbers in a "short-hand" range where only the
// significant part of the next number is written because we know the
// numbers are always increasing (ex. "1, 3, 7, 2, 4, 1" represents
//   [1, 3, 7, 12, 14, 21]). Some people use different separators for their
//   ranges (ex. "1-3, 1-2", "1:3, 1:2", "1..3, 1..2" represent the same
//     numbers [1, 2, 3, 11, 12]). Range limits are always inclusive.

// Your job is to return a list of complete numbers.

// The possible separators are: ["-", ":", ".."]

// "1, 3, 7, 2, 4, 1" --> 1, 3, 7, 12, 14, 21
// "1-3, 1-2" --> 1, 2, 3, 11, 12
// "1:5:2" --> 1, 2, 3, 4, 5, 6, ... 12
// "104-2" --> 104, 105, ... 112
// "104-02" --> 104, 105, ... 202
// "545, 64:11" --> 545, 564, 565, .. 611

/*
INPUT: string, with numbers and separators representing a range
OUTPUT: a list of all the numbers in the range(s) indicated in the string
RULES:
- The string represents a list of separate ranges
- A range can be as short as one number, in which case the digit itself will
be listed
- Any of the following symbols can be used to indicate a range: -, :, ..
- Each range will be comma separated
- The ranges are always increasing from left to right
- Ranges can be chained together like, 3-6-8 -- which is equiv to 3-8
- The ranges use shorthand to drop leading digits, which digits can always be
inferred from the fact that the numbers increase from left to right. This can
occur both inside a range and between ranges (e.g. 8-1) and (e.g. 5-7, 6-7)
where the former is (8, 9, 10, 11) and that latter is (5, 6, 7, 16, 17)
The rules seem to be:
  -e.g. 5, 4   => since 4 is less than 5, we infer that 4 is short for 14, the
  smallest number that is (i) more than 5 but (ii) terminates with 4
  -e.g. 104, 2 => since 2 is less than 4, we have to find the smallest num
  that is (i) more than 104, but (ii) terminates in 2. That's gonna be 112.
  -e.g. 104, 02 => same deal, but that zero before the 2 means we're looking for
  a number that terminates in 02, which means the next smallest number is 202

- The return array should include all the numbers covered by every listed range,
including the ends points of each range (e.g. 1-3 => 1, 2, 3)


QUESTIONS:
-Numbers returned... in an array?
-Numbers in asc order in return array?
-What do empty string?
-What do no input?
-What do too many input?
-What do input wrong type?
-What do characters that aren't nums or separators?
-All numbers represented as decimals?
-What do if negatives? (Let's suppose none, else the '-' will suuuuck)
-What do if NaN? Infinity?
-What do if single '.' used as separator?

TEST CASES:
*/
// "1, 3, 7, 2, 4, 1" --> 1, 3, 7, 12, 14, 21
// "1-3, 1-2" --> 1, 2, 3, 11, 12
// "1:5:2" --> 1, 2, 3, 4, 5, 6, ... 12
// "104-2" --> 104, 105, ... 112
// "104-02" --> 104, 105, ... 202
// "545, 64:11" --> 545, 564, 565, .. 611

// console.log(shortHandRange("1, 3, 7, 2, 4, 1")); // [1, 3, 7, 12, 14, 21]
// console.log(shortHandRange("1-3, 1-2")); // [1, 2, 3, 11, 12]
// console.log(shortHandRange("1:5:2")); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
// console.log(shortHandRange("104-2")); // [104, 105, 106, ..., 112]
// console.log(shortHandRange("104-02")); // [104, 105, 106, ..., 202]
// console.log(shortHandRange("545, 64:11")); // [545, 564, 565, ..., 611]
// console.log(shortHandRange("57..9..1, 8..9")); // [57, 58, 59, 60, 61, 68, 69]
// console.log(shortHandRange("asd1-*&%^3, asdf1-2")); // [1, 2, 3, 11, 12]

// console.log(shortHandRange("")); // []
// console.log(shortHandRange("NaN")); // []
// console.log(shortHandRange("Infinity")); // []
// console.log(shortHandRange("acbe")); // []
// console.log(shortHandRange("1ba-2")); // [1, 2]
// console.log(shortHandRange(true) === undefined); // undefined
// console.log(shortHandRange() === undefined); // undefined
// console.log(shortHandRange(null, false) === undefined); // undefined
// console.log(shortHandRange("1-4", undefined)); // [1, 2, 3, 4]

/*
DATA STRUCTURE
Clearly an array for the return value
I'll want to clean the string to strip off any chars that aren't 0-9-,: or ..
That should we doable with strings and regexes

I'll use split to break the comma-separated list of ranges into a collection of
separate ranges. Then I can iterate over them.

I'll use a number to keep track of what the largest num seen so far is -- use
that val to interpolate the next shorthand number.

Parsing the string will likely require me to switch back and forth between
strings and numbers.

Once I've worked out what values a given range covers, I can push them all into
my results array

ALGORITHM:
(0) Check for invalid input. Return undefined if found
(1) Clean the string, removing all irrelevant chars, including . by themselves
(2a) Split the string along (','), creating ranges array
(2b) Replace all range markers with '-' to make the next split easier
(2b) Map: pass all ranges into breakMultiRanges, then flatten
  HELPER METHOD: breakMultiRanges(multiRange) {}
  INPUT: multi-range as string
  OUPUT: array of single ranges? (which then get flattened?)
  -- what do I do about duplicating the end of one range as the start of another
  do i handle that here and increase the next range start point by 1 or do i
  handle that later and check whether rangeStart === maxSeen?
  1:2:3 => 1:2, 2:3 OR 1:2, 3:3  NOT THE LATTER, that's 1,2,3,... 13
  SO i'll need some way to handle rangeStart === maxSeen. How will I know?
  What if max seen is 11 and range start is just 1?
  10:1:3 => 10:1, 1:3 -- I need to be able to read that as [10, 11, 12, 13] and
  not [10, 11, 21, 22, 23]
  What if instead of increasing the START of the second range, i decrease the
  END of the first range by 1?
  1:5:2 => 1:4, 5:2
  1:2:3 => 1:1, 2:3 => that's bad too, that's like 1..11, 2..3
  I could manually check whether middleNum === firstNum + 1?
  If so, firstRange = firstNum (by itself)

(3) Create: (i) result array, (ii) num that is max number seen so far.
  (a) result = []; maxSeen = 0;
  (b) use Math.max to update the maxSeen? (e.g. maxSeen = Math.max(...result))
(4) iterate through the ranges array. Which iterator? Could do simple for...of
loop. Or map? If map, each iteration could return an array of nums covered by
the range, then later I can concat them together or push/flatten. On each iter-
ation:
  (a) break range along separator into first and last elements of range.
  (b) use maxNum to calculate what the start of the range must be
    -If first num > lastDigit
*/
function shortHandRange(numStr) {
  if (typeof numStr !== 'string') return undefined;
  let cleaned = numStr.replace(/[^-,:0-9.]/g, '').replace(/(:|\.\.)/g, '-');
  if (cleaned === '') return [];
  let ranges = cleaned.split(',').map(breakMultiRanges).flat();
  return gatherNumbersFromRanges(ranges);
}

function breakMultiRanges(rangeStr) {
  let result = [];
  let rangeNums = rangeStr.split('-');
  if (rangeNums.length === 1) return rangeStr + '-' + rangeStr;
  if (rangeNums.length === 2) return rangeStr;

  for (let idx = 0; idx < rangeNums.length - 1; idx++) {
    let num = rangeNums[idx];

    if (Number(num) + 1 === Number(rangeNums[idx + 1])) {
      result.push(num);
    } else {
      let last = Number(rangeNums[idx + 1]) - 1;
      if (idx === rangeNums.length - 2) last += 1;
      result.push(num + '-' + String(last));
    }
  }

  return result;
}

function gatherNumbersFromRanges(ranges) {
  let result = [];
  let maxSeen = 0;

  for (let range of ranges) {
    let [first, last] = range.split('-');
    let wholeFirst = findNext(String(maxSeen), first);
    let wholeLast = last ? findNext(String(wholeFirst), last) : wholeFirst;
    addRange(Number(wholeFirst), Number(wholeLast), result);
    maxSeen = Math.max(...result);
  }

  return result;
}

function findNext(maxSeenString, nextNumPart) {
  // console.log(maxSeenString, nextNumPart);
  let lastDigs = maxSeenString.slice(-1 * nextNumPart.length);
  // if (lastDigs === nextNumPart) lastDigs -= 1;

  let neededNums = maxSeenString.length - nextNumPart.length;
  let firstDigs = maxSeenString.slice(0, neededNums);

  console.log(lastDigs, nextNumPart);
  if (lastDigs > nextNumPart) firstDigs = String(Number(firstDigs) + 1);

  let result = firstDigs + nextNumPart;
  return result;
}

function addRange(first, last, arr) {
  for (let num = first; num <= last; num++) {
    arr.push(num);
  }
}

console.log(shortHandRange('21, 1, 1')); // [21, 31, 41]
console.log(shortHandRange('22, 1, 0')); // [22, 31, 40]
console.log(shortHandRange("1, 3, 7, 2, 4, 1")); // [1, 3, 7, 12, 14, 21]
// console.log(shortHandRange("1-3, 1-2")); // [1, 2, 3, 11, 12]
// console.log(shortHandRange("1:5:2")); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
// console.log(shortHandRange("104-2")); // [104, 105, 106, ..., 112]
// console.log(shortHandRange("104-02")); // [104, 105, 106, ..., 202]
// console.log(shortHandRange("545, 64:11")); // [545, 564, 565, ..., 611]
// console.log(shortHandRange("57..9..1, 8..9")); // [57, 58, 59, 60, 61, 68, 69]
// console.log(shortHandRange("asd1-*&%^3, asdf1-2")); // [1, 2, 3, 11, 12]

// console.log(shortHandRange("")); // []
// console.log(shortHandRange("NaN")); // []
// console.log(shortHandRange("Infinity")); // []
// console.log(shortHandRange("acbe")); // []
// console.log(shortHandRange("1ba-2")); // [1, 2]
// console.log(shortHandRange(true)); // undefined
// console.log(shortHandRange()); // undefined
// console.log(shortHandRange(null, false)); // undefined
// console.log(shortHandRange("1-4", undefined)); // [1, 2, 3, 4]
