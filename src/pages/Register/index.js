import React, {useState} from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Header, Input, Button, Gap} from '../../components'
import { colors, showError, storeData, useForm } from '../../utils'
import {Fire} from '../../config'

import { useDispatch } from 'react-redux'
import { showMessage } from 'react-native-flash-message'


const Register = ({navigation}) => {
    // const [age, setAge] = useState(18)
    const dispatch = useDispatch()
    const [form, setForm] = useForm({
        fullName: '',
        profession: '',
        email: '',
        age: 18,
        password: '',
    })

    const onContinue = () => {
        // const age = 18;
        if (form.age >= 18 ) {
           successReg();
        } else {
            showMessage({
                message: 'Oops mohon maaf umur anda belum cukup',
                type: 'default',
                backgroundColor: colors.error,
                color: colors.white
            })
        }
         
    function successReg ()  {
        dispatch({type: 'SET_LOADING', value: true})
        Fire.auth().createUserWithEmailAndPassword(form.email, form.password)
        .then(success => {
            dispatch({type: 'SET_LOADING', value: false})
            setForm('reset')
            const data = {
                fullName: form.fullName,
                profession: form.profession,
                email: form.email,
                age: form.age,
                uid: success.user.uid,
            }
            Fire.database().ref('users/' +success.user.uid+ '/')
            .set(data)
            navigation.navigate('UploudPhoto', data);
            storeData('user', data);
              
        })
        .catch(err => {
            dispatch({type: 'SET_LOADING', value: false});
            showError(err.message)     
        });
    }

    }
              
    return (
         <View style= {styles.page}>
            <Header onPress= {() => navigation.goBack()} title="Daftar Akun"/>
            <ScrollView showsVerticalScrollIndicator={false}> 
            <View style={styles.content}>
                <Input  
                 label="Full Name"  
                 value={form.fullName} 
                 onChangeText={value => setForm('fullName', value)}
                />
                <Gap height={24}/>
                <Input  
                 label="Usia"  
                 value={form.age} 
                 onChangeText={value => setForm('age', value)}
                />
                <Gap height={24} />
                <Input 
                 label="Pekerjaan"  
                 value={form.profession} 
                 onChangeText={value => setForm('profession' ,value)}
                />
                <Gap height={24} />
                <Input 
                 label="Email" 
                 value={form.email} 
                 onChangeText={value => setForm('email' ,value)}
                />
                <Gap height={24} />
                <Input 
                 label="Password" 
                 value={form.password} 
                 onChangeText={value => setForm('password', value)} 
                 secureTextEntry
                />
                <Gap height={40} />
                <Button title="Continue" onPress={onContinue}/>
            </View>
            </ScrollView>   
         </View>
    )
    }    
export default Register;

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex: 1,
    },
    content: {
        padding: 40,
        paddingTop: 0
    }
})
