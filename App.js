import React, { useState, useEffect, useCallback } from "react";
import { Text, View } from 'react-native';
import { gStyle } from "./Style/style";
import Navigation from './navigate';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [userData, setUserData] = useState({});
  const [fontsLoaded] = useFonts({
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });

  useEffect(() => {
    const loadFonts = async () => {
      await SplashScreen.hideAsync();
    };
    loadFonts();
  }, []);

  const TabNavigationWrapper = useCallback(() => (
    <Navigation userData={userData} setUserData={setUserData} />
  ), [userData, setUserData]);

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <View style={gStyle.main}>
      <Text style ={{ fontFamily: 'Roboto-Bold', fontSize: 20 }}>My test font</Text>
      <TabNavigationWrapper />
    </View>
  );
}