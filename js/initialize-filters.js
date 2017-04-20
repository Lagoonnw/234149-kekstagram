'use strict';

window.initializeFilters = (function (controls, callback) {
  controls.forEach(function (item, i) {
    controls[i].addEventListener('click', function () {
      var filter = controls[i];
      var newFilter = 'filter-' + filter.value;
      callback(newFilter);
    });
  });
});
