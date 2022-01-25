import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectCameraPermission, setCameraPermission } from '../slices/permissionSlice';
import { selectQrValues, selectScanStatus, setQrValues, setScanStatus } from '../slices/scanSlice';
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

  const handleBarCodeScanned = ({ type, data }) => {
    dispatch(setScanStatus(true));
    dispatch(setQrValues({ type: type, data: data }));
  }
  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center`}>
      {
        cameraPermission && isFocused && !scanStatus &&(
          <Camera
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
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
