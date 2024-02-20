import React from 'react';
import Signature from './Signature';

export default ({ title }: { title: string }) => (
  <Signature
    // width={810}
    // btnText="手签"
    showBtn
    // historyUrl="/dataIntegrity/historySign"
    // historyParams={{ uuid: 'xx' }}
    onConfirm={(value: any) => {
      console.log('value-sign: ', value);
      //do something
    }}
  />
);
