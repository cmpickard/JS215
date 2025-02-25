/* eslint-disable no-sparse-arrays */
// A distinct string is a string that is present only once in an array.

// Given an array of strings, arr, and an integer, k, return the kth distinct
// string present in arr. If there are fewer than k distinct strings, return an
// empty string "".

// Note that the result string is the one encountered earliest in the array.

// Example

// distinctString(["d","b","c","b","c","a"], 2); // "a"

/*
input: (i) array of strings, (ii) a positive integer, k
output: a string -- either an element from the array or ''
rules:
-will receive an array and an int
-array could be empty or sparse
-int could be zero but will otherwise be a positive whole number
-if array is empty, return ''
-if k = 0, return ''
-if k exceeds the number of distinct strings return 0
-if array is sparse, ignore empty slots
-we count distinct strings from left-to-right, in the order we encounter them
when moving through the arr from index 0 to index = arr.length. so if we are
to return the 3rd distinct string, we should return the 3rd such string we
encounter when moving left to right --
['a', 'b', 'c', 'd'], 3 -> should return 'c'

definitions:
a 'distinct string' is a string in the input array that does not occur 2+ times.
This inclues any capitalization variations -- 'a' and 'A' count as 'the same'
All characters in the string matter when determining its distinctness *except
for the aforemrentioned capitalization rule

questions:
- what if no input or only 1 input? (won't happen)
- what if too many inputs? (won't happen)
- What if the array is empty? sparse? (empty array return ''. sparse array, do
not count a single empty slot as a 'distinct string')
- what if the array contains non-strings? (won't happen)
- what if the integer is negative? 0? infinity? nan? fractional?
  - 0 could happen, if so return ''. other cases won't happen
- does capitalization matter? (no)

data structure:
could do a reduce to count how many of each element is present in the array
i'd presumably use an obj for that
then i can convert back to an array of keys once i've filtered out the keys
that have a value of 2+

algorithm:
- check if array is empty or k = 0, if so return ''
- reduce array. use {} as accumulator, for each iteration:
  - check if currString is already a property in the obj -- this comparison
  needs to be *case invariant*
    -if so increment count by 1 (e.g obj[currString] += 1)
    -if not add the string to the object as a property, w/ inital val of 1
  -return obj
-- save the object to a var
-filter that object -- grab key/val pairs, then remove the ones where the val
is 2+
-convert to array of keys
-grab the element at index = k - 1;
if that element does not exist return ''
else return, the string element
*/


function distinctString(strings, val) {
  if (strings.length === 0 || val === 0) return '';
  let lowerStrings = strings.map(string => string.toLowerCase());
  let count = lowerStrings.reduce((obj, string) => {
    if (obj[string] !== undefined) {
      obj[string] += 1;
    } else {
      obj[string] = 1;
    }
    return obj;
  }, {});

  let distincts = Object.entries(count).filter(([_, count]) => count === 1)
    .map(([word, _]) => word );
  // console.log(distincts);
  return distincts[val - 1] || '';
}

// Test Cases
// happy path
console.log(distinctString(["d","b","c","b","c","a"], 2)); // "a"
console.log(distinctString(["d","b","c","b","c","a"], 1)); // "d"
console.log(distinctString(["d","b","c","a"], 3)); // "c"
console.log(distinctString(["ab","bcd","bcd","aaa", 'bcd', 'ab'], 1)); // "aaa"

// edge cases
// k = 0
console.log(distinctString(["d","b","c","a"], 0)); // ""
// capitalization doesn't matter
console.log(distinctString(["d","D","c","C","A","AB"], 1)); // "A" || "a"
// if array is empty, return ''
console.log(distinctString([], 3)); // ""
// if k = 0, return ''
console.log(distinctString(["d","D","c","C","A","AB"], 0)); // ""
// if k exceeds the number of distinct strings return ''
console.log(distinctString(["d","b","c","b","c","a"], 3)); // ""
// if array is sparse, ignore empty slots
console.log(distinctString(["d","b","c", ,"b", ,"c","a"], 2)); // "a"
// non-alphanumeric chars matter
console.log(distinctString(["d","b.*","c&&","b.","c&&","a"], 3)); // "b."