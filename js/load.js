'use strict';

window.load = (function (url, onLoad) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.timeout = 10000;

  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      onLoad(xhr.response);
    } else {
      window.errorHandler('statusErr', xhr.status);
    }
  });

  xhr.addEventListener('timeout', function () {
    window.errorHandler('timeoutErr', xhr.timeout);
  });

  xhr.addEventListener('error', function () {
    window.errorHandler('connectionErr', 'Произошла ошибка соединения');
  });

  xhr.open('GET', url);
  xhr.send();
});
