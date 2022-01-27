"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function createParser(matcher, replacer) {
  const regex = RegExp(matcher, 'g');
  return string => {
    // * throw an error if not a string
    if (typeof string !== 'string') {
      throw new TypeError("expected an argument of type string, but got ".concat(typeof styleObj));
    } // * if no match between string and matcher


    if (!string.match(regex)) {
      return string;
    } // * executes the replacer function for each match
    // ? replacer can take any arguments valid for String.prototype.replace


    return string.replace(regex, replacer);
  };
}

var _default = createParser;
exports["default"] = _default;