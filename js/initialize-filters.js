'use strict';

window.initializeFilters = (function (controlsContainer, callback) {
  controlsContainer.addEventListener('click', function (evt) {
    if (evt.target.hasAttribute('type')) {
      var filter = evt.target;
      var newFilter = 'filter-' + filter.value;
      callback(newFilter);
    }
  });
});
