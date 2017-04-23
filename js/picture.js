'use strict';

window.picture = (function () {
  var photoTemplate = document.getElementById('picture-template').content;

  function createPhotoNode(photo) {
    var photoNode = photoTemplate.cloneNode(true);
    var comment = photoNode.querySelector('.picture-comments');
    var img = photoNode.querySelector('img');
    var likeCount = photoNode.querySelector('.picture-likes');

    comment.textContent = photo.comments.length;
    img.setAttribute('src', photo.url);
    img.setAttribute('tabindex', 0);
    likeCount.textContent = photo.likes;

    return photoNode;
  }

  return createPhotoNode;
})();
