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
  picturesObject.likes = getRandomNumber(15, 255);
  picturesObject.comments = generateComment();
  return picturesObject;
}

function generatePicturesArray() {
  var picturesArray = [];
  for (var i = 0; i < 25; i++) {
    picturesArray[i] = generateNewObject(i);
  }
  return picturesArray;
}

 generatePicturesArray();
 console.log(generatePicturesArray());

// функция для генерации рандомного числа
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// функция для рандомной сортировки массива
function compareRandom() {
  return Math.random() - 0.5;
}

// получаем рандомный комментарий
function generateComment() {
  comments.sort(compareRandom);
  var item = getRandomNumber(1, 3).toFixed(1);
  var comment = comments.slice(0, item);
  return comment;
}
