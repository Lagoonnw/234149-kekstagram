'use strict';

(function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var picturesBlock = document.querySelector('div.pictures');
  var fragment = document.createDocumentFragment();
  var uploadForm = document.getElementById('upload-select-image');
  var uploadFileInput = uploadForm.querySelector('.upload-input');
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
    if (utils.isEnter(evt.keyCode)) {
      openGallery();
    }
  };

  var onGalleryEscapePress = function (evt) {
    if (utils.isEsc(evt.keyCode)) {
      closeGallery();
    }
  };

  var onUploadFileInputChange = function (evt) {
    showForm();
  };

  function showPhotos(photos) {
    photos.forEach(function (arrayItem, i) {
      var photoNode = window.galleryMidget(photos[i]);
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
  uploadFileInput.addEventListener('change', onUploadFileInputChange);
  cropOverlay.classList.add('invisible');
  showPhotos(data);
})();
