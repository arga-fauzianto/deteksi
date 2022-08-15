import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Button ,Gap,Header, Profile, ProfileItem} from '../../components';
import { colors } from '../../utils';

const DoctorProfile = ({ navigation, route }) => {
  const dataDoctor = route.params;
  return (
    <ScrollView showsVerticalScrollIndicator={false}> 
    <View style={styles.page}>
      <Header title="Doctor Profile" onPress={() => navigation.goBack() }/>
      <Profile 
      name={dataDoctor.data.fullName} 
      desc={dataDoctor.data.profession}
      photo={{uri: dataDoctor.data.photo}}
      />
      <Gap height={10}/>
      <ProfileItem label="Alumnus" value={dataDoctor.data.university}/>
      <ProfileItem label="Tempat Praktik" value={dataDoctor.data.hospital_address} />
      <ProfileItem label="No, STR" value={dataDoctor.data.str_number}/>
      <Gap height={23}/>
      <View style={styles.action}>
        <Button title="Start Consultation" onPress={() => navigation.navigate('Chatting', dataDoctor)} />
      </View>
    </View>
    </ScrollView>
  )
}

export default DoctorProfile

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1
  },
  action: {
    paddingHorizontal: 40,
    paddingTop: 23,
    marginBottom: 23
  }
})
