import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS, SPACING } from '../theme/theme'
import CustomIcons from './CustomIcons'

interface GradientBGiconProps {
    name: string,
    color: string,
    size: number,
}
const GradientBGicon: React.FC<GradientBGiconProps> = ({ name, color, size }) => {
    return (
        <View style={styles.Container}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                style={styles.linearGradientBG}
            >
                <CustomIcons name={name} size={size} color={color} />
            </LinearGradient>
        </View>
    )
}
const styles = StyleSheet.create({
    Container: {
        borderWidth: 2,
        borderColor: COLORS.secondaryDarkGreyHex,
        borderRadius: SPACING.space_12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.secondaryDarkGreyHex,
        overflow: "hidden",
    },
    linearGradientBG: {
        height: SPACING.space_36,
        width: SPACING.space_36,
        alignItems: "center",
        justifyContent: "center",
    }
})

export default GradientBGicon
