import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import TabsNavigator from './src/navigators/TabsNavigator'
import DetailsScreen from './src/screens/DetailsScreen'
import PaymentScreen from './src/screens/PaymentScreen'
import OrderHistoryScreen from './src/screens/OrderHistoryScreen'

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={TabsNavigator} options={{ animation: "slide_from_bottom" }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ animation: "slide_from_bottom" }} />
        <Stack.Screen name="Payment" component={PaymentScreen} options={{ animation: "slide_from_bottom" }} />
        <Stack.Screen name="History" component={OrderHistoryScreen} options={{ animation: "slide_from_bottom" }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({})

export default App
