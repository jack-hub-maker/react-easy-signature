export declare module './Signature' {
  import { ReactNode } from 'react';

  interface SignatureProps {
    historyUrl?: string;
    historyParams?: object;
    showBtn?: boolean | ReactNode;
    onConfirm?: (value: any) => void;
    width?: number;
    height?: number;
    needPreview?: boolean;
  }

  const Signature: React.FC<SignatureProps>;

  export default Signature;
}
