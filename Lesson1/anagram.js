// Write a Function named anagram that takes two arguments: a word and an array
// of words. Your function should return an array that contains all the words
// from the array argument that are anagrams of the word argument. For example,
// given the word "listen" and an array of candidate words like "enlist",
// "google", "inlets", and "banana", the program should return an array that
// contains "enlist" and "inlets".

// Examples
// Copy Code
// function anagram(word, list) {
//   // ...
// }

// anagram('listen', ['enlists', 'google', 'inlets', 'banana']);
// // [ "inlets" ]
// anagram('listen', ['enlist', 'google', 'inlets', 'banana']);
// // [ "enlist", "inlets" ]

// output: subset of list (though, not mutated)
// FILTER: remove non-anagrams, return result
// how-to-filter: check if [...currWord].sort().join() === word.sort() etc?

function anagram(word, list) {
  return list.filter(currWord => areAnagrams(word, currWord));
}

function areAnagrams(word1, word2) {
  return [...word1].sort().join('') === [...word2].sort().join('');
}

console.log(anagram('listen', ['enlists', 'google', 'inlets', 'banana']));
// [ "inlets" ]
console.log(anagram('listen', ['enlist', 'google', 'inlets', 'banana']));
// [ "enlist", "inlets" ]
