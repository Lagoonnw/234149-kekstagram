'use strict';

(function () {
  var cropOverlay = document.querySelector('.upload-overlay');
  var uploadForm = document.getElementById('upload-select-image');
  var cropCancelButton = cropOverlay.querySelector('.upload-form-cancel');
  var cropCommentField = cropOverlay.querySelector('.upload-form-description');
  var cropSubmitButton = cropOverlay.querySelector('.upload-form-submit');
  var containerOfFilterControls = cropOverlay.querySelector('.upload-filter-controls');
  var filterControls = containerOfFilterControls.querySelectorAll('input[type=radio]');
  var resizeControls = cropOverlay.querySelector('.upload-resize-controls');
  var picturePreview = document.querySelector('.filter-image-preview');
  var uploadFileInput = uploadForm.querySelector('.upload-input');
  var filterLevelWrapper = cropOverlay.querySelector('.upload-filter-level');
  var filterLeveScale = filterLevelWrapper.querySelector('.upload-filter-level-line');
  var filterLevelValue = filterLevelWrapper.querySelector('.upload-filter-level-val');
  var filterLevelPin = filterLevelWrapper.querySelector('.upload-filter-level-pin');
  var filterScaleCoordinates = filterLeveScale.getBoundingClientRect();

  var onFilterScalePinMousedown = function (evt) {
    evt.preventDefault();
    var coordinateX = evt.clientX;
    var coordinateStart = filterScaleCoordinates.left;
    var coordinateEnd = filterScaleCoordinates.right;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shiftCoordinateX = coordinateX - moveEvt.clientX;
      var newValueForElementStyle = filterLevelPin.offsetLeft - shiftCoordinateX;
      coordinateX = moveEvt.clientX;
      if (coordinateX >= coordinateStart && coordinateX <= coordinateEnd) {
        filterLevelPin.style.left = newValueForElementStyle + 'px';
        filterLevelValue.style.width = newValueForElementStyle + 'px';
        changeFilterLevel(coordinateX);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onUploadFileInputChange = function (evt) {
    showCropForm();
    filterLevelWrapper.style.display = 'none';
    document.addEventListener('keydown', onCropFormEscapePress);
  };

  var onCropButtonClick = function (evt) {
    evt.preventDefault();
    hideCropForm();
  };

  var onUploadSubmitButtonEnterPress = function (evt) {
    if (window.utils.isEnter(evt.keyCode)) {
      evt.preventDefault();
      checkValidity(cropCommentField);
    }
  };

  var onSubmitButtonClick = function (evt) {
    evt.preventDefault();
    resetForm(cropCommentField);
  };

  var onCropFormEscapePress = function (evt) {
    if (window.utils.isEsc(evt.keyCode) && evt.target !== cropCommentField) {
      hideCropForm();
      document.removeEventListener('keydown', onCropFormEscapePress);
    }
  };

  var onResizeControlsClick = function (evt) {
    var stepForward = resizeControls.querySelector('.upload-resize-controls-button-inc');
    var stepBack = resizeControls.querySelector('.upload-resize-controls-button-dec');
    var stepValue = resizeControls.querySelector('.upload-resize-controls-value');
    var minValue = stepValue.getAttribute('min');
    var maxValue = stepValue.getAttribute('max');
    var value = parseInt(stepValue.value, 10);
    var step = parseInt(stepValue.step, 10);
    if (evt.target === stepForward && value < maxValue) {
      value = value + step;
    } else if (evt.target === stepBack && value > minValue) {
      value = value - step;
    }
    scalePhoto(value);
    stepValue.value = value + '%';
  };

  var onFilterClick = function (evt) {
    if (evt.target.hasAttribute('type')) {
      var filter = evt.target;
      toggleFilter(filter);
    }
  };

  containerOfFilterControls.addEventListener('click', onFilterClick);
  resizeControls.addEventListener('click', onResizeControlsClick);
  cropSubmitButton.addEventListener('click', onSubmitButtonClick);
  cropSubmitButton.addEventListener('keydown', onUploadSubmitButtonEnterPress);
  cropCancelButton.addEventListener('click', onCropButtonClick);
  uploadFileInput.addEventListener('change', onUploadFileInputChange);
  filterLevelPin.addEventListener('mousedown', onFilterScalePinMousedown);

  function changeFilterLevel(coordinate) {
    var currentFilter = cropOverlay.querySelector('input[type=radio]:checked');
    var filterName = currentFilter.value;
    var _coordinate = coordinate - filterScaleCoordinates.left;
    var coeficient = '';
    var styleFilter = '';
    var unit = '';
    switch (filterName) {
      case 'chrome':
        coeficient = 1;
        styleFilter = 'grayscale';
        break;
      case 'sepia':
        coeficient = 1;
        styleFilter = 'sepia';
        break;
      case 'marvin':
        coeficient = 100;
        styleFilter = 'invert';
        unit = '%';
        break;
      case 'phobos':
        coeficient = 3;
        styleFilter = 'blur';
        unit = 'px';
        break;
      case 'heat':
        coeficient = 3;
        styleFilter = 'brightness';
        break;
      default:
        coeficient = '';
        styleFilter = 'none';
    }
    var level = _coordinate / (filterScaleCoordinates.width / coeficient);
    picturePreview.style.filter = styleFilter + '(' + level + unit + ')';
  }

  function toggleFilter(filter) {
    var className = 'filter-' + filter.value;
    clearFilters();
    addFilterClass(className);
    if (className !== 'filter-none') {
      filterLevelWrapper.style.display = 'block';
      changeFilterLevel(filterScaleCoordinates.right);
    } else {
      filterLevelWrapper.style.display = 'none';
      picturePreview.style.filter = '';
    }
    filterLevelPin.style.left = filterScaleCoordinates.width + 'px';
    filterLevelValue.style.width = filterScaleCoordinates.width + 'px';
  }

  function removeFilterClass(className) {
    picturePreview.classList.remove(className);
  }

  function addFilterClass(className) {
    picturePreview.classList.add(className);
  }

  function clearFilters() {
    filterControls.forEach(function (item, i) {
      var value = filterControls[i].value;
      var className = 'filter-' + value;
      removeFilterClass(className);
    });
  }

  function checkValidity(element) {
    var validity = element.validity;
    if (validity.valueMissing || validity.tooShort) {
      element.style = 'border: 1px solid red';
      return false;
    } else {
      return true;
    }
  }

  function resetForm(element) {
    var defaultFiler = filterControls[0];
    var stepValue = resizeControls.querySelector('.upload-resize-controls-value');
    var defaultScaleValue = 100;
    if (checkValidity(element)) {
      element.style = 'border: none';
      picturePreview.style.filter = '';
      element.value = '';
      defaultFiler.checked = true;
      stepValue.value = '100%';
      filterLevelWrapper.style.display = 'none';
      clearFilters();
      scalePhoto(defaultScaleValue);
      hideCropForm();
    }
  }

  function scalePhoto(value) {
    var scaleDivider = 100;
    picturePreview.style.transform = 'scale(' + value / scaleDivider + ')';
  }

  function showCropForm() {
    uploadForm.classList.add('invisible');
    cropOverlay.classList.remove('invisible');
  }

  function hideCropForm() {
    uploadForm.classList.remove('invisible');
    cropOverlay.classList.add('invisible');
  }

})();
