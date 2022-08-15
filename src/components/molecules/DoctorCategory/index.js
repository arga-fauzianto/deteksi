import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { ILCatUmum, ILCatPsikiater, ILCatObat, ILCatAnak } from '../../../assets'
import { colors, fonts } from '../../../utils'

const DoctorCategory = ({ category, onPress }) => {
  const Icon = () => {
    if(category === 'psikolog'){
      return <ILCatUmum style={styles.illustration} />
    }
    if(category === 'psikiater'){
      return <ILCatPsikiater style={styles.illustration} />
    }
    if(category === 'deteksi dini'){
      return <ILCatObat style={styles.illustration} />
    }
    // if(category === 'dokter anak'){
    //   return <ILCatAnak style={styles.illustration} />
    // }
    return <ILCatPsikiater style={styles.illustration} />;
  }
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
          <Icon />
            <Text style={styles.label}>Saya butuh</Text>
            <Text style={styles.category}>{category}</Text>
        </TouchableOpacity>
    )
}

export default DoctorCategory

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: colors.cardLight,
    alignSelf: 'flex-start',
    marginRight: 10,
    borderRadius: 10,
    width: 100,
    height: 130
  },
  illustration: {
    marginBottom: 28
  },
  label: {
    fontFamily: fonts.primary[300],
    fontSize: 12,
    color: colors.text.primary
  },
  category: {
    fontSize: 12,
    fontFamily: fonts.primary[600],
    color: colors.text.primary
  }
})
