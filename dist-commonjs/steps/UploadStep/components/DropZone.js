'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('@chakra-ui/react');
var reactDropzone = require('react-dropzone');
var XLSX = require('xlsx');
var react$1 = require('react');
var getDropZoneBorder = require('../utils/getDropZoneBorder.js');
var useRsi = require('../../../hooks/useRsi.js');
var readFilesAsync = require('../utils/readFilesAsync.js');
var reactToastify = require('react-toastify');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var XLSX__namespace = /*#__PURE__*/_interopNamespace(XLSX);

const DropZone = ({ onContinue, isLoading }) => {
    const { translations, maxFileSize, dateFormat, parseRaw } = useRsi.useRsi();
    const styles = react.useStyleConfig("UploadStep");
    const [loading, setLoading] = react$1.useState(false);
    const { getRootProps, getInputProps, isDragActive, open } = reactDropzone.useDropzone({
        noClick: true,
        noKeyboard: true,
        maxFiles: 1,
        maxSize: maxFileSize,
        accept: ".xls, .csv, .xlsx",
        onDropRejected: (fileRejections) => {
            setLoading(false);
            fileRejections.forEach((fileRejection) => {
                reactToastify.toast.error(fileRejection.errors[0].message);
            });
        },
        onDrop: async ([file]) => {
            setLoading(true);
            const arrayBuffer = await readFilesAsync.readFileAsync(file);
            const workbook = XLSX__namespace.read(arrayBuffer, { cellDates: true, dateNF: dateFormat, raw: parseRaw });
            setLoading(false);
            onContinue(workbook);
        },
    });
    return (jsxRuntime.jsxs(react.Box, { ...getRootProps(), ...getDropZoneBorder.getDropZoneBorder(styles.dropZoneBorder), width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", flex: 1, className: "file-uploader", children: [jsxRuntime.jsx("input", { ...getInputProps(), "data-testid": "rsi-dropzone" }), isDragActive ? (jsxRuntime.jsx(react.Text, { sx: styles.dropzoneText, children: translations.uploadStep.dropzone.activeDropzoneTitle })) : loading || isLoading ? (jsxRuntime.jsx(react.Text, { sx: styles.dropzoneText, children: translations.uploadStep.dropzone.loadingTitle })) : (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(react.Text, { sx: styles.dropzoneText, children: translations.uploadStep.dropzone.title }), jsxRuntime.jsx(react.Button, { sx: styles.dropzoneButton, onClick: open, children: translations.uploadStep.dropzone.buttonTitle })] }))] }));
};

exports.DropZone = DropZone;
