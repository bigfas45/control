"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _parsers = require("./parsers");

function objToString(styleObj, parser = _parsers.camelToKebab) {
  if (!styleObj || typeof styleObj !== 'object' || Array.isArray(styleObj)) {
    throw new TypeError("expected an argument of type object, but got ".concat(typeof styleObj));
  }

  const lines = Object.keys(styleObj).map(property => "".concat(parser(property), ": ").concat(styleObj[property], ";"));
  return lines.join('\n');
}

var _default = objToString;
exports["default"] = _default;