'use strict';

(function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var picturesBlock = document.querySelector('div.pictures');
  var fragment = document.createDocumentFragment();
  var uploadForm = document.getElementById('upload-select-image');
  var cropOverlay = document.querySelector('.upload-overlay');
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data';

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

  var errorHandler = function (error) {
    var errorDiv = document.createElement('div');
    var errorDivStyle = errorDiv.style;
    var errorMessage;
    var errorStatus = 'Ошибка: ' + error;
    switch (error) {
      case 404:
        errorMessage = errorStatus + '. Страница не найдена.';
        break;
      case 403:
        errorMessage = errorStatus + '. Доступ запрещен.';
        break;
      case 401:
        errorMessage = errorStatus + '. Вы не авторизованы.';
        break;
      case 503:
        errorMessage = errorStatus + '. Сервер временно не доступен.';
        break;
      default:
        errorMessage = 'Что-то пошло не так.';
    }
    errorDivStyle.position = 'absolute';
    errorDivStyle.zIndex = '9999';
    errorDivStyle.top = '0';
    errorDivStyle.left = '0';
    errorDivStyle.padding = '20px';
    errorDivStyle.width = '100%';
    errorDivStyle.backgroundColor = 'red';
    errorDivStyle.color ='#ffffff';
    errorDivStyle.textAlign = 'center';
    errorDiv.innerHTML = '<p><b>' + errorMessage + '</b></p>';
    document.body.appendChild(errorDiv);
  };

  window.load(URL, onLoad, errorHandler);
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
