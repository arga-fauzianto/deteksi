import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {Button, Gap, Header} from '../../components';
import {colors, fonts} from '../../utils';
import {ICRestart} from '../../assets';
import {useNavigation} from '@react-navigation/native';

const allQuestions = [
  {
    question: 'Merasa kesal karna sesuatu terjadi secara tidak terduga?',
  },

  {
    question: 'merasa tidak dapat mengendalikan hal-hal penting dalam hidup?',
  },

  {
    question: 'merasa gelisah dan stres?',
  },

  {
    question: 'merasa yakin terhadap kemampuanmu dalam menangani masalah pribadi?'
  },

  {
    question: 'merasa yakin bahwa segala sesuatu berjalan sesuai keinginanmu?'
  },

  {
    question: 'menemukan bahwa kamu tidak dapat mengatasi segala hal yang harus dilakukan?'
  },

  {
    question: 'mampu mengendalikan hal-hal penting dalam mengganggu dalam kehidupan ?'
  },

  {

    question: 'merasa dapat mengendalikan hal-hal dalam hidupmu?'
  },

  {
    question: 'merasa marah karna hal-hal terjadi diluar kendalimu ?'
  },
    {
    question: 'merasa kesulitanmu sangat banyak, sehingga kamu tidak mampu mengatasinya ?'
  },

  {
    question: 'merasa kesal sesuatu terjadi secara tidak terduga'
  },

  {
    question: 'merasa kesal sesuatu terjadi secara tidak terduga'
  },

  {
    question: 'merasa kesal sesuatu terjadi secara tidak terduga'
  }
];

const Answer = [
  {
    id: 0,
    jawaban: 'Tidak sering',
    nilai: 0,
  },

  {
    id: 1,
    jawaban: 'Jarang',
    nilai: 1,
  },

  {
    id: 2,
    jawaban: 'Kadang-kadang',
    nilai: 2,
  },

  {
    id: 3,
    jawaban: 'Sering',
    nilai: 3,
  },
];
const Deteksi = () => {
  const soal = allQuestions;
  const navigation = useNavigation();
  const [selected, setSelected] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showNextButton, setShowNextButton] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleAnswer = answer => {
    // ambil nilai dari awal sampe index
    const start = answers.slice(0, currentQuestionIndex);
    // ambil nilai setelah jawaban sampai terahir
    const end = answers.slice(currentQuestionIndex + 1);
    const updatedAnswers = [...start, answer, ...end];
    setAnswers(updatedAnswers);
  };

  const renderQuestion = () => {
    return (
      <View>
        <View style={{marginVertical: 30, marginLeft: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Text style={styles.currIndex}>{currentQuestionIndex + 1}</Text>
            <Text style={styles.lengtSoal}>/ {soal.length}</Text>
          </View>
          <Text style={styles.textQuestion}>
            {soal[currentQuestionIndex]?.question}
          </Text>
        </View>
      </View>
    );
  };

  const answerQuestions = () => {
    return (
      <View>
        {Answer.map((item, index) => {
          const terjawab =
            selected === item.jawaban ||
            answers[currentQuestionIndex]?.jawaban === item.jawaban;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelected(item.jawaban);
                // pake handler untuk mengirim jawaban/item
                handleAnswer(item);
                setShowNextButton(true);
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 15,
                  width: 145,
                  marginVertical: 2,
                  padding: 8,
                }}>
                {terjawab ? (
                  <View
                    style={[
                      styles.circleIn,
                      terjawab && {
                        backgroundColor: colors.primary,
                        borderRadius: 100,
                      },
                    ]}
                  />
                ) : (
                  <View style={styles.circleOut} />
                )}
                <Text>{item?.jawaban}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const handleNext = () => {
    if (currentQuestionIndex == soal.length - 1) {
      // Last Question
      // Show Score Modal
      setModalVisible(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelected(0);
      // setCorrectOption(null);
      // setIsOptionsDisabled(false);
      setShowNextButton(false);
    }
  };

  const renderNextButton = () => {
    if (showNextButton || answers[currentQuestionIndex]?.jawaban) {
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleNext}
          style={styles.btnNext}>
          <Text
            style={{
              fontFamily: fonts.primary[800],
              color: colors.white,
              fontSize: 15,
            }}>
            Next
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
    // if(showNextButton) {
    //   return (
    //     <TouchableOpacity activeOpacity={0.5} onPress={handleNext} style={styles.btnNext}>
    //       <Text>Next</Text>
    //     </TouchableOpacity>
    //   )
    // } else {
    //   return null
    // }
  };

  const handleCloseModal = () => {
    Alert.alert('Selesai', 'Apa anda yakin untuk meninggalkan quiz?', [
      {text: 'No'},
      {
        text: 'Yes',
        onPress: () => {
          navigation.goBack();
          setModalVisible(false);
        },
      },
    ]);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(idx => --idx);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <Header
        type="icon-only"
        icon="dark"
        title="Deteksi Dini"
        color="dark"
        onPress={() => navigation.goBack()}
      />

      {/* Progress bar  */}

      {/* render Question  */}
      {renderQuestion()}
      {/* render Selected  */}

      {/* render asnwer */}
      {answerQuestions()}
      {/* render Next Button  */}

      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        {renderNextButton()}
      </View>
      <Modal
        visible={isModalVisible}
        onRequestClose={handleCloseModal}
        animationType={'slide'}
        transparent={true}>
        <View style={styles.wrappContentModal}>
          <View style={styles.contentModal}>
            <Text style={styles.textTotalScore}>
              {/* Total nilai */}
              {answers.reduce((p, c) => p + c.nilai, 0)}
            </Text>
            {/* <Text style={styles.textInfo}>Sedang</Text> */}
            <View style={{marginTop: 15}}>
              <Text
                style={{
                  fontFamily: fonts.primary[400],
                  fontSize: 16,
                  textAlign: 'left',
                }}>
                Sepertinya kamu sudah menangani masalah sudah sangat baik,
                tetapi jika ada kendala sebaiknya kamu konsultasi pada ahlinya
              </Text>
              <View style={styles.wrappIndicator}>
                <Text style={styles.titleLevel}>Perhitungan level</Text>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: 30, height: 30, backgroundColor: '#ADB821', marginTop: 15, borderRadius: 4}} />
                  <Text style={{left: 12, top: 25, fontFamily: fonts.primary[400]}}>0-13-Rendah</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: 30, height: 30, backgroundColor: '#F3E539', marginTop: 15, borderRadius: 4}} />
                  <Text style={{left: 12, top: 25, fontFamily: fonts.primary[400]}}>14-26-Sedang</Text>
                </View>
                <View style={{flexDirection: 'row', position: 'absolute', left: 200, top: 35}}>
                  <View style={{width: 30, height: 30, backgroundColor: '#EF463E', marginTop: 15, borderRadius: 4}} />
                  <Text style={{left: 12, top: 25, fontFamily: fonts.primary[400]}}>27-40-Tinggi</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 15,
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      color: colors.text.textRiset,
                      fontFamily: fonts.primary[400],
                      fontSize: 14,
                      marginBottom: 20
                    }}>
                    Chat Dengan Psikolog
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 10,
                    marginBottom:20
                  }}>
                  <Image source={ICRestart} style={{width: 14, height: 14}} />
                  <Text
                    style={{
                      color: colors.text.textRiset,
                      fontFamily: fonts.primary[400],
                      fontSize: 14,
                      left: 10,
                    }}>
                    Coba Ulang
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Deteksi;

const styles = StyleSheet.create({
  lengtSoal: {
    fontFamily: fonts.primary[400],
    color: 'black',
    fontSize: 16,
    opacity: 0.7,
    marginRight: 3,
  },
  currIndex: {
    fontFamily: fonts.primary[600],
    color: 'black',
    fontSize: 18,
    opacity: 0.7,
    marginRight: 3,
  },

  textQuestion: {
    fontFamily: fonts.primary[400],
    fontSize: 18,
    color: colors.black,
  },

  circleOut: {
    borderWidth: 1,
    borderColor: '#AAAA',
    borderRadius: 100,
    backgroundColor: 'white',
    width: 20,
    height: 20,
    marginRight: 5,
  },

  circleIn: {
    width: 20,
    height: 20,
    marginRight: 5,
  },

  //style modal

  wrappContentModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
  },

  contentModal: {
    width: '95%',
    height: '38%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 23,
    alignItems: 'center',
  },

  textTotalScore: {
    fontFamily: fonts.primary[600],
    fontWeight: 'bold',
    fontSize: 18,
  },

  textInfo: {
    fontFamily: fonts.primary[300],
    fontSize: 14,
    color: colors.secondary,
    top: 5,
  },

  //closed styling modal
  btnNext: {
    justifyContent: 'center',
    marginTop: 70,
    width: '80%',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 5,
  },

  //wrap style indicator

  wrappIndicator: {
    flex: 1,
  },
  titleLevel: {
    fontFamily: fonts.primary[600],
    fontSize: 20,
    color: colors.primary,
    marginTop: 12
  }
});
