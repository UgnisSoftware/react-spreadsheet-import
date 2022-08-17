'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var Providers = require('../components/Providers.js');

const useRsi = () => react.useContext(Providers.RsiContext);

exports.useRsi = useRsi;
