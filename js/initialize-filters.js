'use strict';

window.initializeFilters = (function (controls, element, callback) {
  var currentFilter = '';

  controls.forEach(function (item, i) {
    controls[i].addEventListener('click', function () {
      var filtersItemIndex = 1;
      var filters = element.getAttribute('class').split(' ');
      if (filters.length > filtersItemIndex) {
        currentFilter = filters.pop(filtersItemIndex);
      } else {
        currentFilter = '';
      }
      var filter = controls[i];
      var newFilter = 'filter-' + filter.value;
      callback(currentFilter, newFilter);
    });
  });

});
