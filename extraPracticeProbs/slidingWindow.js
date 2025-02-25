// Problem: Sliding Window Maximum

// Given an array of integers and a window size k, find the maximum element in
// each sliding window of size k as it moves from left to right through the arr
// Return an array of these maximum elements.
// Example:
// Input: nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3
// Output: [3, 3, 5, 5, 6, 7]
// Explanation:
// Window position                Max
// ***
// [1  3  -1] -3  5  3  6  7      3
// 1 [3  -1  -3] 5  3  6  7       3
// 1  3 [-1  -3  5] 3  6  7       5
// 1  3  -1 [-3  5  3] 6  7       5
// 1  3  -1  -3 [5  3  6] 7       6
// 1  3  -1  -3  5 [3  6  7]      7

// Your task:
// Implement a function sliding_window_maximum(nums, k) that takes an array
// nums and window size k as input and returns an array of maximum elements for
// each window.

/*
Input: 2 values: an array of integers, a positive integer, k
Output: an array of integers
Rules:
- the second argument represents a 'window' size -- so if k is 3, the window
has width 3. We then imagine sliding that window along the other arg, the input
array. For each position of the window, we will calculate the maximum value
among those within in the window (e.g. the largest of the 3 nums, if k is 3).
The output array is then a list of the largest numbers at each position of the
window, starting with the max num when the window was on the far left, and with
the next num corresponding to the window being 1 unit further to the right
- the output array will thus have a size =
  1 + inputArr.length - k


Questions:
- what if no input?
- what if too many inputs?
- what if inputs are wrong type
- what if arr is smaller than k?
- what if arr is sparse?
- what if arr contains non-numeric elements or NaN?
- what if window size is 0 or negative?

Test Cases:
- see below

Data Structure:
i'll use a subarray as my "window" probably slicing it out of the input array

Algorithm:
- calculate the size of the output array: 1 + inputArr.length - k
- create a new array, result, with that size filled with... nulls?
- iterate thru result using map, capture the index. on each iteration
- slice the input arr starting at index and for length = k
- find max value of the slice, and return it

-return result
maxWindow(nums, 6)
sizeofoutput => (1 + nums.length - 6) => 3
result => [null, null, null]
result map => (_, idx)
  idx = 0 => slice = [1, 3, -1, -3, 5, 3]
  max = 5
  return 5
  idx = 1 => slice = 3, -1, -3, 5, 3, 6
  return 6
  idx = 2 =>  -1, -3, 5, 3, 6, 7
  return 7
map: 5, 6, 7
*/

function maxWindow(arr, windowWidth) {
  if (windowWidth >= arr.length) return [Math.max(...arr)];
  if (windowWidth < 1) return [];
  let outputSize = 1 + arr.length - windowWidth;
  let result = new Array(outputSize).fill(null);
  return result.map((_, idx) => Math.max(...arr.slice(idx, idx + windowWidth)));
}

let nums = [1, 3, -1, -3, 5, 3, 6, 7];
console.log(maxWindow(nums, 1)); // [1, 3, -1, -3, 5, 3, 6, 7]
console.log(maxWindow(nums, 2)); // [3, 3, -1, 5, 5, 6, 7]
console.log(maxWindow(nums, 3)); // [3, 3, 5, 5, 6, 7]
console.log(maxWindow(nums, 4)); // [3, 5, 5, 6, 7]
console.log(maxWindow(nums, 5)); // [5, 5, 6, 7]
console.log(maxWindow(nums, 6)); // [5, 6, 7]
console.log(maxWindow(nums, 7)); // [6, 7]
console.log(maxWindow(nums, 8)); // [7]
console.log(maxWindow(nums, 9)); // [7]
console.log(maxWindow(nums, 0)); // []