'use strict';

var ESC_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;
var usersComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var photoArray = generatePhotoArray();
var minArrayLength = 1;
var maxArrayLength = 25;
var minLikesNumber = 15;
var maxLikesNumber = 200;
var minCommentsNumber = 1;
var maxCommentsNumber = 2;
var photoTemplate = document.getElementById('picture-template').content;
var picturesBlock = document.querySelector('div.pictures');
var fragment = document.createDocumentFragment();
var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayUrl = galleryOverlay.querySelector('.gallery-overlay-image');
var galleryLikesCount = galleryOverlay.querySelector('.likes-count');
var galleryCommentsCount = galleryOverlay.querySelector('.gallery-overlay-controls-comments');
var cropOverlay = document.querySelector('.upload-overlay');
var uploadCancelBtn = cropOverlay.querySelector('.upload-form-cancel');
var closeGalley = galleryOverlay.querySelector('.gallery-overlay-close');
var pictureElements = collectPicturesElements();
var uploadForm = document.getElementById('upload-select-image');
var uplodFileInput = uploadForm.querySelector('.upload-input');
var cropCommentField = cropOverlay.querySelector('.upload-form-description');
var uploadSubmitBtn = cropOverlay.querySelector('.upload-form-submit');
var openGallery = function (evt) {
  galleryOverlay.classList.remove('invisible');
  document.addEventListener('keydown', onGalleryEscPress);
};
var closeGallery = function (evt) {
  galleryOverlay.classList.add('invisible');
  document.removeEventListener('keydown', onGalleryEscPress);
};
var onGalleryEscPress = function (evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
    closeGallery();
  }
};
var onPictureEntrPress = function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    openGallery();
  }
};
var onPictureClick = function (evt) {
  openGallery();
};
var onUploadBtnClick = function (evt) {
  evt.preventDefault();
  showUplodForm();
  closeCropForm();
};

var onUploadSubbmitBtnEntrPress = function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    evt.preventDefault();
    showUplodForm();
    closeCropForm();
  }
};
var onCropFormEscPress = function (evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
    showUplodForm();
    closeCropForm();
    document.removeEventListener('keydown', onCropFormEscPress);
  }
};

closeCropForm();
showUplodForm();
generatePhotoArray();
showPhotos(photoArray);
collectPicturesElements();
uplodFileInput.addEventListener('change', function (evt) {
  showCropForm();
  closeUplodForm();
});
uploadSubmitBtn.addEventListener('click', onUploadBtnClick);
uploadSubmitBtn.addEventListener('keydown', onUploadSubbmitBtnEntrPress);
uploadCancelBtn.addEventListener('click', onUploadBtnClick);
cropCommentField.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
    evt.stopPropagation();
  }
});
closeGalley.addEventListener('click', closeGallery);
pictureElements.forEach(function (item, i) {
  pictureElements[i].addEventListener('click', function (evt) {
    evt.preventDefault();
    onPictureClick();
    showGalleryOverlay(photoArray, i);
  });
  pictureElements[i].addEventListener('keydown', onPictureEntrPress);
});

function closeCropForm() {
  cropOverlay.classList.add('invisible');
}

function showCropForm() {
  cropOverlay.classList.remove('invisible');
}
function showUplodForm() {
  uploadForm.classList.remove('invisible');
}

function closeUplodForm() {
  uploadForm.classList.add('invisible');
}

function collectPicturesElements() {
  pictureElements = picturesBlock.querySelectorAll('.picture');
  return pictureElements;
}

function generatePhotoArray() {
  photoArray = [];
  var photoObject = {};
  var photoName = null;
  for (var i = minArrayLength; i < maxArrayLength; i++) {
    photoName = i;
    photoObject = createPhotoObject(photoName);
    photoArray.push(photoObject);
  }
  return photoArray;
}

function createPhotoObject(photoName) {
  var photoObject = {};
  var likesNumber = getRandomNumber(minLikesNumber, maxLikesNumber);
  var comments = getArrayOfRandomComments();
  var url = generatePhotoUrl(photoName);

  photoObject.url = url;
  photoObject.likes = likesNumber;
  photoObject.comments = comments;

  return photoObject;
}

function generatePhotoUrl(photoName) {
  var url = 'photos/' + photoName + '.jpg';
  return url;
}

function showPhotos(photos) {
  var photoNode = {};
  photos.forEach(function (arrayItem, i) {
    photoNode = createPhotoNode(photos[i]);
    fragment.appendChild(photoNode);
  });
  picturesBlock.appendChild(fragment);
}

function createPhotoNode(photo) {
  var photoNode = photoTemplate.cloneNode(true);
  var comment = photoNode.querySelector('.picture-comments');
  var img = photoNode.querySelector('img');
  var likeCount = photoNode.querySelector('.picture-likes');

  comment.textContent = photo.comments;
  img.setAttribute('src', photo.url);
  img.setAttribute('tabindex', 0);
  likeCount.textContent = photo.likes;

  return photoNode;
}

function showGalleryOverlay(photos, arrayItem) {

  galleryOverlayUrl.setAttribute('src', photos[arrayItem].url);
  galleryLikesCount.textContent = photos[arrayItem].likes;
  galleryCommentsCount.textContent = photos[arrayItem].comments.length;
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
