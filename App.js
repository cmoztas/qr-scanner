import { BarCodeScanner } from 'expo-barcode-scanner';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import tw from 'twrnc';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const status = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status.granted);
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  } else if(hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  const handleBarCodeScanned = ({type, data}) =>{
    setScanned(true);
    alert(`Type: ${type}\nData: ${data}`)
  }

  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center`}>
      <BarCodeScanner 
        style= {StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      {scanned && 
        <Button 
          title={'Tap to scan again'}
          onPress={() => {
            setScanned(false);
          }}
        />
      }
    </SafeAreaView>
  );
}