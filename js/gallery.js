'use strict';

(function () {
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

  uploadForm.classList.remove('invisible');
  cropOverlay.classList.add('invisible');
  showPhotos(window.data);
})();
