// Problem: Island Perimeter
// You are given a 2D grid map of '1's (land) and '0's (water). An island is a
// group of '1's (land) connected horizontally or vertically (not diagonally).
// The grid is completely surrounded by water, and there is exactly one island
// (i.e., one or more connected land cells).
// The island doesn't have "lakes", meaning the water inside isn't connected
// to the water around the island. One cell is a square with side length 1.
// The grid is rectangular, width and height don't exceed 100. Determine the
// perimeter of the island.

// Function Signature:
// def island_perimeter(grid):
//     # Your code here
// Example:
// Input:
// [
//   [0,1,0,0],
//   [1,1,1,0],
//   [0,1,0,0],
//   [1,1,0,0]
// ]
// Output: 16
// Explanation: The perimeter is the 16 yellow stripes in the image below:

/*
input: a 2D array representing a sq grid map, with 1's as land and 0's as sea
output: a positive integer presenting the perimeter of the "land" area

rules:
- there will always be exactly 1 land area -- implying, we will always receive
a 2D array. it will always have just 0s and 1s. and there will always be at
least a single 1
- the land will never contain a lake
- two 1s count as connected if they are horizontally or vertically adjacent (but
not if they are diagonally adjacent)
- each sq in the map has side length 1
- the return value is the int perimeter of the land mass
- grid is rectangular, but neither height nor width can exceed 100

algorithm-directed rules:
suppose:
  0000
  0110
this island has a perimeter of 6.
  -for each 1 on the map, we look at all 4 sides. If the side is against an
  edge, the perimeter is +1; if the side is against a zero, the perimeter is +1,
  and if the side is against another 1, the perimeter is +0.
  - the only works b/c of the no-lakes rule.

questions:
-?none so far

data structure:
stick with the 2D array, but use a number to keep track of sides

algorithm:
- let perimeter = 0;
- iterate through each row
  -for each row, iterate through each square (currSquare):
    -for currSquare, check how many open sides there are, if currSquare === 1
      HELPER FUNCTION: countSides(squareRow, squareCol, grid)
        => return num between 0 and 4
      --add return value to perimeter
- return perimeter

countSides(squareRow, squareCol, grid)
  - the input "square" needs to include the row and col number of the currSquare
    e.g. [0, 1] for first row, second col
  - check the squares to the left, right, top, and bottom
      left = squareRow, squareCol - 1
      right = squareRow, squareCol + 1
      top = squareRow - 1, squareCol
      bottom = squareRow + 1, squareCol
    grab those four elements -- put them into an array
    filter array: element !== 1
    return filterArray.length
testcase:
  [1, 1],
  [1, 0]
rowIdx = 0
colIdx = 0
square is 1, so countSides(rowIdx, colIdx, grid)
  left = grid[0][-1] => undefined
  right = grid[0][1] => 1
  top = grid[-1][0] => undefined
  bottom = grid[1][0] => 1
  [left, right, top, bottom].filter( el !== 1) => [left, top]
  => return 2
*/

function islandPerimeter(grid) {
  let perimeter = 0;
  grid.forEach((row, rowIdx) => {
    row.forEach((squareNum, colIdx) => {
      if (squareNum === 1) {
        perimeter += countSides(rowIdx, colIdx, grid);
      }
    });
  });

  return perimeter;
}

function countSides(sqRow, sqCol, grid) {
  let left = grid[sqRow][sqCol - 1];
  let right = grid[sqRow][sqCol + 1];
  let up = grid[sqRow - 1] === undefined ? undefined : grid[sqRow - 1][sqCol];
  let down = grid[sqRow + 1] === undefined ? undefined : grid[sqRow + 1][sqCol];
  return [left, right, up, down].filter(side => side !== 1).length;
}

let grid1 = [
  [0,1,0,0],
  [1,1,1,0],
  [0,1,0,0],
  [1,1,0,0]
];

let grid2 = [
  [0,1,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
];

let grid3 = [
  [1,1,1,1],
  [1,1,1,1],
  [1,1,1,1],
  [1,1,1,1]
];

let grid4 = [
  [0,1,1,0],
  [1,1,1,1],
  [1,1,1,1],
  [0,1,1,0]
];

let grid5 = [
  [1, 1],
  [1, 0]
];

console.log(islandPerimeter(grid1) === 16);
console.log(islandPerimeter(grid2) === 4);
console.log(islandPerimeter(grid3) === 16);
console.log(islandPerimeter(grid4) === 16);
console.log(islandPerimeter(grid5) === 8);