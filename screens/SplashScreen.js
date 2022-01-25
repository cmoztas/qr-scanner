import { View, Image } from 'react-native';
import React, { useEffect } from 'react';
import logo from '../assets/images/cmo-logo.png';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Home');
        }, 2000);
    }, []);

    return (
        <View style={tw`flex-1 items-center justify-center`}>
            <Image source={logo} />
        </View>
    );
};

export default SplashScreen;
