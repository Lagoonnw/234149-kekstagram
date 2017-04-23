'use strict';

window.utils = (function () {
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;
  var DEBOUNCE_INTERVAL = 500;

  var getRandomArrayItem = function (array) {
    var randomNumber = Math.floor(Math.random() * array.length);
    return array[randomNumber];
  };

  var getRandomNumber = function (minimumValue, maximumValue) {
    return Math.floor(Math.random() * ((maximumValue + 1) - minimumValue) + minimumValue);
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
    var lastTimeout;
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
