import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text } from 'react-native';

import {
  Lexend_100Thin,
  Lexend_300Light,
  Lexend_400Regular,
  Lexend_500Medium,
  Lexend_600SemiBold,
  Lexend_700Bold,
  Lexend_800ExtraBold,
  Lexend_900Black,
} from '@expo-google-fonts/lexend';

// Import screens
import HomeScreen from './screens/HomeScreen';
import PreMatchScreen from './screens/PreMatchScreen';
import PostMatchScreen from './screens/PostMatchScreen';
import InsightsScreen from './screens/InsightsScreen';
import ProfileScreen from './screens/ProfileScreen';
import MatchDetailsScreen from './screens/MatchDetailsScreen';
import PredictionsScreen from './screens/PredictionsScreen';
import FantasyScreen from './screens/FantasyScreen';
import PlayerDetailsScreen from './screens/PlayerDetailsScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';

// Import Providers
import { MatchProvider } from './context/MatchContext';
import { ThemeProvider } from './context/ThemeContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0a0f14',
          borderTopColor: 'rgba(255,255,255,0.05)',
          borderTopWidth: 1,
          paddingBottom: 25,
          paddingTop: 12,
          height: 90,
          elevation: 0,
        },
        tabBarActiveTintColor: '#258cf4',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.4)',
        tabBarLabelStyle: {
          fontSize: 9,
          fontFamily: 'Lexend-Bold',
          textTransform: 'uppercase',
          letterSpacing: 1,
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Predictions"
        component={PredictionsScreen}
        options={{
          tabBarLabel: 'AI Predict',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "auto-fix" : "auto-fix"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Fantasy"
        component={FantasyScreen}
        options={{
          tabBarLabel: 'Fantasy',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "trophy" : "trophy-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{
          tabBarLabel: 'Ranks',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "medal" : "medal-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "account" : "account-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'Lexend-Thin': Lexend_100Thin,
          'Lexend-Light': Lexend_300Light,
          'Lexend-Regular': Lexend_400Regular,
          'Lexend-Medium': Lexend_500Medium,
          'Lexend-SemiBold': Lexend_600SemiBold,
          'Lexend-Bold': Lexend_700Bold,
          'Lexend-ExtraBold': Lexend_800ExtraBold,
          'Lexend-Black': Lexend_900Black,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0a0f14', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#ffffff', fontFamily: 'Lexend-Bold' }}>Loading Cricores Intelligence...</Text>
      </View>
    );
  }

  return (
    <ThemeProvider>
      <MatchProvider>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <StatusBar style="light" />
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Main" component={HomeTabs} />
              <Stack.Screen name="MatchDetails" component={MatchDetailsScreen} />
              <Stack.Screen name="PlayerDetails" component={PlayerDetailsScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </MatchProvider>
    </ThemeProvider>
  );
}

