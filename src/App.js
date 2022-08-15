import React from 'react'
import { StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Router from './navigation';
import { colors } from './utils'
import FlashMessage from "react-native-flash-message"

// redux

import {Provider, useSelector} from 'react-redux';
import store from './redux/store';
import {LogBox} from 'react-native'


const MainApp = () => {
  const stateGlobal = useSelector(state => state)
  LogBox.ignoreLogs([' Setting a timer'])
  
  return (
  <> 
 
   <NavigationContainer>
     <Router />
   </NavigationContainer>
   <FlashMessage position="top" style={styles.showMessage}/>
  </> 
  )
}

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({
  showMessage: {
    padding: 5,
    marginTop: 15,
    textAlign: 'center'
  },
  titleStyle: {top: 5},
})
