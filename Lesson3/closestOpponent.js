// Write a function that returns the position of the closest active opponent.
// If two opponents are equidistant, return the opponent with the higher
// position on the board.

// Examples / Test Cases
// function findClosestOpponent(positions, position) {
//   // ...
// }

// console.log(findClosestOpponent({
//   "Opponent 1" : 1,
//   "Opponent 2" : 15,
//   "Opponent 3" : 37
// }, 10)); // 15

// console.log(findClosestOpponent({
//   "Opponent 1a" : 1,
//   "Opponent 1b" : 5
// }, 3)); // 5

// console.log(findClosestOpponent({
//   "Opponent 1a" : 1, "Opponent 1b" : 5,
//   "Opponent 1c" : 50, "Opponent 1d" : 100, "Opponent 1e" : null
// }, 150)); // 100

/*
input: object with opponent names as keys and integer positions as values +
integer representing "current position"
output: integer representing position of closest opponent

rules:
-return int position of closest opponent, from list in input object
-if two opponents are equidistant return the one with larger position value
-maybe imagine all pieces positioned on a number line. we're trying to find the
piece closest to ours on that number line.
-if object empty, return null
-object keys can be whatever strings
-only 'active' opponents can have their position returned. all inactive opponent
have position of null
-there will always be one active opponent, if there is one or more inactive
opponents
-two pieces can never share the same position

questions:
-what do if no input? if 1 input? if 3+ input?
-what do if input(s) wrong type?
-what do if object empty?
- can positions be negative? NaN? Infinity?
- i see a null position. what does that mean? if that is the only opponent, do
they count as 'closest' or nah?
- can a position be undefined? false? 'no'? what would those positions mean?
- the opponent names don't seem to have any significance. is that right?
- what if an opponent has the same position as me? can that happen?

TEST CASES:
*/

// console.log(findClosestOpponent({
//   "Opponent 1" : 1,
//   "Opponent 2" : 15,
//   "Opponent 3" : 37
// }, 10)); // 15

// console.log(findClosestOpponent({
//   "Opponent 1a" : 1,
//   "Opponent 1b" : 5
// }, 3)); // 5

// console.log(findClosestOpponent({
//   "Opponent 1a" : 0,
//   "Opponent 1b" : 2
// }, 0)); // ???

// console.log(findClosestOpponent({}, 10)); // null

// console.log(findClosestOpponent({
//   "Atlas" : 1,
//   "Luna" : 15,
//   "" : 37
// }, 10)); // 15

// console.log(findClosestOpponent({
//   "Opponent 1a" : 1, "Opponent 1b" : 5,
//   "Opponent 1c" : 50, "Opponent 1d" : 100, "Opponent 1e" : null
// }, 150)); // 100

// console.log(findClosestOpponent({
//   "Opponent 1a" : null, "Opponent 1b" : 5, "Opponent 1c" : null,
//   "Opponent 1d" : null, "Opponent 1e" : 200, "Opponent 1f" : 400
// }, 300)); // 400

/*
DATASTRUCTURE:
i need to calculate the absolute val of the distance between my piece and every
other piece in the input object, then find the min and return the position of
the min piece.

that means i need to keep the distance vals tied to the position vals, so that
i know which position corresponded to the max distance val

maybe i can write a custom sort method that sorts the opponents by distance, asc

that would be called on and return an array
maybe use Object.values or Object.entries

ALGORITHM:
(0) validate input
(1) allPositions array from Object.values(positions)
(2) use map. for each position in allPositions:
  -let distance = Math.abs(myPosition - currPosition)
  - return {position: currPosition, distance: distance}
(3) sort by distance, ascending
  (a)for ties check which has larger position value
(4) return first element of sorted array
*/

function findClosestOpponent(positions, myPosition) {
  if (Object.keys(positions).length === 0) return null;

  let allPositions = Object.values(positions);
  allPositions = allPositions.map((currPosition) => {
    let distance = Math.abs(myPosition - currPosition);
    return {position: currPosition, distance: distance};
  });

  return allPositions.sort(sortByDistance)[0].position;
}

function sortByDistance(pos1, pos2) {
  if (pos1.distance < pos2.distance) {
    return -1;
  } else if (pos1.distance > pos2.distance) {
    return 1;
  } else {
    return (pos1.position > pos2.position) ? -1 : 1;
  }
}

console.log(findClosestOpponent({
  "Opponent 1" : 1,
  "Opponent 2" : 15,
  "Opponent 3" : 37
}, 10)); // 15

console.log(findClosestOpponent({
  "Opponent 1a" : 1,
  "Opponent 1b" : 5
}, 3)); // 5

console.log(findClosestOpponent({}, 10)); // null

console.log(findClosestOpponent({
  "Atlas" : 1,
  "Luna" : 15,
  "" : 37
}, 10)); // 15

console.log(findClosestOpponent({
  "Opponent 1a" : 1, "Opponent 1b" : 5,
  "Opponent 1c" : 50, "Opponent 1d" : 100, "Opponent 1e" : null
}, 150)); // 100

console.log(findClosestOpponent({
  "Opponent 1a" : null, "Opponent 1b" : 5, "Opponent 1c" : null,
  "Opponent 1d" : null, "Opponent 1e" : 200, "Opponent 1f" : 400
}, 300)); // 400