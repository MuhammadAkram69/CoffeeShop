import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useStore } from '../store/store'
const HomeScreen = () => {
    const CoffeeList = useStore((state: any) => state?.CoffeeList)
    console.log("CoffeeList", CoffeeList?.length)
    return (
        <View>
            {CoffeeList?.map((list: any) => (
                <Text key={list.id}>
                    {list?.name}
                </Text>
            ))}
        </View>
    )
}
const styles = StyleSheet.create({})

export default HomeScreen
