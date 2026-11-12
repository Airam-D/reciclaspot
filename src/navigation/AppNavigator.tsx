import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList, BottomTabParamList } from '../types';
import { Colors } from '../theme/colors';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import ExplorarScreen from '../screens/ExplorarScreen';
import MapaScreen from '../screens/MapaScreen';
import SalvosScreen from '../screens/SalvosScreen';
import PerfilScreen from '../screens/PerfilScreen';
import DetalhesScreen from '../screens/DetalhesScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: Colors.primaryDark,
                tabBarInactiveTintColor: Colors.textSecondary,
                tabBarStyle: {
                    height: 68,
                    paddingBottom: 10,
                    paddingTop: 8,
                    backgroundColor: Colors.surface,
                    borderTopColor: Colors.border,
                    borderTopWidth: 1,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                    marginTop: 2,
                },
                tabBarIcon: ({ focused, color }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = 'compass-outline';

                    if (route.name === 'Explorar') {
                        iconName = focused ? 'compass' : 'compass-outline';
                    } else if (route.name === 'Mapa') {
                        iconName = focused ? 'map' : 'map-outline';
                    } else if (route.name === 'Salvos') {
                        iconName = focused ? 'heart' : 'heart-outline';
                    } else if (route.name === 'Perfil') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return (
                        <View style={[styles.iconPill, focused && styles.iconPillActive]}>
                            <Ionicons name={iconName} size={20} color={color} />
                        </View>
                    );
                },
            })}
        >
            <Tab.Screen name="Explorar" component={ExplorarScreen} />
            <Tab.Screen name="Mapa" component={MapaScreen} />
            <Tab.Screen name="Salvos" component={SalvosScreen} options={{ tabBarLabel: 'Salvo' }} />
            <Tab.Screen name="Perfil" component={PerfilScreen} />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="MainTabs" component={MainTabs} />
                <Stack.Screen name="Detalhes" component={DetalhesScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    iconPill: {
        paddingHorizontal: 14,
        paddingVertical: 4,
        borderRadius: 16,
    },
    iconPillActive: {
        backgroundColor: Colors.badgeGreenBg,
    },
});