import React, { useEffect } from 'react';
import { Button, Linking, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectCameraPermission, setCameraPermission } from '../slices/permissionSlice';
import { selectScanStatus, setQrValues, setScanStatus } from '../slices/scanSlice';
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';

const QRScanner = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const cameraPermission = useSelector(selectCameraPermission);
  const scanStatus = useSelector(selectScanStatus);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermissionsAsync();
      dispatch(setCameraPermission(status.granted));
    })();
  }, []);

  if (cameraPermission === null) {
    return (<Text>Requesting for camera permission</Text>)
  } else if (cameraPermission === false) {
    return <Text>No access to camera</Text>
  }

  const handleBarCodeScanned = async ({ type, data }) => {
    let dataType;
    await checkDataType(data).then(data => dataType = data);
    
    dispatch(setScanStatus(true));
    dispatch(setQrValues({
      qrType: type,
      qrData: data,
      qrDataType: dataType
    }));
  }

  const checkDataType = async (data) => {
    let type = await Linking.canOpenURL(data)
      .then(data => data ? type = 'Link' : type = 'Text')
      .catch(error => console.log(error));

    return type;
  }

  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center`}>
      {
        cameraPermission && isFocused && !scanStatus && (
          <Camera
            barCodeScannerSettings={{
              barCodeTypes: [
                BarCodeScanner.Constants.BarCodeType.aztec,
                BarCodeScanner.Constants.BarCodeType.codabar,
                BarCodeScanner.Constants.BarCodeType.code39,
                BarCodeScanner.Constants.BarCodeType.code93,
                BarCodeScanner.Constants.BarCodeType.code128,
                BarCodeScanner.Constants.BarCodeType.code39mod43,
                BarCodeScanner.Constants.BarCodeType.datamatrix,
                BarCodeScanner.Constants.BarCodeType.ean13,
                BarCodeScanner.Constants.BarCodeType.ean8,
                BarCodeScanner.Constants.BarCodeType.interleaved2of5,
                BarCodeScanner.Constants.BarCodeType.itf14,
                BarCodeScanner.Constants.BarCodeType.maxicode,
                BarCodeScanner.Constants.BarCodeType.pdf417,
                BarCodeScanner.Constants.BarCodeType.rss14,
                BarCodeScanner.Constants.BarCodeType.rssexpanded,
                BarCodeScanner.Constants.BarCodeType.upc_a,
                BarCodeScanner.Constants.BarCodeType.upc_e,
                BarCodeScanner.Constants.BarCodeType.upc_ean,
                BarCodeScanner.Constants.BarCodeType.qr,
              ],
            }}
            onBarCodeScanned={scanStatus ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        )
      }

      {scanStatus &&
        <View style={[tw`w-full h-full bg-gray-200 flex-1 items-center justify-center`]}>
          <Button
            title={'Tap to scan again'}
            onPress={() => {
              dispatch(setScanStatus(false));
            }}
          />
        </View>
      }
    </SafeAreaView>
  );
};

export default QRScanner;
