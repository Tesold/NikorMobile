import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {AppView} from './navigation/AppNavigation'
import React from 'react';
import { Provider } from 'react-redux'
import { store } from './redux/store';

export default function App() {

  let [fontsLoaded] = useFonts({
    'OpenSans': require('./assets/fonts/OpenSans.ttf'),
  });;

  const styles = StyleSheet.create(
    {
      container:
      {
        flex: 1
      }
    }
  )

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    
    <Provider store = {store}>
    <NavigationContainer>
      <AppView />
    </NavigationContainer>
    </Provider>
    
  );
  
}
