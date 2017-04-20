'use strict';

(function () {
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data';
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var picturesBlock = document.querySelector('div.pictures');
  var fragment = document.createDocumentFragment();
  var uploadForm = document.getElementById('upload-select-image');
  var cropOverlay = document.querySelector('.upload-overlay');

  var openGallery = function () {
    galleryOverlay.classList.remove('invisible');
    document.addEventListener('keydown', onGalleryEscapePress);
  };

  var closeGallery = function () {
    galleryOverlay.classList.add('invisible');
    document.removeEventListener('keydown', onGalleryEscapePress);
  };

  var onPictureEnterPress = function (evt) {
    if (window.utils.isEnter(evt.keyCode)) {
      openGallery();
    }
  };

  var onGalleryEscapePress = function (evt) {
    if (window.utils.isEsc(evt.keyCode)) {
      closeGallery();
    }
  };

  var onLoad = function (data) {
    showPhotos(data);
  };


  window.load(URL, onLoad);
  uploadForm.classList.remove('invisible');
  cropOverlay.classList.add('invisible');

  function showPhotos(photos) {
    photos.forEach(function (arrayItem, i) {
      var photoNode = window.picture(photos[i]);
      var photo = photoNode.querySelector('a');
      photo.addEventListener('click', function onPictureClick(evt) {
        evt.preventDefault();
        openGallery();
        window.galleryPreview(photos, i);
      });
      photo.addEventListener('keydown', onPictureEnterPress);
      fragment.appendChild(photoNode);
    });
    picturesBlock.appendChild(fragment);
  }

})();
