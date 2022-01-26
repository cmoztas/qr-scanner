import React from 'react';
import SvgQRCode from 'react-native-qrcode-svg';

export default QRGenerator = (props) => {
  return (
    <SvgQRCode value={props.value} />
  );
};