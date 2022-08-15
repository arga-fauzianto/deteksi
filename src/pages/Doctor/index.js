import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ILCatPsikiater, ILCatUmum } from '../../assets'
import {
  DoctorCategory, Gap, HomeProfile, NewsItem, RatedDoctor
} from '../../components'
import { Fire } from '../../config'
import { colors, fonts, showError } from '../../utils'


const Doctor = ({navigation}) => {
  const [news, setNews] = useState([])
  const [categoryDoctor, setCategoryDoctor] = useState([])
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getCategoryDoctor();
    getRateDoctors();
    getNews();
    
  }, [])

  const getRateDoctors = () => {
    Fire.database()
    .ref('doctors/')
    .orderByChild('rate')
    .limitToLast(3)
    .once('value')
    .then(res => {
      if(res.val()){
        const oldData = res.val()
        const data = []
        Object.keys(oldData).map(key => {
          data.push({
            id: key,
            data: oldData[key]
          })
        })
        setDoctors(data)
      }
    }).catch(err => {
      showError(err.message)
    })
  }

  const getCategoryDoctor = () => {
    Fire.database().ref('category_doctor/').once('value').then(res => {
      if(res.val()){
        const data = res.val()
        const filterData = data.filter(el => el !== null);
        setCategoryDoctor(filterData)
      }
    }).catch(err => {
      showError(err.message)
    })
  }

  const getNews = () => {
    Fire.database().ref('news/').once('value').then(res => {
      if(res.val()){
        const data = res.val()
        const filterData = data.filter(el => el !== null);
        setNews(filterData)
      }
    }).catch(err => {
      showError(err.message)
    })
  }

    return (
      <>
        <ScrollView style={styles.scrollPage} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.wrapperSection}>
              <Gap height={30} />
              <HomeProfile onPress={() => navigation.navigate('UserProfile')}/>
              <Text style={styles.welcome}>Apa kabar hari ini? </Text>
            </View>
              <View style={styles.wrapperScroll}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.category}>
                    <Gap width={32} />
                    {categoryDoctor.map(item => {
                      return <DoctorCategory 
                      key={item.id} 
                      category={item.category} 
                      onPress={() => navigation.navigate('ChooseDoctor', item)}
                      />
                    })}
                    <TouchableOpacity 
                     style={styles.cardDeteksi} activeOpacity={0.5} onPress={() => navigation.navigate('Deteksi')}>
                        <ILCatUmum style={styles.illustration} />
                      <Text>Deteksi Dini</Text>
                    </TouchableOpacity>
                    <Gap width={22} />
                  </View>
                </ScrollView>
              </View>
              <View style={styles.wrapperSection}>
                <Text style={styles.sectionLabel}>Top Rated Doctor's</Text>
                {doctors.map(doctor => {
                  return <RatedDoctor
                  key={doctor.id} 
                  name={doctor.data.fullName} 
                  desc={doctor.data.profession} 
                  avatar={{uri: doctor.data.photo}} 
                  onPress={() => navigation.navigate('DoctorProfile', doctor)}
                />
                })}
                <Text style={styles.sectionLabel}>Good News</Text>
              </View>
              {news.map(item => {
                return(
                  <NewsItem 
                   key={item.id} 
                   title={item.title} 
                   date={item.date} 
                   image={item.image}
                   onPress={() => navigation.navigate('DetailNews', {news:item})}
                  />
                )
              })}
            <Gap height={30} />    
          </View>   
        </ScrollView>
      </>  
    )
}

export default Doctor

const styles = StyleSheet.create({
  scrollPage: {
    backgroundColor: colors.secondary,
    flex: 1
  },
  wrapperSection: {
    paddingHorizontal: 18
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    
  },
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 209
  },
  category: {
    flexDirection: 'row'
  },
  wrapperScroll: {
    marginHorizontal: -16
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
  cardDeteksi: {
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
})
