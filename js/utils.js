'use strict';

window.utils = (function () {
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  var getRandomArrayItem = function (array) {
    var randomNumber = Math.floor(Math.random() * array.length);
    return array[randomNumber];
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * ((max + 1) - min) + min);
  };

  var isEscKey = function (keyCode) {
    return keyCode === ESC_KEY_CODE;
  };

  var isEnterKey = function (keyCode) {
    return keyCode === ENTER_KEY_CODE;
  };

  return {
    getRandomArrayItem: getRandomArrayItem,
    getRandomNumber: getRandomNumber,
    isEsc: isEscKey,
    isEnter: isEnterKey
  };
})();
console.log(window.utils);
