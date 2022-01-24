import { BarCodeScanner } from 'expo-barcode-scanner';
import { useEffect } from 'react';
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import { selectCameraPermission, setCameraPermission } from './slices/permissionSlice';
import { selectScanStatus, setScanStatus } from './slices/scanSlice';
import { store } from './store';

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export function App() {
  const dispatch = useDispatch();
  const cameraPermission = useSelector(selectCameraPermission);
  const scanStatus = useSelector(selectScanStatus);

  useEffect(() => {
    (async () => {
      const status = await BarCodeScanner.requestPermissionsAsync();
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
    alert(`Type: ${type}\nData: ${data}`)
  }

  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center`}>
      {
        cameraPermission !== null && cameraPermission !== false && (
          <BarCodeScanner
            style={StyleSheet.absoluteFillObject}
            onBarCodeScanned={scanStatus ? undefined : handleBarCodeScanned}
          />
        )
      }
      {scanStatus &&
        <Button
          title={'Tap to scan again'}
          onPress={() => {
            dispatch(setScanStatus(false));
          }}
        />
      }
    </SafeAreaView>
  );
}