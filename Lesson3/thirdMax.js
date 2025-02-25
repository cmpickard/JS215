/* eslint-disable no-sparse-arrays */
// Given an array of integers, nums, return the third largest number in the
// array. If the third largest number does not exist, return the greatest
// number.

// You are not allowed to sort the array.

// Example
// thirdMax([3, 2, 1]); // 1

/*
Input: an array of integers
Output: an integer, the third largest from the input array
Rules:
- Return the third largest number in the array
- if there is no third largest number, return the largest number
  -this will happen when teh array is size 1 or 2. is that the only case when
  that might happen?
- Cannot sort the array -- cannot use any library sorting methods
- return undefined if array is empty
- ignore empty slots
- array will contain either ints or strings that can be converted to nums -- or
a mix of both
- if duplicate elements are present, count each duplicate as it's own number --
so [3, 3, 2, 2, 1] should return 2 (3 is largest, 3 is second largest, 2 is 3rd
largest)

Questions:
- Is it that we cannot sort the *input* array object per se, or is it that we
are not allowed to performing a sorting? If the latter, does that include
sorting algorithms I might write myself, or only library methods?
- What do I do in cases of a tie? Like, suppose i have [1, 2, 2, 3]? Is the
third largest 2 or 1? (return 2)
-What if no input? What if non-array? What if too many input? What if input is
sparse or empty? What if array contains non-integers? (if array is empty,
return undefined; if array is sparse, ignore empty slots, array won't contain
non-integers, except possibly strings that can be converted to nums)
-Can we receive infinity? NaN? SHould i treat 0 and -0 as equal? (no, no, and
yes)

Data Structure:
array

Algorithm:
- replace nums with nums.map w/ any strings converted to numbers
- if nums.length === 1 or 2 return Math.max(nums)
- if nums.length === 0 return undefined
- pass copy into findLargest, capture the returned array
  -- input: int array
  -- output: int array MINUS the largest element, returned separately:
    [10, [1,2,9]]
- pass returned array in findLargest, capture the returned array
- pass returned array into findLargest, capture the returned value
- return that value

findLargest(intArray) {
  - make copy of intArray
  - let largest = intArray[0];
  - let largestIdx = 0;
  - iterate through intArray w/ index and element. on each iteration
    -check if currNum larger than largest. if not, next
    -if so, largest = currNum & largestIdx = currIdx
  - use splice to delete 1 element starting at largestIdx, save teh element
  - return [deleted, [splicedArray]]
}

*/

function thirdMax(inputNums) {
  let nums = inputNums.flatMap(num => Number(num));
  if (nums.length <= 0) return undefined;
  if (nums.length < 3) return Math.max(...nums);

  nums = findLargest(nums)[1][0];
  nums = findLargest(nums)[1][0];
  return findLargest(nums)[0];
}

function findLargest(nums) {
  let copyNums = nums.slice();
  let largest = copyNums[0];
  let largestIdx = 0;
  copyNums.forEach((num, idx) => {
    if (num > largest) {
      largest = num;
      largestIdx = idx;
    }
  });
  copyNums.splice(largestIdx, 1);
  return [largest, [copyNums]];
}

// console.log(findLargest([1, 3, 0, 10, 5, 6]));

// Test Cases
// Happy path
console.log(thirdMax([3,2,1, 0, -1])); // 1
console.log(thirdMax([10,3,2,1])); // 2
console.log(thirdMax([14, 16, 0, 1234, 14, 123])); // 16
// if there is no third largest number, return the largest number
console.log(thirdMax([3,2])); // 3
console.log(thirdMax([3])); // 3

// Edge Cases
// return undefined if array is empty
console.log(thirdMax([])); // undefined
// ignore empty slots
console.log(thirdMax([3,2, , , , 1])); // 1
// array will contain either ints or strings that can be converted to nums -- or
// a mix of both
console.log(thirdMax(['3','2','1'])); // 1
console.log(thirdMax(['3', '2', 1])); // 1
// if duplicate elements are present, count each duplicate as it's own number --
console.log(thirdMax([3,3,2,2,1])); // 2
console.log(thirdMax([3,3,3,1,0])); // 3