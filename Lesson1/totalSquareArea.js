// For this practice problem, we'll represent rectangles as Arrays with two
// elements: a height and a width.

// Write a Function named totalArea that takes an Array of rectangles as an
// argument. The Function should return the total area covered by all the
// rectangles.

// let rectangles = [[3, 4], [6, 6], [1, 8], [9, 9], [2, 2]];

// totalArea(rectangles);    // 141
// Thinking in Abstractions

function totalArea(rectangles) {
  // first map for array with list of areas
  let areas = rectangles.map(([side1, side2]) => side1 * side2);
  // then reduce to sum the array
  return areas.reduce((sum, num) => sum + num);
}

let rectangles = [[3, 4], [6, 6], [1, 8], [9, 9], [2, 2]];
console.log(totalArea(rectangles));

// Now, write a second Function named totalSquareArea. This Function should
// calculate the total area of a set of rectangles, just like totalArea.
// However, it should only include squares in its calculations: it should
// ignore rectangles that aren't square.

// let rectangles = [[3, 4], [6, 6], [1, 8], [9, 9], [2, 2]];

// totalSquareArea(rectangles);    // 121

function totalSquareArea(rectangles) {
  // first filter to remove non-squares
  let squares = rectangles.filter(([side1, side2]) => side1 === side2);
  // second map to calc area of each square
  let areas = squares.map(([side1, side2]) => side1 * side2);
  // third return reduce to sum up areas
  return areas.reduce((sum, num) => sum + num);
}

let rectangles2 = [[3, 4], [6, 6], [1, 8], [9, 9], [2, 2]];

console.log(totalSquareArea(rectangles2));    // 121