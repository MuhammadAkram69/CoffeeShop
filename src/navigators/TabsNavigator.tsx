import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from 'react'
import { COLORS } from '../theme/theme';
import { BlurView } from '@react-native-community/blur';
import CustomIcons from '../components/CustomIcons';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import PaymentScreen from '../screens/PaymentScreen';


const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false, tabBarHideOnKeyboard: true, tabBarShowLabel: false, tabBarStyle: styles.tabBarStyles, tabBarBackground: () => (
                <BlurView overlayColor='' blurAmount={15} style={styles.BlurViewStyles} />
            )
        }}>
            <Tab.Screen name='Home' component={HomeScreen} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <CustomIcons name='home' size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
                )
            }} />
            <Tab.Screen name='Cart' component={CartScreen} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <CustomIcons name='cart' size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
                )
            }} />
            <Tab.Screen name='Favourite' component={FavouritesScreen} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <CustomIcons name='like' size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
                )
            }} />
            <Tab.Screen name='PaymentHistory' component={PaymentScreen} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <CustomIcons name='bell' size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
                )
            }} />
        </Tab.Navigator>
    )
}

export default TabsNavigator

const styles = StyleSheet.create({
    tabBarStyles: {
        height: 80,
        position: "absolute",
        borderTopWidth: 0,
        elevation: 0,
        borderTopColor: 'transparent',
        backgroundColor: COLORS.primaryBlackRGBA,
    },
    BlurViewStyles: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }
})