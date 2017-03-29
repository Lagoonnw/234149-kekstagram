'use strict';
console.log('pictures');

function generateNewObject() {
  var userObject = {};
  userObject.likes = getRandomArbitary(15, 255);
  return userObject;
}

function generateUsersArray() {
  var usersArray = [];
  for (var i = 0; i < 25; i++) {
    usersArray[i] =  generateNewObject();
  }
  return usersArray;
}

generateUsersArray();
console.log(generateUsersArray());

// generateNewObject();
// console.log(generateNewObject());


function getRandomArbitary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
