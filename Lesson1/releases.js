// Write a Function named processReleaseData that processes the following
// movie release data:

// let newReleases = [
//   {
//     'id': 70111470,
//     'title': 'Die Hard',
//     'boxart': 'http://cdn-0.nflximg.com/images/2891/DieHard.jpg',
//     'uri': 'http://api.netflix.com/catalog/titles/movies/70111470',
//     'rating': [4.0],
//     'bookmark': [],
//   },
//   {
//     'id': 654356453,
//     'boxart': 'http://cdn-0.nflximg.com/images/2891/BadBoys.jpg',
//     'uri': 'http://api.netflix.com/catalog/titles/movies/70111470',
//     'rating': [5.0],
//     'bookmark': [{ id:432534, time:65876586 }],
//   },
//   {
//     'title': 'The Chamber',
//     'boxart': 'http://cdn-0.nflximg.com/images/2891/TheChamber.jpg',
//     'uri': 'http://api.netflix.com/catalog/titles/movies/70111470',
//     'rating': [4.0],
//     'bookmark': [],
//   },
//   {
//     'id': 675465,
//     'title': 'Fracture',
//     'boxart': 'http://cdn-0.nflximg.com/images/2891/Fracture.jpg',
//     'uri': 'http://api.netflix.com/catalog/titles/movies/70111470',
//     'rating': [5.0],
//     'bookmark': [{ id:432534, time:65876586 }],
//   },
// ];
// The Function should generate an Array of Objects that contain only the id
// and title key/value pairs. You may assume that id and title, when existing,
// is an integer greater than 0 and non-empty string respectively.
// Here are the rules:

// Keep only releases that have both id and title property present.
// Keep only the id and title data for each release.

// function processReleaseData(data) {
//   // ...
// }

// processReleaseData(newReleases);

// // should return:
// [{ id: 70111470, title: 'Die Hard'}, { id: 675465, title: 'Fracture' }];

let newReleases = [
  {
    id: 70111470,
    title: 'Die Hard',
    boxart: 'http://cdn-0.nflximg.com/images/2891/DieHard.jpg',
    uri: 'http://api.netflix.com/catalog/titles/movies/70111470',
    rating: [4.0],
    bookmark: [],
  },
  {
    id: 654356453,
    boxart: 'http://cdn-0.nflximg.com/images/2891/BadBoys.jpg',
    uri: 'http://api.netflix.com/catalog/titles/movies/70111470',
    rating: [5.0],
    bookmark: [{ id:432534, time:65876586 }],
  },
  {
    title: 'The Chamber',
    boxart: 'http://cdn-0.nflximg.com/images/2891/TheChamber.jpg',
    uri: 'http://api.netflix.com/catalog/titles/movies/70111470',
    rating: [4.0],
    bookmark: [],
  },
  {
    id: 675465,
    title: 'Fracture',
    boxart: 'http://cdn-0.nflximg.com/images/2891/Fracture.jpg',
    uri: 'http://api.netflix.com/catalog/titles/movies/70111470',
    rating: [5.0],
    bookmark: [{ id:432534, time:65876586 }],
  },
];

function processReleaseData(releases) {
  // return array of objects
  // filter input array to remove films w/o titles / ids
  // map result to return just title / id of each film
  let selected = releases.filter(release => release.title && release.id);

  return selected.map(release => {
    return {id: release.id, title: release.title};
  });
}

console.log(processReleaseData(newReleases));
// [{ id: 70111470, title: 'Die Hard'}, { id: 675465, title: 'Fracture' }];