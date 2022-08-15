import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { fonts, colors } from '../../../utils'

const IsMe = ({text, date}) => {
    return (
        <View style={styles.container}>
            <View style={styles.chatContent}>
              <Text style={styles.text}>{text}</Text>
            </View>
            <Text style={styles.date}>{date}</Text>
        </View>
    )
}

export default IsMe

const styles = StyleSheet.create({
    chatContent: {
        padding: 12,
        paddingRight: 18,
        backgroundColor: colors.cardLight,
        maxWidth: '70%',
        borderBottomRightRadius: 0,
        borderRadius: 10
    },
    container: {
        alignItems: 'flex-end',
        marginBottom: 20,
        paddingRight: 16
    },
    text: {
        fontFamily: fonts.primary[400],
        fontSize: 14,
        color: colors.text.primary
    },
    date: {
        fontSize: 11,
        fontFamily: fonts.primary[400],
        marginTop: 8,
        color: colors.text.secondary
    }
})
