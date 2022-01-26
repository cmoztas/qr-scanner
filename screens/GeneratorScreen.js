import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from 'twrnc';

const GeneratorScreen = () => {
  const [qrValue, setQrValue] = useState('');
  const [qrStatus, setQrStatus] = useState(false);

  const onPressHandler = (value) => {
    setQrStatus(!qrStatus);
    value='';
  }

  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center`}>
      <View style={tw`items-end w-100 p-10`}>
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
        <Button
          title={<Text style={tw`text-white font-semibold text-base`}>{qrStatus ? 'Clear' : 'Generate'}</Text>} 
          onPress={value => onPressHandler(value)}
          icon={<FontAwesome5 name='qrcode' color='#fff' size={18} style={tw`mr-4`} />}
          buttonStyle={ tw`bg-blue-400 border-transparent border-0 rounded-xl`}
          containerStyle={tw`w-50`}
        />
        <Text>{qrValue}</Text>
      </View>
    </SafeAreaView>
  );
};

export default GeneratorScreen;
