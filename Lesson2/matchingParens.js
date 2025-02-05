// Write a function that takes a string as an argument and returns true if the
// string contains properly balanced parentheses, false otherwise. Parentheses
// are properly balanced only when '(' and ')' occur in matching pairs, with
// each pair starting with '('.

//   isBalanced('What (is) this?');        // true
//   isBalanced('What is) this?');         // false
//   isBalanced('What (is this?');         // false
//   isBalanced('((What) (is this))?');    // true
//   isBalanced('((What)) (is this))?');   // false
//   isBalanced('Hey!');                   // true
//   isBalanced(')Hey!(');                 // false
//   isBalanced('What ((is))) up(');       // false

function isBalanced(string) {
  let count = 0;
  let chars = [...string];
  for (let char of chars) {
    if (char === '(') {
      count += 1;
    } else if (char === ')') {
      count -= 1;
    }
    if (count < 0) return false;
  }

  return (count === 0);
}

console.log(isBalanced('What (is) this?'));        // true
console.log(isBalanced('What is) this?'));         // false
console.log(isBalanced('What (is this?'));         // false
console.log(isBalanced('((What) (is this))?'));    // true
console.log(isBalanced('((What)) (is this))?'));   // false
console.log(isBalanced('Hey!'));                   // true
console.log(isBalanced(')Hey!('));                 // false
console.log(isBalanced('What ((is))) up('));       // false