import React, { useState, useRef, isValidElement } from 'react';
import ColorPicker from './ColorPicker';
import { historyMock } from './historyMock';
import ReactToPrint from 'react-to-print';
import './Signature.less';

// 画布签名组件
const Signature = ({
  historyUrl = false, //历史签名的url
  historyParams = {}, //历史签名的参数
  showBtn = true, //是否显示按钮
  onConfirm, //点击确定给父组件的回调
  width = 820, //画布宽度
  height = 300, //画布高度
  needPreview = true, //是否需要预览
  needPrint = true, //是否需要打印
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingSteps, setDrawingSteps] = useState([]);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [dataURL, setDataURL] = useState('');
  const domRef = useRef();

  const colorPickerRef = useRef(null);
  // 定义一个临时变量用于存储当前笔画步骤
  const canvasRef = useRef(null);
  // 判断是否是移动端设备
  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  }
  console.log('isMobileDevice: ', isMobileDevice());
  //历史签名
  const historyImgChange = async (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const img = new Image();
    img.onload = function () {
      context.clearRect(0, 0, width, height);
      context.drawImage(img, 0, 0, width, height);
      setDrawingSteps([]);
    };
    //这里是demo效果，暂时放到了localStorage里，正常情况你可以存到数据库
    // const res = await historyUrl(historyParams);
    const tmp = localStorage.getItem('tmpUrl');
    img.src = historyUrl || tmp || historyMock;
  };

  const handleMouseMove = (e) => {
    const colors = colorPickerRef.current?.color;
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const newX = isMobileDevice() ? e.touches[0].pageX : e.nativeEvent.offsetX;
    const newY = isMobileDevice() ? e.touches[0].pageY : e.nativeEvent.offsetY;
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(newX, newY);
    context.strokeStyle = colors; //颜色
    context.stroke();
    setLastX(newX);
    setLastY(newY);
    setDrawingSteps([...drawingSteps, { lastX, lastY, newX, newY, color: colors }]);
  };
  const handleMouseDown = (e) => {
    setIsDrawing(true);
    if (isMobileDevice() && e.touches) {
      setLastX(e.touches[0]?.pageX);
      setLastY(e.touches[0]?.pageY);
    } else {
      setLastX(e.nativeEvent?.offsetX);
      setLastY(e.nativeEvent?.offsetY);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  //上一步
  const undoStep = (e) => {
    e.preventDefault();
    if (drawingSteps.length > 0) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const lastStep = drawingSteps[drawingSteps.length - 1];
      context.clearRect(0, 0, width, height);
      drawingSteps.slice(0, -1).forEach((step) => {
        context.beginPath();
        context.moveTo(step.lastX, step.lastY);
        context.lineTo(step.newX, step.newY);
        context.strokeStyle = step.color; // 恢复之前的颜色
        context.stroke();
      });
      setDrawingSteps(drawingSteps.slice(0, -1));
    }
  };

  // 生成图片预览/确定
  const generateOk = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const tmpImg = canvas.toDataURL();
    // console.log('tmpImg: ', tmpImg);
    setDataURL(tmpImg);
    if (onConfirm) {
      onConfirm(tmpImg);
    }
    localStorage.setItem('tmpUrl', tmpImg); //模拟存到数据库
    return tmpImg;
  };
  // 清除
  const clearAll = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, width, height);
    setDataURL('');
    setDrawingSteps([]);
  };
  return (
    <div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ border: '1px solid #000', display: 'flex', justifyContent: 'center' }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      ></canvas>
      {showBtn && (
        <div>
          {isValidElement(showBtn) ? (
            showBtn
          ) : typeof showBtn === 'function' ? (
            showBtn()
          ) : (
            <div className="content">
              <div>
                <ColorPicker ref={colorPickerRef} />
              </div>
              <div className="btnCommon" onClick={(e) => undoStep(e)}>
                上一步
              </div>
              <div className="btnCommon" onClick={(e) => clearAll(e)}>
                重新签名
              </div>
              <div className="btnCommon" onClick={(e) => historyImgChange(e)}>
                历史签名
              </div>
              <div className="btnCommon" onClick={(e) => generateOk(e)}>
                生成图片
              </div>
              {!!dataURL && needPreview && needPrint && (
                <ReactToPrint
                  trigger={() => <div className="btnCommon">打印</div>}
                  content={() => domRef.current}
                />
              )}
            </div>
          )}
        </div>
      )}
      {!!dataURL && needPreview && (
        <img src={dataURL} ref={domRef} width={width} height={height} className="border" />
      )}
    </div>
  );
};

export default Signature;
