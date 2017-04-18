'use strict';

window.initializeScale = (function (scaleValue, increase, decrease, step, minValue, maxValue, callback) {
  var _scaleValue = scaleValue;

  decrease.addEventListener('click', function () {
    if (_scaleValue > minValue) {
      _scaleValue = _scaleValue - step;
    }
    callback(_scaleValue);
  });

  increase.addEventListener('click', function () {
    if (_scaleValue < maxValue) {
      _scaleValue = _scaleValue + step;
    }
    callback(_scaleValue);
  });
});
