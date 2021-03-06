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
  var filterLevelScale = filterLevelWrapper.querySelector('.upload-filter-level-line');
  var filterLevelValue = filterLevelWrapper.querySelector('.upload-filter-level-val');
  var filterLevelPin = filterLevelWrapper.querySelector('.upload-filter-level-pin');
  var filterScaleCoordinates = filterLevelScale.getBoundingClientRect();
  var stepIncrement = resizeControls.querySelector('.upload-resize-controls-button-inc');
  var stepDecrement = resizeControls.querySelector('.upload-resize-controls-button-dec');
  var stepValue = resizeControls.querySelector('.upload-resize-controls-value');
  var minScaleValue = stepValue.getAttribute('min');
  var maxScaleValue = stepValue.getAttribute('max');
  var scaleValue = parseInt(stepValue.value, 10);
  var scaleStep = parseInt(stepValue.step, 10);
  var filterCoordinateStart = filterScaleCoordinates.left;
  var filterCoordinateEnd = filterScaleCoordinates.right;
  var filterCoordinateX;

  var onFilterScalePinMousedown = function (evt) {
    evt.preventDefault();
    filterCoordinateX = evt.clientX;

    document.addEventListener('mousemove', onFilterScalePinMouseMove);
    document.addEventListener('mouseup', onFilterScalePinMouseUp);
  };

  var onFilterScalePinMouseMove = function (evt) {
    evt.preventDefault();
    var shiftCoordinateX = filterCoordinateX - evt.clientX;
    var newValueForElementStyle = filterLevelPin.offsetLeft - shiftCoordinateX + 'px';
    filterCoordinateX = evt.clientX;
    if (filterCoordinateX >= filterCoordinateStart && filterCoordinateX <= filterCoordinateEnd) {
      filterLevelPin.style.left = newValueForElementStyle;
      filterLevelValue.style.width = newValueForElementStyle;
      changeFilterLevel(filterCoordinateX);
    } else if (filterCoordinateX < filterCoordinateStart) {
      filterCoordinateX = filterCoordinateStart;
    } else if (filterCoordinateX > filterCoordinateEnd) {
      filterCoordinateX = filterCoordinateEnd;
    }
  };

  var onFilterScalePinMouseUp = function (evt) {
    evt.preventDefault();
    document.removeEventListener('mousemove', onFilterScalePinMouseMove);
    document.removeEventListener('mouseup', onFilterScalePinMouseUp);
  };


  var onUploadFileInputChange = function (evt) {
    showCropForm();
    filterLevelWrapper.classList.add('hidden');
    document.addEventListener('keydown', onCropFormEscapePress);
  };

  var onCropButtonClick = function (evt) {
    evt.preventDefault();
    resetFormValues(cropCommentField);
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
      resetFormValues(cropCommentField);
      document.removeEventListener('keydown', onCropFormEscapePress);
    }
  };

  window.initializeScale(scaleValue, stepIncrement, stepDecrement, scaleStep, minScaleValue, maxScaleValue, scalePhotoHandler);
  window.initializeFilters(containerOfFilterControls, applyFilter);
  cropSubmitButton.addEventListener('click', onSubmitButtonClick);
  cropSubmitButton.addEventListener('keydown', onUploadSubmitButtonEnterPress);
  cropCancelButton.addEventListener('click', onCropButtonClick);
  cropCancelButton.addEventListener('keydown', onCropFormEscapePress);
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

  function applyFilter(newFilter) {
    var currentFilter;
    var styleValue = filterScaleCoordinates.width + 'px';
    var picturePreviewFilters = picturePreview.getAttribute('class').split(' ');
    var pictureFiltersItemIndex = 1;

    if (picturePreviewFilters.length > pictureFiltersItemIndex) {
      currentFilter = picturePreviewFilters.pop();
      picturePreview.classList.remove(currentFilter);
    }
    picturePreview.classList.add(newFilter);
    if (newFilter !== 'filter-none') {
      filterLevelWrapper.classList.remove('hidden');
      changeFilterLevel(filterScaleCoordinates.right);
    } else {
      filterLevelWrapper.classList.add('hidden');
      picturePreview.style.filter = '';
    }
    filterLevelPin.style.left = styleValue;
    filterLevelValue.style.width = styleValue;
  }

  function clearFilters() {
    filterControls.forEach(function (item, i) {
      var value = filterControls[i].value;
      var className = 'filter-' + value;
      picturePreview.classList.remove(className);
    });
  }

  function checkValidity(element) {
    var minValueLength = 30;
    if (element.checkValidity() && element.classList.contains('upload-form-description') && element.value.length > minValueLength) {
      return true;
    } else {
      element.classList.add('invalid-textarea');
      return false;
    }
  }

  function resetForm(element) {
    if (checkValidity(element)) {
      resetFormValues(element);
    }
  }

  function resetFormValues(element) {
    var defaultFiler = filterControls[0];
    var defaultScaleValue = 100;
    element.classList.remove('invalid-textarea');
    picturePreview.style.filter = '';
    element.value = '';
    defaultFiler.checked = true;
    stepValue.value = '100%';
    filterLevelWrapper.classList.add('hidden');
    clearFilters();
    scalePhotoHandler(defaultScaleValue);
    hideCropForm();
  }

  function scalePhotoHandler(defaultScaleValue) {
    var scaleDivider = 100;
    picturePreview.style.transform = 'scale(' + defaultScaleValue / scaleDivider + ')';
    stepValue.value = defaultScaleValue + '%';
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
