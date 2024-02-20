import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { SketchPicker } from 'react-color';
import styles from './ColorPicker.less';

//简易颜色选择器
const ColorPicker = (props, ref) => {
  const [color, setColor] = useState('#cdd6e0');
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
    <div>
      <div className={styles.swatch} style={{ background: color }} onClick={handleClick}>
        <div className={styles.color} />
      </div>
      {displayColorPicker ? (
        <div className={styles.popover}>
          <div className={styles.cover} onClick={handleClose} />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default forwardRef(ColorPicker);
