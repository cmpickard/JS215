/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-loop-func */
// Problem: Interval Merger
// Write a function called mergeIntervals that takes an array of intervals and
// merges overlapping intervals. Each interval is represented by an array of
// two integers [start, end]. The function should return a new array of merged
// intervals, sorted by their start times.

/*
input: array of 2-element arrays, where each element is an integer, the first
representing the start of an interval, the last representing the end
output:an array of 2-element arrays, same details as the input, except any
'overlapping' intervals are replaced by an interval that encompasses the entire
stretch and the interval arrays are in ascending order

rules:
- the return value should be a new array, and the input array shold not be
mutated
-

questions:
- what if no input
- what if wrong type
- what if array does not have sub arrays
- what if sub arrays do not have 2 elements or they aren't ints?
- can the ints be out of order (e.g. [2, 1])
- do we assume the the 'interval' encompases all of the integers between the
start and end, inclusive (e.g. [1, 10] includes 1, 2, 3, 4, 5, 6... ?)
-sparse input?
- if the 'start' of one interval is = to the 'end' of another, those two
intervals should be merged
- intervals can have the same start, end values. if that value is not included
in any other interval, than that interval should be included in the return val
- when 2 intervals 'overlap' the output array should have a single new interval
that represents both with a start equal to the smaller of the two's starts and
end equal to the larger of the twos ends
- same deal if 3+ intervals overlap: the output should contain just one for all
the overlappin intervals

data structure:
sets

algorithm:
- use sets:
- sort input intervals
- convert each to a set
- create a new set that consists of a union of all the input sets
- convert this new set back to a list of intervals:
  -shift the first number. this is the Start value for the next interval
  -shift the next number. if this number is = first + 1, save as lastNum & shift
  the next number.
  Keep doing this until we hit a num that is EITHER the last number or not = to
  1 + lastNum. At this point, we have an interval: start was the first num
  we shifted and end is the second-to-last num we shifted
  Add this interval to our output array
  */

function sortIntervals(interval1, interval2) {
  return interval1[0] - interval2[0];
}

function mergeIntervals(intervals) {
  if (intervals.length === 0) return [];
  let unmergedInts = intervals.slice().sort(sortIntervals);
  let mergedInts = [unmergedInts.shift()];

  unmergedInts.forEach(nextInterval => {
    let prevInterval = mergedInts.pop();
    if (overlap(prevInterval, nextInterval)) {
      let merged = merge(prevInterval, nextInterval);
      mergedInts.push(merged);
    } else {
      mergedInts.push(prevInterval);
      mergedInts.push(nextInterval);
    }
  });

  return mergedInts;
}

function overlap(int1, int2) {
  if (int1[0] > int2[0]) [int1, int2] = [int2, int1];
  return int1[1] >= int2[0];
}

function merge(int1, int2) {
  return [Math.min(int1[0], int2[0]), Math.max(int1[1], int2[1])];
}


// Test cases
console.log(mergeIntervals([[1,3],[2,6],[8,10],[15,18]]));
// [[1,6],[8,10],[15,18]]

console.log(mergeIntervals([[1,4],[4,5]]));
// [[1,5]]

let input1 = [[1,3],[2,6],[8,10],[15,18]];
mergeIntervals(input1);
console.log(input1);  // [[1,3],[2,6],[8,10],[15,18]] (original array unchanged)

console.log(mergeIntervals([]));  // []

console.log(mergeIntervals([[1,4],[0,4]]));  // [[0,4]]

console.log(mergeIntervals([[1,4],[2,3]]));  // [[1,4]]

console.log(mergeIntervals([[1,4],[0,0]]));  // [[0,0],[1,4]]

console.log(mergeIntervals([[1,4],[4,5],[2,3],[5,6]]));  // [[1,6]]

let unsortedInput = [[1,3],[4,6],[2,5]];
console.log(mergeIntervals(unsortedInput));  // [[1,6]]

console.log(mergeIntervals([[1,2],[3,4],[5,6]]));  // [[1,2],[3,4],[5,6]]

console.log(mergeIntervals([[-1,0],[0,1],[2,3]]));  // [[-1,1],[2,3]]