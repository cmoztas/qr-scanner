import 'react-native-gesture-handler';
import { Provider} from 'react-redux';
import { store } from './store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import QRScanner from './components/QRScanner';

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Splash'
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name='Splash' component={SplashScreen} />
        <Stack.Screen name='QR Scanner' component={QRScanner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}