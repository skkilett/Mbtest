import React, { useState } from "react";
import { Image } from 'react-native';
import Homepage from './components/Homepage';
import Account from './components/Account';
import Settings from './components/Settings';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Details from "./components/Details";

const Stack = createNativeStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ 
        width: 128,
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 8
      }}
      source={require('./assets/mainicon.png')}
    />
  );
}

function StackScreen({userData, setUserData}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
      }}
    >
      <Stack.Screen
        name='Homepage'
        children={()=><Homepage userData={userData} setUserData={setUserData}/>}
        options={{ 
          headerTitle: (props) => <LogoTitle />,
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerShadowVisible: false,
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  )
}

function AccountStackScreen({userData, setUserData}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Account'
        children={()=><Account userData={userData} setUserData={setUserData}/>}
        options={{ 
          title: 'Account',
        }}
      />

    <Stack.Screen 
        name="Details" 
        options={{ 
          title: 'Details',
        }}
        component={Details} /> 
    </Stack.Navigator>
  )
}


function SettingsStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Settings'
        component={Settings}
        options={{ 
          title: 'Settings',
        }}
      />
    </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator();
export default function Navigation({userData, setUserData}) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#141414',
          tabBarInactiveTintColor: '#787878',
          tabBarShowLabel: true,
          tabBarStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            borderTopWidth: 0,
          },
          tabBarLabelStyle: {
            fontSize: 14,
          },
        }}
      >
        <Tab.Screen 
          name="Home" 
          tabBarOptions = {{ showIcon: true }} 
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={
                  focused
                  ? require('./assets/hometablogoactive.png')
                  : require('./assets/hometablogoinactive.png')
                }
                style={{
                  width: size,
                  height: size,
                  borderRadius: size,
                }}
              />
            ),
          }}
          children={()=><StackScreen userData={userData} setUserData={setUserData}/>}
        />
        <Tab.Screen 
          name="My account" 
          tabBarOptions = {{ showIcon: true }} 
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={
                  focused
                  ? require('./assets/accounttablogoactive.png')
                  : require('./assets/accounttablogoinactive.png')
                }
                style={{
                  width: size,
                  height: size,
                  borderRadius: size,
                }}
                />
              ),
            }}
            component={AccountStackScreen}
          />
          <Tab.Screen 
            name="MySettings" 
            tabBarOptions = {{ showIcon: true }} 
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({ focused, color, size }) => (
                <Image
                  source={
                    focused
                    ? require('./assets/settingstablogoactive.png')
                    : require('./assets/settingstablogoinactive.png')
                  }
                  style={{
                    width: size,
                    height: size,
                    borderRadius: size,
                  }}
                />
              ),
            }}
            component={SettingsStackScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
      );
    }