'use strict';

window.load = (function (url, onLoad) {
  var xhr = new XMLHttpRequest();
  var OK_STATUS = 200;
  xhr.responseType = 'json';
  xhr.timeout = 10000;

  xhr.addEventListener('load', function () {
    if (xhr.status === OK_STATUS) {
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
