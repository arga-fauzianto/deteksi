import React from 'react'
import { KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native'
import { colors, fonts } from '../../../utils'
import { Button } from '../../atoms'

const InputChat = ({ value, onChangeText, onButtonPress }) => {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={{flex: 1}}>
      <TextInput 
        style={styles.input}
       placeholder="tulis pesan untuk nairobi" 
       value={value} 
       onChangeText={onChangeText}/>
      </KeyboardAvoidingView>
      <Button 
      disable={value.length < 1} 
      type="btn-icon-send" 
      title="Send" 
      onPress={onButtonPress}/>
    </View>
  )
}

export default InputChat

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    backgroundColor: colors.white
  },
  input: {
    backgroundColor: colors.disable,
    padding: 14,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    fontSize: 14,
    fontFamily: fonts.primary[300],
    maxHeight: 45
  }
})
