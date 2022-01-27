import React, { useRef, useState } from 'react';
import { Text, View, ToastAndroid } from 'react-native';
import {CameraRoll} from '@react-native-community/cameraroll';
import { Button, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from 'twrnc';
import RNFS from "react-native-fs"
import uuid from '@craftzdog/react-native-uuid';
import SvgQRCode from 'react-native-qrcode-svg';

const GeneratorScreen = () => {
  const [qrValue, setQrValue] = useState('');
  const svg = useRef(null);
  
  const onPressHandler = () => {
    svg.toDataURL((data) => {
      RNFS.writeFile(RNFS.CachesDirectoryPath + "/" + uuid.v4() + ".png", data, 'base64')
        .then((success) => {
          return CameraRoll.saveToCameraRoll(RNFS.CachesDirectoryPath + "/" + uuid.v4() + ".png", 'photo')
        })
        .then(() => {
          this.setState({ busy: false, imageSaved: true })
          ToastAndroid.show('Saved to gallery !!', ToastAndroid.SHORT)
        })
    })
  }

  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center`}>
      <View style={tw`items-center w-100 p-10`}>
        <Input
          placeholder='Your QR Value'
          onChangeText={value => setQrValue(value)}
          leftIcon={
            <FontAwesome5
              name='keyboard'
              size={24}
            />
          }
        />
      </View>
      {qrValue != '' && (
        <View style={tw`items-center`}>
          <SvgQRCode value={qrValue} getRef={(ref) => (svg = ref)}/>
          <View style={tw`mt-20`}></View>
          <Button
            title={<Text style={tw`text-white font-semibold text-base`}>Download QR</Text>}
            onPress={() => onPressHandler}
            icon={<FontAwesome5 name='qrcode' color='#fff' size={18} style={tw`mr-4`} />}
            buttonStyle={tw`bg-blue-400 border-transparent border-0 rounded-xl`}
            containerStyle={tw`w-50`}
          />
        </View>
      )
      }
    </SafeAreaView>
  );
};

export default GeneratorScreen;
