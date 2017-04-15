'use strict';

window.initializeFilters = (function (controls, callback) {
  var oldFilters = [];

  controls.forEach(function (item, i) {
    controls[i].addEventListener('click', function () {
      var filter = controls[i];
      var newFilter = 'filter-' + filter.value;
      setListOfOldFilters();
      callback(oldFilters, newFilter);
      oldFilters = [];
    });
  });

  function setListOfOldFilters() {
    controls.forEach(function (item, i) {
      var value = controls[i].value;
      var className = 'filter-' + value;
      oldFilters.push(className);
    });
    return oldFilters;
  }
});
