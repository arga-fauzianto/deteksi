import React from 'react'
import {
    Image, StyleSheet,
    Text, TouchableOpacity, View
} from 'react-native'
import { colors, fonts } from '../../../utils'

const NewsItem = ({title, date, image, onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.6}>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
            <Image 
             source={{uri: image}} 
             style={styles.image}
            />
        </TouchableOpacity>
    )
}

export default NewsItem

const styles = StyleSheet.create({
    title: {
        fontFamily: fonts.primary[600],
        fontSize: 16,
        color: colors.text.primary,
        maxWidth: '90%'
    },
    date: {
        fontFamily: fonts.primary[400],
        fontSize: 12,
        color: colors.text.secondary,
        marginTop: 4,
    },
    container: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingBottom: 12,
        paddingTop: 16,
        paddingHorizontal: 16
    },
    image: {
        width: 80,
        height: 60,
        borderRadius: 11,
    },
    titleWrapper: {
        flex: 1
    }
})
