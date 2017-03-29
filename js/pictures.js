'use strict';
var comments = [];
comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'
];
console.log(comments);

function generateNewObject(i) {
  var userObject = {};
  userObject.url = 'pictures/' + i + '.jpg';
  userObject.likes = getRandomArbitary(15, 255);
  return userObject;
}

function generateUsersArray() {
  var usersArray = [];
  for (var i = 0; i < 25; i++) {
    usersArray[i] =  generateNewObject(i);
  }
  return usersArray;
}

generateUsersArray();
console.log(generateUsersArray());

// generateNewObject();
// console.log(generateNewObject());


function getRandomArbitary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateUrlsArray() {
  var urlsArray = [];
    for (var min = 1, max = 26; min < max; min++) {
    var i = min;
    urlsArray[i] = 'pictures/' + i + '.jpg';
  }
  return urlsArray;
}

generateUrlsArray();
// console.log(generateUrlsArray());
// console.log(generateUrlsArray().length);
