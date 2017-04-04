'use strict';

var usersComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var photoArray = [];
var minArrayLength = 1;
var maxArrayLength = 25;
var minLikesNumber = 15;
var maxLikesNumber = 200;
var minCommentsNumber = 1;
var maxCommentsNumber = 2;
var photoName = null;
var photoTemplate = document.getElementById('picture-template').content;
var picturesBlock = document.querySelector('div.pictures');
var fragment = document.createDocumentFragment();
var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayUrl = galleryOverlay.querySelector('.gallery-overlay-image');
var galleryLikesCount = galleryOverlay.querySelector('.likes-count');
var galleryCommentsCount = galleryOverlay.querySelector('.gallery-overlay-controls-comments');
var uploadOverlay = document.querySelector('.upload-overlay');

createPhotoObject();
generatePhotoArray();
showPhotos(photoArray);
showGalleryOverlay(photoArray);
closeUploadForm();

function generatePhotoArray() {
  var photoObject = {};
  for (var i = minArrayLength; i < maxArrayLength; i++) {
    photoName = i;
    photoObject = createPhotoObject();
    photoArray.push(photoObject);
  }
  return photoArray;
}

function createPhotoObject() {
  var photoObject = {};
  var likesNumber = getRandomNumber(minLikesNumber, maxLikesNumber);
  var comments = getArrayOfRandomComments();
  var url = generatePhotoUrl();

  photoObject.url = url;
  photoObject.likes = likesNumber;
  photoObject.comments = comments;

  return photoObject;
}

function generatePhotoUrl() {
  var url = 'photos/' + photoName + '.jpg';
  return url;
}

function showPhotos(photos) {
  var photoNode = {};
  for (var i = 0; i < photos.length; i++) {
    photoNode = createPhotoNode(photoArray[i]);
    fragment.appendChild(photoNode);
  }
  picturesBlock.appendChild(fragment);
}

function createPhotoNode(photo) {
  var photoNode = photoTemplate.cloneNode(true);
  var comment = photoNode.querySelector('.picture-comments');
  var photoUrl = photoNode.querySelector('img');
  var likeCount = photoNode.querySelector('.picture-likes');

  comment.textContent = photo.comments;
  photoUrl.setAttribute('src', photo.url);
  likeCount.textContent = photo.likes;

  return photoNode;
}


function showGalleryOverlay(photos) {
  var firstArrayItem = 0;

  galleryOverlay.classList.remove('invisible');
  galleryOverlayUrl.setAttribute('src', photos[firstArrayItem].url);
  galleryLikesCount.textContent = photos[firstArrayItem].likes;
  galleryCommentsCount.textContent = photos[firstArrayItem].comments.length;
}

function closeUploadForm() {
  uploadOverlay.classList.add('invisible');
}

function getArrayOfRandomComments() {
  var comments = [];
  var arrayLength = getRandomNumber(minCommentsNumber, maxCommentsNumber);
  for (var i = minCommentsNumber; i <= arrayLength; i++) {
    var photoComment = getRandomArrayItem(usersComments);
    comments.push(photoComment);
  }
  return comments;
}

function getRandomArrayItem(array) {
  var randomNumber = Math.floor(Math.random() * array.length);
  return array[randomNumber];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * ((max + 1) - min) + min);
}
