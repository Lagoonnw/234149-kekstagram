'use strict';

 window.load = (function (url, onSuccsess, onError) {
   var xhr = new XMLHttpRequest();
   xhr.responseType = 'json';

   xhr.addEventListener('load', function () {
     if (xhr.status === 200) {
       onSuccsess(xhr.response);
     } else {
       onError(xhr.status);
     }
   });

   xhr.open('GET', url);
   xhr.send();
 });
