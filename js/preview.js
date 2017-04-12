'use strict';

window.galleryPreview = (function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayImage = galleryOverlay.querySelector('.gallery-overlay-image');
  var galleryLikesCount = galleryOverlay.querySelector('.likes-count');
  var galleryCommentsCount = galleryOverlay.querySelector('.gallery-overlay-controls-comments');
  var closeGalleryCross = galleryOverlay.querySelector('.gallery-overlay-close');

  var closeGallery = function () {
    galleryOverlay.classList.add('invisible');
    document.removeEventListener('keydown', onGalleryEscapePress);
  };

  var onGalleryCrossEnterKeypress = function (evt) {
    if (utils.isEnter(evt.keyCode)) {
      closeGallery();
    }
  };

  var onGalleryEscapePress = function (evt) {
    if (utils.isEsc(evt.keyCode)) {
      closeGallery();
    }
  };

  closeGalleryCross.addEventListener('click', closeGallery);
  closeGalleryCross.addEventListener('keydown', onGalleryCrossEnterKeypress);

  function showGalleryOverlay(photos, photoIndexNumber) {
    galleryOverlayImage.setAttribute('src', photos[photoIndexNumber].url);
    galleryLikesCount.textContent = photos[photoIndexNumber].likes;
    galleryCommentsCount.textContent = photos[photoIndexNumber].comments.length;
  }
  return showGalleryOverlay;
})();
