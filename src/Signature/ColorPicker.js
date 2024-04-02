import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { SketchPicker } from 'react-color';
import './ColorPicker.less';

//简易颜色选择器
const ColorPicker = (props, ref) => {
  const [color, setColor] = useState('#090e27');
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const handleChange = (color) => {
    setColor(color.hex);
  };
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };
  const handleClose = () => {
    setDisplayColorPicker(false);
  };
  useImperativeHandle(ref, () => ({
    color,
  }));
  return (
    <div className="layout">
      颜色：
      <div className="swatch" style={{ background: color }} onClick={handleClick}>
        <div className="color" />
      </div>
      {displayColorPicker ? (
        <div className="popover">
          <div className="cover" onClick={handleClose} />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default forwardRef(ColorPicker);
