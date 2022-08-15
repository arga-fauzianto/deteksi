import React from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import { useDispatch } from 'react-redux'
import { Button, Gap, Input, Link } from '../../components'
import { Fire } from '../../config'
import { colors, fonts, showError, storeData, useForm } from '../../utils'
const Login = ({navigation}) => {

    const dispatch = useDispatch()
    const [form, setForm] = useForm({email: '', password: ''})
  

    const login = () => {
        dispatch({type: 'SET_LOADING', value: true})
        Fire.auth().signInWithEmailAndPassword(form.email, form.password).then(res => {
            dispatch({type: 'SET_LOADING', value: false})
            Fire.database().ref(`users/${res.user.uid}/`).once('value').then(resDB => {
                if(resDB.val()){
                    storeData('user', resDB.val());
                    navigation.replace('MainApp')
                }
            })
        })
        .catch(err => {
            dispatch({type: 'SET_LOADING', value: false})
            showError(err.message)
        });
    }
    return (
            <View style={styles.page}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Gap height={40}/>    
                    <Image 
                     style={{width: 90, height: 90}} 
                     source={require('../../assets/illustration/logo-transparant.png')}
                    />
                    <Text style={styles.title}>Masuk dan mulai berkonsultasi</Text>
                    <KeyboardAvoidingView>
                    <Input label="Email Address" value={form.email} onChangeText={value => setForm('email', value)}/>
                    <Gap height={24}/>
                    <Input label="password" 
                    value={form.password} 
                    onChangeText={value => setForm('password', value)}
                    secureTextEntry
                    />
                    </KeyboardAvoidingView>
                    <Gap height={10}/>
                    <Link title="Forgot My Password" size={12} />
                    <Gap height={40} />
                    <Button title="Sign In" onPress={login}/>
                    <Gap height={30} />
                    <Link title="Create New Account" size={16} align="center" onPress={() => navigation.navigate('Register')}/>
                </ScrollView>
            </View>     
    )
}

export default Login

const styles = StyleSheet.create({
    page: {
        padding: 40,
        flex: 1,
        backgroundColor: colors.white,
    },
    title: {
      fontSize: 20,
      fontFamily: fonts.primary[600],
      color: colors.text.primary,
      marginTop: 40,
      marginBottom: 40
    },
})
