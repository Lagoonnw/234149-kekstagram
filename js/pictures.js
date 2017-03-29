'use strict';
console.log('pictures');

// function generateNewObject() {
//   for (var i = 0; i < 25; i++) {
//     var userObject = {
//       likes: getRandomArbitary(15, 255);
//     }
//   }
//
// }

function getRandomArbitary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

getRandomArbitary(15, 255);
console.log(getRandomArbitary(15, 255));
