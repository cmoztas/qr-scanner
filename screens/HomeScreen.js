import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GeneratorScreen from './GeneratorScreen';
import ScannerScreen from './ScannerScreen';

const HomeScreen = () => {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName='QR Scanner'
      backBehavior='none'
      activeColor="#fff"
      inactiveColor='#ccc'
      barStyle={{ 
        backgroundColor: 'tomato',
      }}
      labeled={false}
    >
      <Tab.Screen 
        name='QRScanner'
        component={ScannerScreen}
        options={{
          tabBarLabel: 'Scanner',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons 
              name='barcode-scan'
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen 
        name='QRGenerator'
        component={GeneratorScreen}
        options={{
          tabBarLabel: 'Generator',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons 
              name='qrcode-edit'
              color={color}
              size={24}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
