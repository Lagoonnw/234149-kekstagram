'use strict';

window.data = (function () {
  var photoArray = [];
  var usersComments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var minLikesNumber = 15;
  var maxLikesNumber = 200;
  var minCommentsNumber = 1;
  var maxCommentsNumber = 2;

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
    var likesNumber = utils.getRandomNumber(minLikesNumber, maxLikesNumber);
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

  function setArrayOfRandomComments() {
    var comments = [];
    var arrayLength = utils.getRandomNumber(minCommentsNumber, maxCommentsNumber);
    for (var i = minCommentsNumber; i <= arrayLength; i++) {
      var photoComment = utils.getRandomArrayItem(usersComments);
      comments.push(photoComment);
    }
    return comments;
  }

  photoArray = setPhotoArray(1, 25);
  return photoArray;
})();
console.log(window.data);
console.log(typeof(window.data));
