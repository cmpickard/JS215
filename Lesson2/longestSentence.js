// Write a program that determines the sentence with the most words in some
// text. Sentences may end with periods (.), exclamation points (!), or
// question marks (?). Sentences begin with a word character and end with
// any of the following characters: ., !, or ?. Note that the sentence-ending
// characters are part of the sentence. Word characters may be any character
// other than , ., !, or ?. Within each sentence, words are delimited by
// one or more spaces. Log the longest sentence and its word count to the
// console. Pay attention to the expected output. Note that this problem
// is about manipulating and processing strings. As such, every detail about
// the string matters (e.g., case, punctuation, tabs, spaces, etc.).

// Post your solution as a Code Review in this lesson's forum.

// Example
// Copy Code
let longText = 'Four score and seven years ago our fathers brought forth' +
  ' on this continent a new nation, conceived in liberty, and' +
  ' dedicated to the proposition that all men are created' +
  ' equal.' +
  ' Now we are engaged in a great civil war, testing whether' +
  ' that nation, or any nation so conceived and so dedicated,' +
  ' can long endure. We are met on a great battlefield of that' +
  ' war. We have come to dedicate a portion of that field, as' +
  ' a final resting place for those who here gave their lives' +
  ' that that nation might live. It is altogether fitting and' +
  ' proper that we should do this.' +
  ' But, in a larger sense, we can not dedicate, we can not' +
  ' consecrate, we can not hallow this ground. The brave' +
  ' men, living and dead, who struggled here, have' +
  ' consecrated it, far above our poor power to add or' +
  ' detract. The world will little note, nor long remember' +
  ' what we say here, but it can never forget what they' +
  ' did here. It is for us the living, rather, to be dedicated' +
  ' here to the unfinished work which they who fought' +
  ' here have thus far so nobly advanced. It is rather for' +
  ' us to be here dedicated to the great task remaining' +
  ' before us -- that from these honored dead we take' +
  ' increased devotion to that cause for which they gave' +
  ' the last full measure of devotion -- that we here highly' +
  ' resolve that these dead shall not have died in vain' +
  ' -- that this nation, under God, shall have a new birth' +
  ' of freedom -- and that government of the people, by' +
  ' the people, for the people, shall not perish from the' +
  ' earth.';

// function longestSentence(text) {
//   // ...
// }

// longestSentence(longText);

// // console output
// It is rather for us to be here dedicated to the great task remaining
// before us -- that from these honored dead we take increased devotion to
// that cause for which they gave the last full measure of devotion -- that
// we here highly resolve that these dead shall not have died in vain -- that
// this nation, under God, shall have a new birth of freedom -- and that
// government of the people, by the people, for the people, shall not perish
// from the earth.

// The longest sentence has 86 words.


// // Assuming the last sentence is removed:

// longestSentence(longText);

// // console output
// Four score and seven years ago our fathers brought forth on this continent
// a new nation, conceived in liberty, and dedicated to the proposition that
// all men are created equal.

// The longest sentence has 30 words.

function longestSentence(text) {
  let sentences = separateIntoSentences(text);
  let longest = retrieveLongest(sentences);
  console.log(longest.text);
  console.log(`The longest sentence has ${longest.length} word(s)`);
}

function separateIntoSentences(text) {
  const SPLIT_MARK = '##||##';

  return text.replace(/([.?!]+)/g, `$1${SPLIT_MARK}`)
    .split(`${SPLIT_MARK}`)
    .map(sentence => {
      let trimmed = sentence.trim();
      let sentenceSummary = {text: trimmed, length: trimmed.split(/ +/).length};
      return sentenceSummary;
    });
}

function retrieveLongest(sentences) {
  return sentences.sort((a, b) => b.length - a.length)[0];
}

console.log(longestSentence(longText) === 86);
console.log(longestSentence('Hello there?! Are you my mother???! Please answer me.') === 4);
console.log(longestSentence('Hi. HI   THERE!') === 2);
console.log(longestSentence("The brown fox is superlative! To be or not to be?") === 6);
console.log(longestSentence("I!") === 1);
console.log(longestSentence("I! A! D! O!") === 1);
console.log(longestSentence("this sentence has no punctuation") === 5);
console.log(longestSentence("Hi\nthere!") === 1);
console.log(longestSentence("Hello \n world!") === 3);
console.log(longestSentence("Hello there %#$^ (hello)! What? Hello, there.") === 4);
console.log(longestSentence("Hello there! Why  not? Goodbye.") === 2);
console.log(longestSentence("$#@*$%, he mumbled. What's up?") === 3);