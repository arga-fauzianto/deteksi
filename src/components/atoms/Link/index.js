import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, fonts } from '../../../utils'


const Link = ({ onPress ,title, size, align }) => {
    return (
        <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
            <Text style={styles.text(size, align)}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Link

const styles = StyleSheet.create({
    text: (size, align) => ({
        fontSize: size,
        color: colors.text.secondary,
        fontFamily: fonts.primary[400],
        textDecorationLine: 'underline',
        textAlign: align,
    })
})
