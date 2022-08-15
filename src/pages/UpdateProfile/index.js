import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { launchImageLibrary } from 'react-native-image-picker'
import { ILNullPhoto } from '../../assets'
import { Button, Gap, Header, Input, Profile } from '../../components'
import { Fire } from '../../config'
import { colors, getData, storeData } from '../../utils'




const UpdateProfile = ({ navigation }) => {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    email: '',
    photoDB: ''
  })
  const [password, setPassword] = useState('')
  const [photo, setPhoto] = useState(ILNullPhoto)


  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      data.photoDB = res?.photo?.length > 1 ? res.photo : ILNullPhoto;
      const tempPhoto = res?.photo?.length > 1 ? {uri: res.photo} : ILNullPhoto;
      setPhoto(tempPhoto);
      setProfile(data);
    })
  }, [])
    
  const update = () => {
    if(password.length > 0){
      if(password.length < 6){
        showMessage({
          message: 'Password kurang dari 6 karakter',
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white
        })
      } else {
        updatePassword();
        updateDataProfile();
        navigation.replace('MainApp')
      }
    } else {
      updateDataProfile();
      navigation.replace('MainApp')
    }
    
  }

  const updatePassword = () => {

    Fire.auth().onAuthStateChanged(user => {
      if(user) {
        user.updatePassword(password).catch(err => {
          showMessage({
            message: err.message,
            type: 'default',
            backgroundColor: colors.error,
            color: colors.white
          })
        })
      }
    })

  }

  const updateDataProfile = () => {
    const data = profile;
    data.photo = profile.photoDB;
    Fire.database()
      .ref(`users/${profile.uid}/`)
      .update(data)
      .then(() => {
        console.log('success: ', data)
        storeData('user', data)
      })
      .catch(err => {
        showMessage({
          message: err.message,
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white
        })
      })
  }

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value
    })
  }

  const getImage = () => {
    launchImageLibrary({quality: 0.5, maxHeight: 200, maxWidth: 200, includeBase64:true}, response => {
      console.log('response: ', response)
      if(response.didCancel || response.error) {
          showMessage({
              message: 'oops, anda tidak memilih photo',
              type: 'default',
              backgroundColor: colors.error,
              color: colors.white,
              // hideStatusBar: true
              
          })
      }else{
          console.log('response getImage: ', response);
          const source = {uri: response.uri}
          setProfile({
            ...profile,
            photoDB: `data:${response.type};base64, ${response.base64}`
          });
          setPhoto(source);
      }
      
  })
  }

    return (
        <View style={styles.page}>
          <Header title="Edit Profile" onPress={() => navigation.goBack()}/>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
              <Profile isRemove photo={photo} onPress={getImage}/>
              <Gap height={26}/>
              <Input label="Full Name" value={profile.fullName} onChangeText={(value) => changeText('fullName', value)} />
              <Gap height={24} />
              <Input label="Pekerjaan" value={profile.profession} onChangeText={(value) => changeText('profession', value)}/>
              <Gap height={24} />
              <Input label="Email" value={profile.email} disable/>
              <Gap height={24} />
              <Input label="Password"
              secureTextEntry 
              value={password} 
              onChangeText={value => setPassword(value)}
              />
              <Gap height={40}/>
              <Button title="Save Profile" onPress={update}/>
            </View>
          </ScrollView>
        </View>
    )
}

export default UpdateProfile

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
