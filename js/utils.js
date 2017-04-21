'use strict';

window.utils = (function () {
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

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

  var sortRandom = function () {
    return 0.5 - Math.random();
  };

  var debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  return {
    getRandomArrayItem: getRandomArrayItem,
    getRandomNumber: getRandomNumber,
    isEsc: isEscKey,
    isEnter: isEnterKey,
    sortRandom: sortRandom,
    debounce: debounce
  };
})();
