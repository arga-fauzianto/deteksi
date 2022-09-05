import React, { useEffect, useState } from 'react'
import { StyleSheet, StatusBar, View } from 'react-native'
import { Header, List } from '../../components'
import { DummyDoctor7, DummyDoctor8, DummyDoctor9, DummyDoctor10, DummyDoctor11 } from '../../assets'
import { colors } from '../../utils'

import {Fire} from '../../config'

const ChooseDoctor = ({navigation, route}) => {
	const [listDoctor, setListDoctor] = useState([])
	const itemCategory = route.params;
	useEffect(() => {
	 callDoctorByCategory(itemCategory.category_psikolog)
	}, [])

	const callDoctorByCategory = (category_psikolog) => {

		Fire.database().ref('psikologs/').orderByChild('category_psikolog').equalTo(category_psikolog).once('value').then(res => {
			if(res.val()) {
				const data = []
				const oldData = res.val()
				Object.keys(oldData).map(item => {
					data.push({
						id: item,
						data: oldData[item]
					})
				})
				setListDoctor(data)
			}
		})

	} 

    return (
		<>	
			<StatusBar barStyle = "light-content" translucent backgroundColor={colors.secondary} hidden={false} />
    		<View style={styles.page}>
				<Header 
				type="dark" 
				title={`Pilih ${itemCategory.category_psikolog}`} 
				onPress={() => navigation.goBack()}
				/>
				{listDoctor.map(doctor => {
				 return	<List 
				    key={psikolog.id}
					type="next" 
					profile={{uri: psikolog.data.photo}}
					name={psikolog.data.fullName}
					desc={psikolog.data.gender}
					onPress={() => navigation.navigate('DoctorProfile', doctor)} 
					/>

				})}
        	</View>
		</>	
    )
}

export default ChooseDoctor

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex: 1
    }
})
