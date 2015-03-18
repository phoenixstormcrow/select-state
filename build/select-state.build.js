(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* select-state/lib/index.js

   an extension for the HTMLSelectElement,
   which populates it with options for each
   of the United States.
*/

'use strict';

var states = require('./states'),
    selectState = Object.create(HTMLSelectElement.prototype),
    defaults = {
      'default': 'AZ',
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
  extends: 'select'
});

module.exports = function () {
  return new SelectState();
};

},{"./states":2}],2:[function(require,module,exports){


module.exports = [
   'AK',   'AL',   'AR',   'AZ',   'CA',   'CO',   'CT',
   'DC',   'DE',   'FL',   'GA',   'HI',   'IA',   'ID',
   'IL',   'IN',   'KS',   'KY',   'LA',   'MA',   'MD',
   'ME',   'MI',   'MN',   'MO',   'MS',   'MT',   'NC',
   'ND',   'NE',   'NH',   'NJ',   'NM',   'NV',   'NY',
   'OH',   'OK',   'OR',   'PA',   'RI',   'SC',   'SD',
   'TN',   'TX',   'UT',   'VA',   'VT',   'WA',   'WI',
   'WV',   'WY'
];

},{}]},{},[1]);
