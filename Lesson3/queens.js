// In the game of chess, a queen can attack pieces which are on the same row,
// column, or diagonal. Positions on the board equate to coordinate numbers.
// Given a set up like so:

// _ _ _ _ _ _ _ _
// _ _ _ _ _ _ _ _
// _ _ _ W _ _ _ _
// _ _ _ _ _ _ _ _
// _ _ _ _ _ _ _ _
// _ _ _ _ _ _ B _
// _ _ _ _ _ _ _ _
// _ _ _ _ _ _ _ _
// The white queen's position equates to (2, 3) and the black queen is at (5, 6)
// In this example the queens are on the same diagonal, and therefore can
// attack each other.

// Write a function which, given a string representation of the board with the
// two queens, returns true or false depending on whether the queens can attack
// each other or not.

/* PROBLEM:
INPUT: string representation of the board
What will the string representation look like? Like underscores and letters with
each row separated by a newline char? is it always 8 X 8? only queens on board?
how will queens be represented?
always two queens?
-- NO! we can get only one queen, or none
OUTPUT: boolean -- true if they can attack, false otherwise. return undefined
if there are zero or one queen.

RULES:
The queens' positions will be marked out with the characters 'W' and 'B'?
  always? and the empty spaces will always be _?

The coordinate system desc in the problem is zero-indexed and the order is,
(row, col) -- the origin is top-left
Queens on same row can attack -- same first coordinate
Queens on same column can attack -- same second coordinate
Queens on same *diagonal* can attack.
-- What constitutes the 'same diagonal'?
  In the example, one Q is at (2, 3) and the other is at (5, 6)
  They are on the "same diagonal" because to move from one to the other, we
  need to go n spaces over and then n spaces down.
  Probably, that's the formal property that 'same diagonal' will take?
  like, abs(queen1.row - queen2.row) === abs(queen1.col - queen2.col)
  The number of rows they are apart is also the number of column they are apart

*/

// TEST CASES
// attack
let test1 =
'________\n' +
'________\n' +
'___W____\n' +
'________\n' +
'________\n' +
'______B_\n' +
'________\n' +
'________\n';

let test1Half =
'_______W\n' +
'________\n' +
'________\n' +
'________\n' +
'________\n' +
'________\n' +
'________\n' +
'B_______\n';

let test2 =
'________\n' +
'________\n' +
'___W___B\n' +
'________\n' +
'________\n' +
'________\n' +
'________\n' +
'________\n';

let test2Half =
'________\n' +
'________\n' +
'___WB___\n' +
'________\n' +
'________\n' +
'________\n' +
'________\n' +
'________\n';

let test3 =
'________\n' +
'________\n' +
'___W____\n' +
'________\n' +
'________\n' +
'________\n' +
'________\n' +
'___B____\n';

// no attack
let test4 =
'W_______\n' +
'________\n' +
'_______B\n' +
'________\n' +
'________\n' +
'________\n' +
'________\n' +
'________\n';

let test5 =
'________\n' +
'________\n' +
'___W____\n' +
'_____B__\n' +
'________\n' +
'________\n' +
'________\n' +
'________\n';

// edge cases
let test6 =
'________\n' +
'________\n' +
'________\n' +
'________\n' +
'________\n' +
'________\n' +
'________\n' +
'__W_____\n';

let test7 =
'________\n' +
'________\n' +
'________\n' +
'________\n' +
'________\n' +
'________\n' +
'________\n' +
'________\n';

let test8 =
'B_______\n' +
'________\n' +
'________\n' +
'________\n' +
'________\n' +
'________\n' +
'________\n' +
'________\n';

// happy path tests
console.log(queenAttack(test1) === true);
console.log(queenAttack(test1Half) === true);
console.log(queenAttack(test2) === true);
console.log(queenAttack(test2Half) === true);
console.log(queenAttack(test3) === true);
console.log(queenAttack(test4) === false);
console.log(queenAttack(test5) === false);

// edge case tests
console.log(queenAttack(test6) === undefined);
console.log(queenAttack(test7) === undefined);
console.log(queenAttack(test8) === undefined);

// DATA STRUCTURES:
/*
  seemingly, what matters is (a) being able to pull the row/col numbers for each
  piece from the input string after (b) checking that both pieces are present.
  if that's right, then either two arrays or a nested array [[], []] should
  work for storing those key values. The order of the piece locations shouldn't
  matter, but i don't want to add values to the wrong place in teh data struct.
  Maybe, we use push() to push a location array into our nested array

  Then we can perform comparisons between the rows / cols to make our decision.
*/

// ALGORITHM:
/*
  First, check that both pieces are present in the input string.
    -- if not, return undefined
  Second, calculate the row / col value for each piece
  Third, compare the resulting numbers to check if,
    -- same row OR
    -- same col OR
    -- same diagonal
  return true if any of those checks come back true
  false otherwise

~~~~~Piece check:
  assuming that the pieces will always be labelled 'B' and 'W', we can use
  a regex or string.includes() to verify that both are present.
  // if(!board.includes('B') || !board.includes('W)) return undefined;

~~~~~Calc row/col:
  create our data structure
  // let locations = [];
  Split the string along newline character to get an array of rows?
  Maybe we can use indexOf on each iteration to find our pieces
  So, iterate through the rows, looking for the pieces. Use the idx param to
  keep track of which row we're on -- so we can use that value when we find a
  piece for it's row number

  For each row, use indexOf twice to find the index of the W or B, in case they
  are both on the row.
  Check whether the return value for the two indexOf calls is -1.
  If not, then store the location as [idx, indexOf return value]
  and push that array into our locations datastructure

// let rows = board.split('/n');
// rows.forEach((row, rowIdx) => {
//   let whiteCol = indexOf('B');
//   let blackCol = indexOf('B');
//   if (whiteCol !== -1) {
//     locations.push([rowIdx, whiteCol]);
//   }

//   if (blackCol !== -1) {
//     locations.push([rowIdx, blackCol]);
//   }
// });

~~~~~~Compute Result
start by calc diff between row values and col values

let rowDiff = Math.abs(locations[0][0] - locations[1][0]);
let colDiff = Math.abs(locations[0][1] - locations[1][1]);

Then check each possibility:
ROW CHECK
check if rowDiff === 0;

COL CHECK
check if colDiff === 0;

DIAG CHECK
check if rowDiff === colDiff;

// let rowDiff = Math.abs(locations[0][0] - locations[1][0]);
// let colDiff = Math.abs(locations[0][1] - locations[1][1]);
// if (rowDiff === 0 || colDiff === 0 || (rowDiff === colDiff)) return true;
// return false;

*/

function queenAttack(board) {
  if (!(board.includes('B') && board.includes('W'))) return undefined;

  let rows = board.split('\n');
  let locations = extractPositions(rows);

  return comparePieces(locations);
}

function comparePieces(locations) {
  let rowDiff = Math.abs(locations[0][0] - locations[1][0]);
  let colDiff = Math.abs(locations[0][1] - locations[1][1]);

  if (rowDiff === 0 || colDiff === 0 || (rowDiff === colDiff)) return true;
  return false;
}

function extractPositions(rows) {
  let locations = [];

  rows.forEach((row, rowIdx) => {
    let whiteCol = row.indexOf('W');
    let blackCol = row.indexOf('B');

    if (whiteCol !== -1) {
      locations.push([rowIdx, whiteCol]);
    }

    if (blackCol !== -1) {
      locations.push([rowIdx, blackCol]);
    }
  });
  return locations;
}