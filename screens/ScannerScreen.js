import { Linking, Text, View } from 'react-native';
import React, { useState } from 'react';
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
        <Text style={tw`text-xl text-black text-center font-bold mb-10`}>Scanned QR Code Values will be appeared down</Text>
        {qrValues && scanStatus && (
          <View>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`font-bold mr-10 text-base`}>Type: </Text>
              <Text>{qrValues.qrType}</Text>
            </View>
            <Divider style={tw`my-5`} />
            <View style={tw`flex-row items-center`}>
              <Text style={tw`font-bold mr-10 text-base`}>Data: </Text>
              <Text>{qrValues.qrData}</Text>
            </View>
            <Divider style={tw`my-5`} />
            <View style={tw`flex-row items-center`}>
              <Text style={tw`font-bold mr-10 text-base`}>Data Type: </Text>
              <Text>{qrValues.qrDataType}</Text>
            </View>
            <Divider style={tw`my-5`} />
            {qrValues.qrDataType === 'link' && (
              <View style={tw`flex-row items-center justify-center`}>
                <Button
                  title="Open in browser"
                  onPress={() => Linking.openURL(qrValues.qrData)}
                  icon={{ name: 'globe', type: 'font-awesome', size: 15, color: 'white' }}
                  iconContainerStyle={{ marginRight: 10 }}
                  titleStyle={{ fontWeight: '700' }}
                  buttonStyle={{ backgroundColor: 'rgba(90, 154, 230, 1)', borderColor: 'transparent', borderWidth: 0, borderRadius: 30 }}
                  containerStyle={{ width: 200 }}
                />
              </View>
            )
            }
          </View>
        )
        }
      </View>
    </SafeAreaView>
  );
};

export default ScannerScreen;
