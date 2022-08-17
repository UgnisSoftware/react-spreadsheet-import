'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
};

exports.readFileAsync = readFileAsync;
