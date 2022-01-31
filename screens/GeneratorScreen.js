import React, { useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from 'twrnc';
import SvgQRCode from 'react-native-qrcode-svg';
import { FileSystem, StorageAccessFramework } from 'expo-file-system';
import MediaLibrary from 'expo-media-library';

const GeneratorScreen = () => {
  const [qrValue, setQrValue] = useState('');
  let svg = useRef(null);

  const getDataURL = async () => {
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (permissions.granted) {

      // const data = "data:image/png;base64,ASDFASDFASDf........"
      // const base64Code = data.split("data:image/png;base64,")[1];
      // const filename = FileSystem.documentDirectory + "some_unique_file_name.png";
      // await FileSystem.writeAsStringAsync(filename, base64Code, {
      //   encoding: FileSystem.EncodingType.Base64,
      // });

      // const mediaResult = await MediaLibrary.saveToLibraryAsync(filename);

      const uri = permissions.directoryUri;
      console.log(uri);
      await svg.toDataURL(data => {
        StorageAccessFramework.createFileAsync('test', 'image/png')
          .then(data2 => StorageAccessFramework.writeAsStringAsync(uri.replace('%3A', '/'), data)
          .then(data3 => console.log(data3))
          .catch(err => console.log(err))
        );
      });
    }
  }

  const onPressHandler = () => {
    getDataURL();
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
          <SvgQRCode value={qrValue} getRef={ref => svg = ref} onError={err => console.log(err)} />
          <View style={tw`mt-20`}></View>
          <Button
            title={<Text style={tw`text-white font-semibold text-base`}>Download QR</Text>}
            onPress={() => onPressHandler()}
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
