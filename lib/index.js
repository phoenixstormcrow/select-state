/* select-state/lib/index.js

   an extension for the HTMLSelectElement,
   which populates it with options for each
   of the United States.
*/

'use strict';

var states = require('./states'),
    selectState = Object.create(HTMLSelectElement.prototype),
    defaults = {
      'default': '',
      'selected': false
    };

Object.keys(defaults).forEach( function (key) {
  Object.defineProperty(selectState, key, {
    get: function () {
      return this.getAttribute(key) || defaults[key];
    },
    set: function (val) {
      this.setAttribute(key, val);
    }
  });
});

selectState.createdCallback = function () {
  var frag = document.createDocumentFragment();

  states
  .map(function (state) {
    var opt = document.createElement('option');
    opt.setAttribute('value', state);
    return opt;
  })
  .map(function (opt) {
    opt.textContent = opt.value;
    return opt;
  })
  .map(function (opt) {
    frag.appendChild(opt);
    return opt;
  })
  .filter(function (opt) {
    return opt.value === this.default;
  }.bind(this))
  .forEach(function (opt) {
    opt.setAttribute('selected', '');
  });

  this.appendChild(frag);
};

var SelectState = document.registerElement('select-state', {
  prototype: selectState,
  'extends': 'select'
});

module.exports = function () {
  return new SelectState();
};
