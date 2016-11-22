require('react');

module.exports = function () {
  var element = document.createElement('h1');

  element.innerHTML = 'Hello Hola world';

  return element;
};