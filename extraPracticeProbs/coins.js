/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
// Problem: Coin Change
// You are given an integer array coins representing coins of different
// denominations and an integer amount representing a total amount of money.
// Return the fewest number of coins that you need to make up that amount.
// If that amount of money cannot be made up by any combination of the coins,
// return -1.
// You may assume that you have an infinite number of each kind of coin.

// Function Signature:

// function coinChange(coins, amount) {
//   // Your code here
// }
// Here are some test cases written in JavaScript to help you verify
// your solution:
// // javascript

// // Test Case 1: Basic case
// console.log(coinChange([1, 2, 5], 11) === 3); // 11 = 5 + 5 + 1

// // Test Case 2: Amount is 0
// console.log(coinChange([1, 2, 5], 0) === 0);

// // Test Case 3: No solution
// console.log(coinChange([2], 3) === -1);

// // Test Case 4: One coin denomination
// console.log(coinChange([1], 100) === 100);

// // Test Case 5: Multiple solutions, should return minimum
// console.log(coinChange([1, 2, 5], 100) === 20); // 100 = 5 * 20

// // Test Case 6: Large amount
// console.log(coinChange([186, 419, 83, 408], 6249) === 20);

// // Test Case 7: Greedy approach won't work
// console.log(coinChange([1, 3, 4], 6) === 2); // 6 = 3 + 3, not 4 + 1 + 1

// // Test Case 8: All denominations larger than amount
// console.log(coinChange([5, 10, 25], 3) === -1);

/*
input: array of positive ints that represent the value of coins we have,
AND a value that we're trying create from the coins

output: the min number (pos int) of coins that could be used to create the value

rules:
- assume we have an infinite number of each denomination
- if the number can't be built from the given denoms, return -1
- the number returned should correspond to the smallest number of coins that
could be combined to make the given amount
- amount can be 0, if so return 0, regardless of available denoms

Qs:
- amount can be neg?

Data Structure?
*/