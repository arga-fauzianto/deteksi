import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { List } from '../../components'
import { Fire } from '../../config'
import { colors, fonts, getData } from '../../utils'


const Messages = ({ navigation }) => {

  const [user, setUser] = useState({})
  const [historyChat, setHistoryChat] = useState([]);

  const getDataUserFromLocal = () => {
    getData('user').then(res => {
      setUser(res);
    })
  }

  useEffect(() => {
    getDataUserFromLocal()
    const rootDB =  Fire.database().ref()
    const urlHistory = `messages/${user.uid}/`
    const messagesDB = rootDB.child(urlHistory);

    messagesDB.on('value', async snapshot => {
      if (snapshot.val()) {
        const oldData = snapshot.val();
        const data = [];

       const promises = await Object.keys(oldData).map( async key => {
          const urlUidDoctor = `psikologs/${oldData[key].uidPartner}`;
          const detailDoctor = await rootDB.child(urlUidDoctor).once('value');
          console.log('data history: ', detailDoctor.val())
          data.push({
            id: key,
            detailDoctor: detailDoctor.val(),
            ...oldData[key],
          })
        })

        await Promise.all(promises);
        console.log('new History: ', data); 
        setHistoryChat(data);
      }
    })
  }, [user.uid])

 
    return (
        <View style={styles.page}>
          <View style={styles.content}>
            <Text style={styles.title}>Messages</Text>
            {historyChat.map((chat) => {
              const dataDoctor = {
                id: chat.detailDoctor.uid,
                data: chat.detailDoctor
              }
                return (
                <List
                key={chat.id} 
                name={chat.detailDoctor.fullName} 
                profile={{uri: chat.detailDoctor.photo}} 
                desc={chat.lastContentChat}
                onPress={() => navigation.navigate('Chatting', dataDoctor)}
               />
              )
              })
            }            
          </View>
        </View>
    )
}

export default Messages

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginLeft: 16
  }
})
