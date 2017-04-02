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
var nodesArray = [];
var minArrayLength = 1;
var maxArrayLength = 25;
var minLikesNumber = 15;
var maxLikesNumber = 200;
var minCommentsNumber = 1;
var maxCommentsNumber = 2;
var pictureTemplate = document.getElementById('picture-template').content;
var picturesBlock = document.querySelector('div.pictures');
var fragment = document.createDocumentFragment();
var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayUrl = galleryOverlay.querySelector('.gallery-overlay-image');
var galleryLikesCount = galleryOverlay.querySelector('.likes-count');
var galleryCommentsCount = galleryOverlay.querySelector('.gallery-overlay-controls-comments');
var uploadOverlay = document.querySelector('.upload-overlay');

getPhotoArray();
generateNodesArray(photoArray);
showPhotos(nodesArray);
showGalleryOverlay(photoArray);
closeUploadForm();

function getPhotoArray() {
  for (var i = minArrayLength, n = maxArrayLength; i < n; i++) {
    var picturesObject = {};
    var likesNumber = getRandomNumber(minLikesNumber, maxLikesNumber);
    var comments = getArrayOfRandomComments();
    var urlName = i;
    var url = 'photos/' + urlName + '.jpg';

    picturesObject.url = url;
    picturesObject.likes = likesNumber;
    picturesObject.comments = comments;
    photoArray.push(picturesObject);
  }
  return photoArray;
}

function generateNodesArray(arr) {
  for (var i = 0, n = arr.length; i < n; i++) {
    var picture = pictureTemplate.cloneNode(true);
    var comment = picture.querySelector('.picture-comments');
    var pictureUrl = picture.querySelector('img');
    var likeCount = picture.querySelector('.picture-likes');

    comment.textContent = arr[i].comments;
    pictureUrl.setAttribute('src', arr[i].url);
    likeCount.textContent = arr[i].likes;
    nodesArray.push(picture);
  }
  return nodesArray;
}

function showPhotos(arr) {
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(arr[i]);
  }
  picturesBlock.appendChild(fragment);
}

function showGalleryOverlay(arr) {
  galleryOverlay.classList.remove('invisible');
  galleryOverlayUrl.setAttribute('src', arr[0].url);
  galleryLikesCount.textContent = arr[0].likes;
  galleryCommentsCount.textContent = arr[0].comments.length;
}

function closeUploadForm() {
  uploadOverlay.classList.add('invisible');
}

function getArrayOfRandomComments() {
  var comments = [];
  var n = getRandomNumber(minCommentsNumber, maxCommentsNumber);
  for (var i = minCommentsNumber; i <= n; i++) {
    var photoComment = getRandomArrayItem(usersComments);
    comments.push(photoComment);
  }
  return comments;
}

function getRandomArrayItem(arr) {
  var randNum = Math.floor(Math.random() * arr.length);
  return arr[randNum];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * ((max + 1) - min) + min);
}
