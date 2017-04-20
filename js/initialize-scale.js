'use strict';

window.initializeScale = (function (scaleValue, scaleIncrease, scaleDecrease, scaleStep, minScaleValue, maxScaleValue, callback) {
  var _scaleValue = scaleValue;

  scaleDecrease.addEventListener('click', function () {
    if (_scaleValue > minScaleValue) {
      _scaleValue = _scaleValue - scaleStep;
    }
    callback(_scaleValue);
  });

  scaleIncrease.addEventListener('click', function () {
    if (_scaleValue < maxScaleValue) {
      _scaleValue = _scaleValue + scaleStep;
    }
    callback(_scaleValue);
  });
});
