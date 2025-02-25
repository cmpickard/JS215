// We have the following Array of information for some popular bands:

// Copy Code
// let bands = [
//   { name: 'sunset rubdown', country: 'UK', active: false },
//   { name: 'women', country: 'Germany', active: false },
//   { name: 'a silver mt. zion', country: 'Spain', active: true },
// ];
// There are problems with this data, though, so we first have to clean it up
// before we can use it:

// The band countries are wrong: all the bands should have 'Canada' as the
// country.
// The band name should have all words capitalized.
// Remove all dots from the band names.
// Write a function that can process the input band Array and return an Array
// that contains the fixed information:

// let bands = [
//   { name: 'sunset rubdown', country: 'UK', active: false },
//   { name: 'women', country: 'Germany', active: false },
//   { name: 'a silver mt. zion', country: 'Spain', active: true },
// ];

// function processBands(data) {
//   // ...
// }

// processBands(bands);

// // should return:
// [
//   { name: 'Sunset Rubdown', country: 'Canada', active: false },
//   { name: 'Women', country: 'Canada', active: false },
//   { name: 'A Silver Mt Zion', country: 'Canada', active: true },
// ]


// change country to canada
// capitalize all words in name
// remove '.' from names

// use 3 forEach calls on a cloned copy of the array, mutating the values
function processBands(bands) {
  let bandMaps = objectArrToMapArr(bands);
  bandMaps.forEach(fixBand);
  return mapArrToObjectArr(bandMaps);
}

function fixBand(bandMap) {
  let currName = bandMap.get('name');
  currName = currName.split(' ').map(word => {
    word = word.replace(/\./, '');
    return word[0].toUpperCase() + word.slice(1);
  }).join(' ');

  bandMap.set('name', currName);
  bandMap.set('country', 'Canada');
}

function objectArrToMapArr(objectArr) {
  let mapArr = [];
  objectArr.forEach(object => {
    let map = new Map();
    Object.entries(object).forEach(([key, val]) => map.set(key, val));
    mapArr.push(map);
  });

  return mapArr;
}

function mapArrToObjectArr(mapArr) {
  return mapArr.map(map => Object.fromEntries(map.entries()));
}

let bands = [
  { name: 'sunset rubdown', country: 'UK', active: false },
  { name: 'women', country: 'Germany', active: false },
  { name: 'a silver mt. zion', country: 'Spain', active: true },
];

console.log(processBands(bands));