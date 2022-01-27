import { Linking, ScrollView, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRScanner from '../components/QRScanner';
import tw from 'twrnc';
import { useSelector } from 'react-redux';
import { selectQrValues, selectScanStatus } from '../slices/scanSlice';
import { Button, Divider } from 'react-native-elements';

const ScannerScreen = () => {
  const qrValues = useSelector(selectQrValues);
  const scanStatus = useSelector(selectScanStatus);

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`h-1/2`}>
        <QRScanner />
      </View>
      <View style={tw`h-1/2 p-5`}>
        {!scanStatus && (
          <View>
            <Text
              style={tw`text-black text-center font-bold mb-5`}
            >
              Scanned barcode Values will be appeared down.
            </Text>
            <Divider style={tw`mb-5`} />
          </View>
        )
        }
        {qrValues && scanStatus && (
          <ScrollView>
            <View style={tw`flex-row items-center flex-wrap`}>
              <Text style={tw`font-bold mr-10 text-base`}>Type: </Text>
              <Text>{qrValues.qrType}</Text>
            </View>
            <Divider style={tw`my-5`} />
            <View style={tw`flex-row items-center flex-wrap`}>
              <Text style={tw`font-bold mr-10 text-base`}>Data: </Text>
              <Text>{qrValues.qrData}</Text>
            </View>
            <Divider style={tw`my-5`} />
            {qrValues.qrDataType === 'Link' && (
              <View style={tw`flex-row items-center justify-center`}>
                <Button
                  title="Open in browser"
                  onPress={() => Linking.openURL(qrValues.qrData)}
                  icon={{ name: 'globe', type: 'font-awesome', size: 15, color: 'white' }}
                  iconContainerStyle={tw`mr-2`}
                  titleStyle={{ fontWeight: '600' }}
                  buttonStyle={tw`bg-blue-400 border-transparent border-0 rounded-xl my-5`}
                  containerStyle={tw`w-50`}
                />
              </View>
            )
            }
          </ScrollView>
        )
        }
      </View>
    </SafeAreaView>
  );
};

export default ScannerScreen;
