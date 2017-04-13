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

  var onUploadFileInputChange = function (evt) {
    hideCropForm();
    document.addEventListener('keydown', onCropFormEscapePress);
  };

  var onCropButtonClick = function (evt) {
    evt.preventDefault();
    showCropForm();
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
      showCropForm();
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

  function toggleFilter(filter) {
    var className = 'filter-' + filter.value;
    clearFilters();
    addFilterClass(className);
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
      hideCropForm();
      element.style = 'border: none';
      element.value = '';
      defaultFiler.checked = true;
      clearFilters();
      scalePhoto(defaultScaleValue);
      stepValue.value = '100%';
    }
  }

  function scalePhoto(value) {
    var scaleDivider = 100;
    picturePreview.style.transform = 'scale(' + value / scaleDivider + ')';
  }

  function hideCropForm() {
    uploadForm.classList.add('invisible');
    cropOverlay.classList.remove('invisible');
  }

  function showCropForm() {
    uploadForm.classList.remove('invisible');
    cropOverlay.classList.add('invisible');
  }

})();
