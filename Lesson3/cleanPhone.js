"use strict";

// Write a program that cleans up user-entered phone numbers so that they can
// be sent as SMS messages. Other than digits, the number may also contain
// special character such as spaces, dash, dot, and parentheses that should
// be ignored.

// The rules are as follows:

// If the phone number is less than 10 digits, assume that it is a bad
// number.
// If the phone number is 10 digits, assume that it is good.
// If the phone number is 11 digits and the first number is 1, trim the 1
// and use the last 10 digits.
// If the phone number is 11 digits and the first number is not 1, then it
// is a bad number.
// If the phone number is more than 11 digits, assume that it is a bad
// number.
// For bad numbers, just a return a string of 10 0s.

/*
Input: string corresponding to phone number
Output: phone-number string, cleaned up OR '0000000000' if bad input

RULES:
-output should be 'cleaned' -- i.e. a 10 char string w/ only digits
-input can contain periods, parens, spaces, and dashes. These don't contribute
to the number being 'bad' but should be removed from the output
-if string is 11 digits and first is 1, remove 1 and return the other 10,
but cleaned

-BAD INPUT:
  -strings w/ less than 10 digits
  -strings more than 11 digits
  -strings of 11 digits and first digit is not 1
-GOOD INPUT:
  -strings of exactly 10 digits
  - strings w/ 11 digits but first is 1

QUESTIONS:
-What does 'cleaned' mean? Output should consist of all and only digits?
-What is the import of sending a string "as an SMS message"? What kinds of
strings can be sent that way?
-all other non-digit chars make the input bad? ("such as spaces..." suggests
not)
-what if no input?
-what if more than one argument?
-what if input is not a string?
-can assume digits are 0-9? (and we're not doing a hexadecimal thing)

TEST CASES:
*/
// good nums
// console.log(cleanPhoneNum('1234567890') === '1234567890');
// console.log(cleanPhoneNum('1234567890', true) === '1234567890');
// console.log(cleanPhoneNum('0000000000') === '0000000000');
// console.log(cleanPhoneNum('11234567890') === '1234567890');
// console.log(cleanPhoneNum('1-123-456-7890') === '1234567890');
// console.log(cleanPhoneNum('(123) 456-7890') === '1234567890');
// console.log(cleanPhoneNum('1-(123) 456-7890') === '1234567890');
// console.log(cleanPhoneNum('123.456.7890') === '1234567890');
// console.log(cleanPhoneNum(' )(.1...23.4(.. 56.7.---89.0') === '1234567890');

// // bad nums
// console.log(cleanPhoneNum('') === '0000000000');
// console.log(cleanPhoneNum() === '0000000000');
// console.log(cleanPhoneNum(null) === '0000000000');
// console.log(cleanPhoneNum(undefined) === '0000000000');
// console.log(cleanPhoneNum(1234567890) === '0000000000');
// console.log(cleanPhoneNum('12') === '0000000000');
// console.log(cleanPhoneNum('123456789') === '0000000000');
// console.log(cleanPhoneNum('21234567890') === '0000000000');
// console.log(cleanPhoneNum('01234567890') === '0000000000');
// console.log(cleanPhoneNum('1232353452143241234567890') === '0000000000');
// console.log(cleanPhoneNum('123412345166171234567890') === '0000000000');
// console.log(cleanPhoneNum('.(09)- 1...2() 34..56---78(90') === '0000000000');

/*
  DATA STRUCTURE:
  There are two tasks here: (i) cleaning the string, (ii) judging goodness

  cleaning a string is a good use for RegExp -- esp a method like replace()
  if i'm using replace, i'll be working with strings for that portion of the
  code.

  as for the best way to judge goodness, once the string is clean, that hinges
  on the LENGTH and the LEADING DIGIT. both of those facts can be assertained
  from a string directly w/o converting it to an array.

  So I think i'll work with strings for the entire function

  ALGORITHM:
  (0) Check for bad input -- if found, return relevant output
  (1) Clean string
    - use regex to find and replace all non-digits with ''
  (2a) Judge goodness
    - look at cleanedString.length:
      - if less than 10, bad
      - if more than 11, bad
      - if 10 good
      - if 11: good if cleanedString[0] === '1' otherwise bad
  (2b) Remove leading '1', as needed
    - cleanedString = cleanedString.slice(1);
  (3) Return cleaned string OR '00...'

  Doesn't look like i really need any helper methods
*/

function cleanPhoneNum(numString) {
  const OUTPUT_FOR_BAD_STRING = '0000000000';

  if (typeof numString !== 'string') return OUTPUT_FOR_BAD_STRING;

  let cleaned = numString.replace(/[^0-9]/g, '');
  let length = cleaned.length;

  if (length < 10 || length > 11) {
    return OUTPUT_FOR_BAD_STRING;
  } else if (length === 11 && cleaned[0] !== '1') {
    return OUTPUT_FOR_BAD_STRING;
  } else if (length === 11) {
    cleaned = cleaned.slice(1);
  }

  return cleaned;
}

// good nums
console.log(cleanPhoneNum('1234567890') === '1234567890');
console.log(cleanPhoneNum('1234567890', true) === '1234567890');
console.log(cleanPhoneNum('0000000000') === '0000000000');
console.log(cleanPhoneNum('11234567890') === '1234567890');
console.log(cleanPhoneNum('1-123-456-7890') === '1234567890');
console.log(cleanPhoneNum('(123) 456-7890') === '1234567890');
console.log(cleanPhoneNum('1-(123) 456-7890') === '1234567890');
console.log(cleanPhoneNum('123.456.7890') === '1234567890');
console.log(cleanPhoneNum(' )(.1...23.4(.. 56.7.---89.0') === '1234567890');

// bad nums
console.log(cleanPhoneNum('') === '0000000000');
console.log(cleanPhoneNum() === '0000000000');
console.log(cleanPhoneNum(null) === '0000000000');
console.log(cleanPhoneNum(undefined) === '0000000000');
console.log(cleanPhoneNum(1234567890) === '0000000000');
console.log(cleanPhoneNum('12') === '0000000000');
console.log(cleanPhoneNum('123456789') === '0000000000');
console.log(cleanPhoneNum('123456789a') === '0000000000');
console.log(cleanPhoneNum('21234567890') === '0000000000');
console.log(cleanPhoneNum('01234567890') === '0000000000');
console.log(cleanPhoneNum('1232353452143241234567890') === '0000000000');
console.log(cleanPhoneNum('123412345166171234567890') === '0000000000');
console.log(cleanPhoneNum('.(09)- 1...2() 34..56---78(90') === '0000000000');