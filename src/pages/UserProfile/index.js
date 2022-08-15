import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { ILNullPhoto } from '../../assets'
import { Gap, Header, List, Profile } from '../../components'
import { Fire } from '../../config'
import { colors, getData } from '../../utils'


const UserProfile = ({navigation}) => {
    const [profile, setProfile] = useState({
        fullName: '',
        profession: '',
        photo: ILNullPhoto
      })
      useEffect(() => {
        getData('user').then(res => {
            const data = res;
            data.photo = {uri: res.photo}
            setProfile(data);
        })
      }, [])

    const signOut = () => {
        Fire.auth().signOut().then(res => {
            navigation.replace('GetStarted');

        }).catch(err => {
            showMessage({
                message: err.message,
                type: 'default',
                backgroundColor: colors.error,
                color: colors.white
            })
        })
    }

    return (
        <View style={styles.page}>
            <Header title="Profile" onPress={() => navigation.goBack()}/>
            <Gap height={10}/>
            {profile.fullName.length > 0 && (
            <Profile name={profile.fullName} desc={profile.profession}  photo={profile.photo} />
            )}
            <Gap height={14}/>
            <List 
             name="Edit Profile" 
             desc="Last Update Yesterday" 
             type="next" 
             icon="edit-profile"
             onPress={() => navigation.navigate('UpdateProfile')}
            />
            <List 
             name="Language" 
             desc="Available 12 language" 
             type="next" 
             icon="language"
            />
            <List  
             name="Give Us Rate" 
             desc="On Google Playstore" 
             type="next" 
             icon="rate"
            />
            <List 
             name="Sign Out" 
             desc="Read On Guidlines" 
             type="next" 
             icon="help"
             onPress={signOut}
            />
        </View>
    )
}

export default UserProfile
const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex: 1
    }
})