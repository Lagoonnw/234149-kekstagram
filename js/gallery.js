'use strict';

(function () {
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data';
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var picturesBlock = document.querySelector('div.pictures');
  var fragment = document.createDocumentFragment();
  var uploadForm = document.getElementById('upload-select-image');
  var cropOverlay = document.querySelector('.upload-overlay');
  var galleryFiltersContainer = document.querySelector('.filters');
  var pictures;

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
    pictures = data;
    showPhotos(pictures);
    return pictures;
  };

  var onGalleryFiltersClick = function (evt) {
    if (evt.target.hasAttribute('type')) {
      var galleryFilter = evt.target;
      var galleryFilterName = galleryFilter.value;
      window.utils.debounce((showSelectedPhotos(galleryFilterName)));
    }
  };

  window.load(URL, onLoad);
  uploadForm.classList.remove('invisible');
  cropOverlay.classList.add('invisible');
  galleryFiltersContainer.classList.remove('hidden');
  galleryFiltersContainer.addEventListener('click', onGalleryFiltersClick);

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

  function showSelectedPhotos(galleryFilterName) {
    var photos = pictures.slice(0);
    removePictures(picturesBlock);
    switch (galleryFilterName) {
      case 'popular':
        showPhotos(photos);
        break;
      case 'new':
        photos = photos.sort(window.utils.sortRandom).slice(0, 10);
        showPhotos(photos);
        break;
      case 'discussed':
        photos = photos.slice(0).sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });
        showPhotos(photos);
    }
  }

  function removePictures(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
})();
