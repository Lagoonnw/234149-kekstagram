'use strict';

 window.load = (function (url, callback) {
   var xhr = new XMLHttpRequest();
   xhr.responseType = 'json';
   xhr.addEventListener('load', function () {
     if (xhr.status === 200) {
       callback(xhr.response);
     } else {
       console.log('error');
     }
   });
   
   xhr.open('GET', url);
   xhr.send();
 });
