function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}
function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(r, l) {
  var t =
    null == r ? null : ('undefined' != typeof Symbol && r[Symbol.iterator]) || r['@@iterator'];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (((i = (t = t.call(r)).next), 0 === l)) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      (o = !0), (n = r);
    } finally {
      try {
        if (!f && null != t.return && ((u = t.return()), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { SketchPicker } from 'react-color';
import './ColorPicker.less';

//简易颜色选择器
var ColorPicker = function ColorPicker(props, ref) {
  var _useState = useState('#090e27'),
    _useState2 = _slicedToArray(_useState, 2),
    color = _useState2[0],
    setColor = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    displayColorPicker = _useState4[0],
    setDisplayColorPicker = _useState4[1];
  var handleChange = function handleChange(color) {
    setColor(color.hex);
  };
  var handleClick = function handleClick() {
    setDisplayColorPicker(!displayColorPicker);
  };
  var handleClose = function handleClose() {
    setDisplayColorPicker(false);
  };
  useImperativeHandle(ref, function () {
    return {
      color: color,
    };
  });
  return /*#__PURE__*/ React.createElement(
    'div',
    {
      className: 'layout',
    },
    '\u989C\u8272\uFF1A',
    /*#__PURE__*/ React.createElement(
      'div',
      {
        className: 'swatch',
        style: {
          background: color,
        },
        onClick: handleClick,
      },
      /*#__PURE__*/ React.createElement('div', {
        className: 'color',
      }),
    ),
    displayColorPicker
      ? /*#__PURE__*/ React.createElement(
          'div',
          {
            className: 'popover',
          },
          /*#__PURE__*/ React.createElement('div', {
            className: 'cover',
            onClick: handleClose,
          }),
          /*#__PURE__*/ React.createElement(SketchPicker, {
            color: color,
            onChange: handleChange,
          }),
        )
      : null,
  );
};
export default /*#__PURE__*/ forwardRef(ColorPicker);
