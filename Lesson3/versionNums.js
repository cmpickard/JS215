/* PEDAC
To look at the steps of this problem solving approach in depth, we will work
through a problem and see how to apply each step in the process. The problem
we will look at compares software version numbers.

While version numbers often appear to be decimal numbers, they are, in fact,
a convenient notation for a more complicated number system. The following are
all legal version numbers:

1
1.0
1.2
3.2.3
3.0.0
4.2.3.0
Write a function that takes any two version numbers in this format and
compares them, with the result of this comparison showing whether the first is
less than, equal to, or greater than the second version:

If version1 > version2, we should return 1.
If version1 < version2, we should return -1.
If version1 === version2, we should return 0.
If either version number contains characters other than digits and
the . character, we should return null.
Here is an example of version number ordering:
0.1 < 1 = 1.0 < 1.1 < 1.2 = 1.2.0.0 < 1.18.2 < 13.37

PROBLEM:
input: two strings (HAVE TO BE becuase no valid Number value would have multiple
decimal points)
 -- could be fewer then 2 inputs?
 -- trailing period ok? (e.g. '1.0.' is that bad input or nah?)
output: ONE OF: 1, 0, -1, null

rules:
- if v1 > v2, return 1; if v1 < v2, return -1; if v1 === v2 return 0; if the
inputs are bad return null
- a 'bad' input is an input that includes chars other than [.0-9]
  -- what about other possible edge cases? e.g. 0001.1?
- good inputs look like a sequence of integers separated by periods:
  -- e.g. 1.34.0, 4.0.1
- the "MORE THAN" rules are going to be the trickiest part. they seem to work
like this?
  -- first we consider the left most integers. If one is numerically larger than
  the other, then the one is larger. If they are equal
  -- we consider the second-left-most integers. If one is numerically larger
  than the other, then the one is larger. If they are equal
  -- we consider...
  and so one. If we get to the end and all the numbers were equal, then the
  two vers nums are equal.
  -- ADDITIONAL RULE: version 1.0 and version 1.0.0 are considered equal
  we'll deal with how to sort that complexity out when we hit the algorithm
  stage (maybe take the shorter of two numbers and flesh out the extra spaces
  with zeroes?)
  -- each particular integer is treated as a whole number, and is not broken
  down in the same way: so 1.2.0 < 12.0 -- the 12 gets treated like a 12 and not
  like a 1 then a 2

----Examples / Test Cases
so, I think a basic call might look like this,
  compareVersions('1.0.1', '1.2');

bad input might look like this,
  compareVersions('1.0.a', '1.2')
  compareVersions()
  compareVersions('1.0')
  compareVersions('1.0', '1..2')
*/

// Happy Path
// console.log(compareVersions('1', '2') === -1);
// console.log(compareVersions('2', '1') === 1);
// console.log(compareVersions('1', '1') === 0);
// console.log(compareVersions('1.0', '1.2') === -1);
// console.log(compareVersions('2.23', '1.2') === 1);
// console.log(compareVersions('1.2.0.0', '1.2') === 0);
// console.log(compareVersions('1.13.14', '1.13.15') === -1);
// console.log(compareVersions('2.30.13.0', '2.30.12') === 1);
// console.log(compareVersions('0.1', '0.1.0') === 0);

// // Bad inputs / edge cases
// console.log(compareVersions('1.0') === null);
// console.log(compareVersions() === null);
// console.log(compareVersions('1.a', '2.0') === null);
// console.log(compareVersions('1.34', '_.0') === null);
// console.log(compareVersions('1.a_sdfasdfj.', '*%$') === null);
// console.log(compareVersions('1.0', '') === null);
// console.log(compareVersions('1..0', '12.0.1') === null);

// console.log(compareVersions('0.1.', '0.1.0') === 0);
// console.log(compareVersions('0.1.', '0.1.0.') === 0);
// console.log(compareVersions('0.1', '0.1.0.') === 0);

/*
---DATA STRUCTURE
i'm doing a lexical comparison along each pair of period-separated ints. SO
order matters and i'll also want to iterate along the pairs.
Array is the obvs choice.

Do I want a multi-D array or just two arrays?
[[12, 0, 1], [12, 0, 2]] vs. [12, 0, 1] & [12, 0, 2]
Let's try two arrays.

The comparisons are numeric, so the elements of the array should be nums, which
means i'll need to convert them from strings at some point.

The output will be an int or null


--ALGORITHM
1. Check for valid inputs -- return null if invalid
  --FUNCTION: checkValid(version)
2. Convert 2 input strs to 2 arrays full of integers
  --FUNCTION: stringToNumList(version)
3. Compare int arrays, iterating through until the values are unequal
  --FUNCTION: compareNumLists(list1, list2)
4. Return -1, 1, 0 depending on result

function checkValid(version) {
  // check if undefined -- return false
  // check for empty strings or chars outside of [0-9.] -- return false
  // check for doubled periods -- return false
  // use regex

  if (version === undefined || version === '') return false;
  if (/[^0-9\.]/.test(version)) return false;
  if (/\.\./.test(version) return false;)
}

function stringtoNumList(version) {
  // use split on the '.'
  // i think cases with a trailing period will be handled automatically?
  return version.split('.');
}

function compareNumLists(list1, list2) {
  // iterate through lists -- simple forEach loop? Maybe not, no great way to
  break out of it when we find the first discrepancy.
  // -1. reorder list1 and list2 so that list1 is always the longest list
    -- if (list2.length > list1.length) [list1, list2] = [list2, list1];
  // 0. declare result variable
  // 1. Use for... loop on list1
  // 2. check if either list1[idx] or list2[idx] is undefined, if so, act like
  it's zero
  // 3. compare list1[idx] with list2[idx]
    // if >, result = 1 and break; else if <, result = -1 and break
    // else (if ===), nothing / continue, next iteration

  if (list2.length > list1.length) [list1, list2] = [list2, list1];
  let result = 0;
  for (idx = 0; idx < list1.length; idx++) {
    let val1 = list1[idx] || 0;
    let val2 = list2[idx] || 0;
    if (val1 > val2) {
      result = 1;
      break;
    } else if (val1 < val2) {
      result = -1;
      break;
    }
  }

  return result
}

*/

function compareVersions(version1, version2) {
  if (!checkValid(version1) || !checkValid(version2)) return null;
  let list1 = stringtoNumList(version1);
  let list2 = stringtoNumList(version2);
  return compareNumLists(list1, list2);
}

function checkValid(version) {
  if (version === undefined || version === '' || typeof version !== 'string') {
    return false;
  } else if (/[^0-9.]/.test(version)) {
    return false;
  } else if ((/\.\./.test(version))) {
    return false;
  } else if (version[0] === '.' || version.slice(-1) === '.') {
    return false;
  } else {
    return true;
  }
}

function stringtoNumList(version) {
  return version.split('.');
}

function compareNumLists(list1, list2) {
  if (list2.length > list1.length) [list1, list2] = [list2, list1];

  let result = 0;
  for (let idx = 0; idx < list1.length; idx++) {
    let val1 = list1[idx] || 0;
    let val2 = list2[idx] || 0;
    if (val1 > val2) {
      result = 1;
      break;
    } else if (val1 < val2) {
      result = -1;
      break;
    }
  }

  return result;
}

// happy path
console.log(compareVersions('1', '2') === -1);
console.log(compareVersions('2', '1') === 1);
console.log(compareVersions('1', '1') === 0);
console.log(compareVersions('1.0', '1.2') === -1);
console.log(compareVersions('2.23', '1.2') === 1);
console.log(compareVersions('1.2.0.0', '1.2') === 0);
console.log(compareVersions('1.13.14', '1.13.15') === -1);
console.log(compareVersions('2.30.13.0', '2.30.12') === 1);
console.log(compareVersions('0.1', '0.1.0') === 0);

// Bad inputs / edge cases
console.log(compareVersions('1.0') === null);
console.log(compareVersions() === null);
console.log(compareVersions(12, 13) === null);
console.log(compareVersions(true, '1.9') === null);
console.log(compareVersions([], {}) === null);
console.log(compareVersions('1.a', '2.0') === null);
console.log(compareVersions('1.34', '_.0') === null);
console.log(compareVersions('1.a_sdfasdfj.', '*%$') === null);
console.log(compareVersions('1.0', '') === null);
console.log(compareVersions('1..0', '12.0.1') === null);
console.log(compareVersions('.0.1', '0.1.0') === null);
console.log(compareVersions('0.1.', '.0.1.0') === null);
console.log(compareVersions('.0.1', '.0.1.0.') === null);
console.log(compareVersions('0.1.', '0.1.0') === null);
console.log(compareVersions('0.1.', '0.1.0.') === null);
console.log(compareVersions('0.1', '0.1.0.') === null);