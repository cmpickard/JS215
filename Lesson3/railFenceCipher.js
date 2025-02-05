"use strict";
/* eslint-disable max-len */
// Implement encoding and decoding for the rail fence cipher.

// The Rail Fence cipher is a form of transposition cipher that gets its name
// from the way in which it's encoded. It was already used by the ancient Greeks

// In the Rail Fence cipher, the message is written downwards on successive
// "rails" of an imaginary fence, then moving up when we get to the bottom
// (like a zig-zag). Finally the message is then read off in rows.

// For example, using three "rails" and the message "WE ARE DISCOVERED FLEE
// AT ONCE", the cipherer writes out:

// W . . . E . . . C . . . R . . . L . . . T . . . E
// . E . R . D . S . O . E . E . F . E . A . O . C .
// . . A . . . I . . . V . . . D . . . E . . . N . .
// Then reads off:

// WECRLTEERDSOEEFEAOCAIVDEN
// To decrypt a message you take the zig-zag shape and fill the ciphertext
// along the rows.

// Copy Code
// ? . . . ? . . . ? . . . ? . . . ? . . . ? . . . ?
// . ? . ? . ? . ? . ? . ? . ? . ? . ? . ? . ? . ? .
// . . ? . . . ? . . . ? . . . ? . . . ? . . . ? . .
// The first row has seven spots that can be filled with "WECRLTE".

// Copy Code
// W . . . E . . . C . . . R . . . L . . . T . . . E
// . ? . ? . ? . ? . ? . ? . ? . ? . ? . ? . ? . ? .
// . . ? . . . ? . . . ? . . . ? . . . ? . . . ? . .
// Now the 2nd row takes "ERDSOEEFEAOC".

// W . . . E . . . C . . . R . . . L . . . T . . . E
// . E . R . D . S . O . E . E . F . E . A . O . C .
// . . ? . . . ? . . . ? . . . ? . . . ? . . . ? . .
// Leaving "AIVDEN" for the last row.

// W . . . E . . . C . . . R . . . L . . . T . . . E
// . E . R . D . S . O . E . E . F . E . A . O . C .
// . . A . . . I . . . V . . . D . . . E . . . N . .
// If you now read along the zig-zag shape you can read the original message.


/*
2 FUNCTIONS: encodeRailCipher / decodeRailCipher

ENCODE:
input: assume string
output: string
rules:
-input is a string of words with all white space removed? OR do i remove white
space myself
-each letter is written on the "next" of three rails in a repeating pattern.
-"Next" rail rules:
  -1st on 1st
  -2nd on 2nd
  -3rd on 3rd
  -4th on 2nd
  -5th on 1st
Thus, we get a 4-step cycle: 1,2,3,2...
- that pattern keeps going until we run out of letters
- the final encoded message just concats rail1 to rail2 to rail3

- what about no input?
- too much input?
- empty string?
- non-string input?
- all caps?


pattern:
remainder 0: quo / 2*quo / quo
remainder 1: quo + 1 / 2*qup / quo
remainder 2: quo + 1 / 2*qup + 1 / quo
remainder 3: quo + 1 / 2*qup + 1 / quo + 1

DECODE:
input: assume string
output: string

-rules:
- there's no good way for me to add spaces back between words, so string will
be returned w/o spaces

-on average the middle rail has ~2X more letters than the top /
bottom rails.
We should be able to calculate exactly how many letter are on each rail by
considering the result of dividing the num letter by 4. e.g.
TWELVELETTER =>
  T  V  T
  W L E E T R
  E    L   E
TVTWLEETRELE
12 / 4 = (3 remainder 0)
  => 3 / 6 / 3 => quotient / 2X quotient / quotient

13 / 4 = (3 remainder 1)
  => 4 / 6/ 3 => quotient + 1 / 2X quotient / quotient

14 / 4 = (3 remainder 2)
  => 4 / 7 /3 => quotient + 1 / 2X quotient + 1 / quotient

15 /4 = (3 remainder 3)
  => 4 / 7/ 4 => quotient + 1 / 2X quotient + 1 / quotient


TEST CASES
*/

// console.log(decodeRailCipher('') === '');
// console.log(encodeRailCipher('') === '');
// console.log(decodeRailCipher('A') === 'A');
// console.log(encodeRailCipher('A') === 'A');
// console.log(decodeRailCipher('ARM') === 'ARM');
// console.log(encodeRailCipher('ARM') === 'ARM');
// console.log(decodeRailCipher('GDOO') === 'GOOD');
// console.log(encodeRailCipher('GOOD') === 'GDOO');
// console.log(decodeRailCipher('TVTWLEETRELE') === 'TWELVELETTER');
// console.log(encodeRailCipher('TWELVELETTER') === 'TVTWLEETRELE');
// console.log(decodeRailCipher('WECRLTEERDSOEEFEAOCAIVDEN') === 'WEAREDISCOVEREDFLEEATONCE');
// console.log(encodeRailCipher('WEAREDISCOVEREDFLEEATONCE') === 'WECRLTEERDSOEEFEAOCAIVDEN');

/*
DATA STRUCTURE
string and arrays.
encode: will use an array for each rail and a multid array of the rails for
adding chars

decode: will use strings and nums. i'll find the quotient and remainder of
dividing the input length by 4, then use slice and concat

ALGORITHM:
--encode:
(0) validate input
(1) create three rail vars, each an array
(2) create multiD array with rails organized like this,
  [rail1, rail2, rail3, rail2]
(3) turn input string into array of chars and iterate through w/ index.
  (a) array[index % 4].push(currLetter)

(4) return rail1 + rail2 + rail3 -- each joined to a string

--decode:
(0) validate input
(1) quotient = cipher.length / 4; remainder = cipher.length % 4;
(2) rail1 = cipher.slice(0, rail1length)
    rail2 = cipher.slice(rail1length, (rail2length + rail1length))
    rail3 = cipher.slice(rail1length + rail2length)
initialize result var
(3) loop from 0 to cipher.length, on each loop,
  () check remainder of loop var % 4, if 1 or 3 grab first char of rail 2,
   if 0 grab first char of rail 1, else rail 3
   () replace the rail used with railUsed.slice(1)
(4) return result var
*/


function decodeRailCipher(cipher) {
  if (typeof cipher !== 'string' || cipher === '') return '';
  let [rail1length, rail2length] = calcRailLengths(cipher);

  let rail1 = cipher.slice(0, rail1length);
  let rail2 = cipher.slice(rail1length, rail1length + rail2length);
  let rail3 = cipher.slice(rail1length + rail2length);

  return findPlaintextInRails(cipher, rail1, rail2, rail3);
}

function findPlaintextInRails(cipher, rail1, rail2, rail3) {
  let plaintext = '';

  for (let idx = 0; idx < cipher.length; idx++) {
    let cycle = idx % 4;
    if (cycle === 1 || cycle === 3) {
      plaintext += rail2.slice(0,1);
      rail2 = rail2.slice(1);
    } else if (cycle === 0) {
      plaintext += rail1.slice(0,1);
      rail1 = rail1.slice(1);
    } else {
      plaintext += rail3.slice(0,1);
      rail3 = rail3.slice(1);
    }
  }

  return plaintext;
}

function calcRailLengths(cipher) {
  let quotient = Math.floor(cipher.length / 4);
  let remainder = cipher.length % 4;
  let rail1length = quotient;
  let rail2length = 2 * quotient;

  if (remainder === 3 || remainder === 2) {
    rail1length += 1;
    rail2length += 1;
  } else if (remainder === 1) {
    rail1length += 1;
  }

  return [rail1length, rail2length];
}

function encodeRailCipher(plaintext) {
  if (typeof plaintext !== 'string' || plaintext === '') return '';

  let rail1 = [];
  let rail2 = [];
  let rail3 = [];
  let rails = [rail1, rail2, rail3, rail2];
  [...plaintext].forEach((char, idx) => {
    rails[idx % 4].push(char);
  });

  return rail1.join('') + rail2.join('') + rail3.join('');
}


console.log(decodeRailCipher('') === '');
console.log(encodeRailCipher('') === '');
console.log(decodeRailCipher('A') === 'A');
console.log(encodeRailCipher('A') === 'A');
console.log(decodeRailCipher('ARM') === 'ARM');
console.log(encodeRailCipher('ARM') === 'ARM');
console.log(decodeRailCipher('GODO') === 'GOOD');
console.log(encodeRailCipher('GOOD') === 'GODO');
console.log(decodeRailCipher('TVTWLEETRELE') === 'TWELVELETTER');
console.log(decodeRailCipher('LSEUGTO') === 'LETUSGO');
console.log(encodeRailCipher('TWELVELETTER') === 'TVTWLEETRELE');
console.log(decodeRailCipher('WECRLTEERDSOEEFEAOCAIVDEN') === 'WEAREDISCOVEREDFLEEATONCE');
console.log(encodeRailCipher('WEAREDISCOVEREDFLEEATONCE') === 'WECRLTEERDSOEEFEAOCAIVDEN');