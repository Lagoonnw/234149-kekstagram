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
  var picturesObject = {};
  picturesObject.url = 'pictures/' + i + '.jpg';
  picturesObject.likes = getRandomArbitary(15, 255);
  return picturesObject;
}

function generatePicturesArray() {
  var usersArray = [];
  for (var i = 0; i < 25; i++) {
    usersArray[i] =  generateNewObject(i);
  }
  return usersArray;
}

 generatePicturesArray();
 console.log(generatePicturesArray());
// generatePicturessArray();
// console.log(generatePicturesArray());

// generateNewObject();
// console.log(generateNewObject());


function getRandomArbitary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function compareRandom(a, b) {
  return Math.random() - 0.5;
}

comments.sort(compareRandom);
console.log(comments);


// console.log(generateUrlsArray());
// console.log(generateUrlsArray().length);
