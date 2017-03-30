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
var pictureTemplate = document.getElementById('picture-template').content;
var picturesBlock = document.querySelector('div.pictures');
var fragment = document.createDocumentFragment();
var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayUrl = galleryOverlay.querySelector('.gallery-overlay-image');
var galleryLikesCount = galleryOverlay.querySelector('.likes-count');
var galleryCommentsCount = galleryOverlay.querySelector('.gallery-overlay-controls-comments');


showPictures();
showGallaryOverlay();

function generateNodes(i) {
  var picture = pictureTemplate.cloneNode(true);
  var comment = picture.querySelector('.picture-comments');
  var pictureUrl = picture.querySelector('img');
  var likeCount = picture.querySelector('.picture-likes');
  comment.textContent = generatePicturesArray()[i].comments;
  pictureUrl.setAttribute('src', generatePicturesArray()[i].url);
  likeCount.textContent = generatePicturesArray()[i].likes;
  return picture;
}

function cloneNodes() {
  var nodesArray = [];
  for (var i = 0; i < 25; i++) {
    nodesArray[i] = generateNodes(i);
  }
  return nodesArray;
}


function showPictures() {
  for (var i = 0; i < 25; i++) {
    fragment.appendChild(cloneNodes()[i]);
  }
  picturesBlock.appendChild(fragment);
}

function showGallaryOverlay() {
  galleryOverlay.classList.remove('invisible');
  galleryOverlayUrl.setAttribute('src', generatePicturesArray()[0].url);
  galleryLikesCount.textContent = generatePicturesArray()[0].likes;
  galleryCommentsCount.textContent = generatePicturesArray()[0].comments.length;
}

function generateNewObject(i) {
  var picturesObject = {};
  picturesObject.url = generateUrlsArray()[i];
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

// генерируем ссылки с 1 до 25 включительно
function generateUrlsArray() {
  var _links = [];
  for (var i = 0; i < 26; i++) {
    _links[i] = 'photos/' + i + '.jpg';
  }
  var urls = _links.slice(1);
  return urls;
}

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
