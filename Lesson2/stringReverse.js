// Implement a function that takes a string as an argument and returns a new
// string that contains the original string in reverse.

// function reverse(string) {
//   // ...
// }

// reverse('hello');                  // returns "olleh"
// reverse('The quick brown fox');    // returns "xof nworb kciuq ehT"

function reverse(string) {
  return [...string].reverse().join('');
}

function reverse2(string) {
  let result = '';
  for (let idx = string.length - 1; idx >= 0; idx--) {
    result += string[idx];
  }

  return result;
}

console.log(reverse('hello'));
console.log(reverse('The quick brown fox'));

console.log(reverse2('hello'));
console.log(reverse2('The quick brown fox'));