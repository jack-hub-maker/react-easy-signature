---
nav:
  title: 手写签名组件
  path: /react-components
---

# Signature

## Demo

```tsx
import React from 'react';
import { Signature } from 'react-easy-signature';

const signatureWidth = window.innerWidth - 600;
export default () => (
  // showBtn大多数时候你可以自己写几个你需要的按钮，这里只是演示，一些个性化的需求可以根据你自己的需求来写
  <Signature
    width={signatureWidth}
    // btnText="手签"
    // showBtn
    // showBtn={<><button>xx</button><button>xxx</button></>}
    // historyUrl="/xx/xx"
    // historyParams={{ uuid: 'xx' }}
    onConfirm={(value: any) => {
      console.log('value-sign: ', value);
    }}
  />
);
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-: | --: | --: |
| historyUrl | 历史签名的 url | `boolean ` \| `string` | false |
| width | 画布宽度 | `number ` | 820 |
| height | 画布高度 | `number ` | 300 |
| historyParams | 历史签名的参数 | `object` | {} |
| showBtn | 是否显示功能按钮或者添加自己的按钮 | `boolean` \| `ReactNode` \| `function` | true |
| onConfirm | 点击确定的回调 | `function` | (value:any)=>{} |
| needPreview | 是否需要图像预览 | `boolean` | true |
| needPrint | 是否需要图像打印 | `boolean` | true |
