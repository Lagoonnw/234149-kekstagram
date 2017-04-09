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
var photoArray = [];
var photoNode = {};
var pictureElements = [];
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
var uploadCancelButton = cropOverlay.querySelector('.upload-form-cancel');
var closeGalleryCross = galleryOverlay.querySelector('.gallery-overlay-close');
var uploadForm = document.getElementById('upload-select-image');
var uploadFileInput = uploadForm.querySelector('.upload-input');
var cropCommentField = cropOverlay.querySelector('.upload-form-description');
var uploadSubmitButton = cropOverlay.querySelector('.upload-form-submit');
var filterControls = cropOverlay.querySelector('.upload-filter-controls');
var picturePreview = document.querySelector('.filter-image-preview');
var resizeControls = cropOverlay.querySelector('.upload-resize-controls');

var openGallery = function (evt) {
  galleryOverlay.classList.remove('invisible');
  document.addEventListener('keydown', onGalleryEscapePress);
};

var closeGallery = function (evt) {
  galleryOverlay.classList.add('invisible');
  document.removeEventListener('keydown', onGalleryEscapePress);
};

var onGalleryCrossEnterKeypress = function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    closeGallery();
  }
};

var onGalleryEscapePress = function (evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
    closeGallery();
  }
};

var onPictureEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    openGallery();
  }
};

var onPictureClick = function (evt) {
  openGallery();
};

var onUploadButtonClick = function (evt) {
  evt.preventDefault();
  showForm(uploadForm, 'invisible');
  closeForm(cropOverlay, 'invisible');

};

var onUploadSubbmitButtonEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    evt.preventDefault();
    checkValidity();
  }
};

var onSubbmitButtonClick = function (evt) {
  evt.preventDefault();
  checkValidity();
};

var onCropFormEscapePress = function (evt) {
  if (evt.keyCode === ESC_KEY_CODE && evt.target !== cropCommentField) {
    showForm(uploadForm, 'invisible');
    closeForm(cropOverlay, 'invisible');
    document.removeEventListener('keydown', onCropFormEscapePress);
  }
};

var onResizeControlsClick = function (evt) {
  var stepForward = resizeControls.querySelector('.upload-resize-controls-button-inc');
  var stepBack = resizeControls.querySelector('.upload-resize-controls-button-dec');
  var stepValue = resizeControls.querySelector('.upload-resize-controls-value');
  var minStep = 25;
  var maxStep = 100;
  if (evt.target === stepForward && parseInt(stepValue.value, 10) < maxStep) {
    var value = parseInt(stepValue.value, 10) + parseInt(stepValue.step, 10);
    scalePhoto(value);
    stepValue.value = value + '%';
  }
  if (evt.target === stepBack && parseInt(stepValue.value, 10) > minStep) {
    value = parseInt(stepValue.value, 10) - parseInt(stepValue.step, 10);
    scalePhoto(value);
    stepValue.value = value + '%';
  }
};

var onUplodFileInputChange = function (evt) {
  showForm(cropOverlay, 'invisible');
  closeForm(uploadForm, 'invisible');
  document.addEventListener('keydown', onCropFormEscapePress);
};

var onFilterClick = function (evt) {
  if (evt.target.hasAttribute('type')) {
    var filter = evt.target;
    if (filter.checked) {
      var value = filter.value;
      addClass(picturePreview, value);
    }
  }
};


closeForm(cropOverlay, 'invisible');
showForm(uploadForm, 'invisible');
photoArray = setPhotoArray(1, 25);
photoNode = showPhotos(photoArray);
pictureElements = picturesBlock.querySelectorAll('.picture');
filterControls.addEventListener('click', onFilterClick);
resizeControls.addEventListener('click', onResizeControlsClick);
uploadFileInput.addEventListener('change', onUplodFileInputChange);
uploadSubmitButton.addEventListener('click', onSubbmitButtonClick);
uploadSubmitButton.addEventListener('keydown', onUploadSubbmitButtonEnterPress);
uploadCancelButton.addEventListener('click', onUploadButtonClick);
cropOverlay.addEventListener('keydown', onCropFormEscapePress);
closeGalleryCross.addEventListener('click', closeGallery);
closeGalleryCross.addEventListener('keydown', onGalleryCrossEnterKeypress);
pictureElements.forEach(function (item, i) {
  pictureElements[i].addEventListener('click', function (evt) {
    evt.preventDefault();
    onPictureClick();
    showGalleryOverlay(photoArray, i);
  });
  pictureElements[i].addEventListener('keydown', onPictureEnterPress);
});


function checkValidity() {
  var element = cropCommentField;
  var validity = element.validity;
  if (validity.valueMissing) {
    element.style = 'border: 1px solid red';
  } else {
    showForm(uploadForm, 'invisible');
    closeForm(cropOverlay, 'invisible');
  }
}

function scalePhoto(value) {
  var scaleDivider = 100;
  picturePreview.style.transform = 'scale(' + value / scaleDivider + ')';
}

function addClass(element, value) {
  var className = 'filter-' + value;
  element.classList.add(className);
}

function closeForm(element, className) {
  element.classList.add('invisible');
}

function showForm(element, className) {
  element.classList.remove('invisible');
}

function setPhotoArray(minArrayLength, maxArrayLength) {
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
  var comments = setArrayOfRandomComments();
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
  photos.forEach(function (arrayItem, i) {
    photoNode = createPhotoNode(photos[i]);
    fragment.appendChild(photoNode);
  });
  picturesBlock.appendChild(fragment);
}

function createPhotoNode(photo) {
  photoNode = photoTemplate.cloneNode(true);
  var comment = photoNode.querySelector('.picture-comments');
  var img = photoNode.querySelector('img');
  var likeCount = photoNode.querySelector('.picture-likes');

  comment.textContent = photo.comments;
  img.setAttribute('src', photo.url);
  img.setAttribute('tabindex', 0);
  likeCount.textContent = photo.likes;

  return photoNode;
}

function showGalleryOverlay(photos, photoIndexNumber) {
  galleryOverlayUrl.setAttribute('src', photos[photoIndexNumber].url);
  galleryLikesCount.textContent = photos[photoIndexNumber].likes;
  galleryCommentsCount.textContent = photos[photoIndexNumber].comments.length;
}

function setArrayOfRandomComments() {
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
