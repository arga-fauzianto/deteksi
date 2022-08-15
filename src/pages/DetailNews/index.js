import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { IconBackLight } from '../../assets'
import { colors, fonts } from '../../utils'

const DetailNews = ({ route, navigation }) => {
  const {width, height} = Dimensions.get('window')
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.headerNews}>
        <TouchableOpacity activeOpacity={0.6} style={styles.btnBackNews} onPress={() =>navigation.goBack()}>
          <IconBackLight />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>News</Text>
      </View>
      <View >
         <View style={{ marginTop: 10, padding: 6, marginLeft: 5}}>
           <Text style={styles.textNewsTitle}>{route.params.news.title}</Text>
         </View>
         <Image source={{uri: route.params.news.image}} style={{width: width, height: width}}/>
         <View style={styles.wrapBodyNews}>
          <Text style={styles.contentTextNews}>{route.params.news.body}</Text>
         </View>
      </View>
    </ScrollView>
  )
}

export default DetailNews

const styles = StyleSheet.create({
    headerNews: {
      backgroundColor: colors.secondary,
      padding: 15,
      
      flexDirection: "row",
      justifyContent: 'center'
    },
    btnBackNews: { 
      right: 135,
      width: 25, 
      alignItems: "center"
    },
    titleHeader: {
      color: colors.white,
      fontFamily: fonts.primary[600],
      fontSize: 18
    },
    textNewsTitle: {
      fontFamily: fonts.primary[700],
      fontSize: 20,
      color: colors.black,
    },
    container: {
      backgroundColor: 'white',
    },
    wrapBodyNews: {
      padding: 12,
      marginBottom: 10,
    },
    contentTextNews: {
      fontFamily: fonts.primary[600],
      textAlign: 'justify',
      lineHeight: 35,
    }

})