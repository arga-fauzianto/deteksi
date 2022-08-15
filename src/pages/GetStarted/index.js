import React from 'react'
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native'


//assets

import {ILLogo, ILGetStarted} from '../../assets'
import { Button, Gap } from '../../components'
import { colors, fonts } from '../../utils'


const GetStarted = ({navigation}) => {
return (                        
        <ImageBackground source={ILGetStarted} style={styles.page}>
            <View>
					<Image 
                     style={{width: 90, height: 90}} 
                     source={require('../../assets/illustration/logo-transparant.png')}
                    />
					<Text style={styles.title}>
						Deteksi diri anda !!
					</Text>
				</View>
            <View>
                <Button title= "Get Started" onPress={() => navigation.navigate('Register')}/>
                <Gap height={16} />
                <Button type="secondary" title= "Sign In" onPress={() => navigation.replace('Login')}/>
            </View>
        </ImageBackground>
    )
}

export default GetStarted

const styles = StyleSheet.create({
    page: {
		 padding: 40, 
		 justifyContent: 'space-between',
         flex: 1,
         backgroundColor: colors.white
		},
    title: {
        fontSize: 28, 
        marginTop: 91, 
        color: colors.white,
        fontFamily: fonts.primary[600],
      }
})
