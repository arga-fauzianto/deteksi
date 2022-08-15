const mainColors = {
  green1: '#0BCAD4',
  green2: '#EDFCFD',
  dark1: '#112340',
  dark2: '#495A75',
  dark3: '#8092AF',
  grey1: '#7D8797',
  grey2: '#E9E9E9',
  grey3: '#EDEEF0',
  grey4: '#B1B7C2',
  blue1: '#0066CB',
  black1: '#000000',
  black2: 'rgba(0, 0, 0, 0.5)',
  red1: '#E06379'
}



export const colors = {
  primary: mainColors.green1,
  secondary: mainColors.dark1,
  tertiary: mainColors.blue1,
  fourtery: mainColors.grey4,
  fivetery: mainColors.red1,
  white: 'white',
  black: 'black',
  disable: mainColors.grey3,
  text: {
      primary: mainColors.dark1,
      secondary: mainColors.grey1,
      menuInActive: mainColors.dark2,
      menuActive: mainColors.grey1,
      subTitle: mainColors.dark3,
      textRiset: mainColors.green1
  },
  button: {
      primary: {
          background: mainColors.green1,
          text: 'white'
      },
      secondary: {
          background: 'white',
          text: mainColors.dark1
      },
      disable: {
        background: mainColors.grey2,
        text: mainColors.grey4
      }
    },
  border: mainColors.grey2,
  borderSecondary: mainColors.green2,
  borderTertiary: mainColors.red1,
  cardLight: mainColors.green2,
  loadingBackground: mainColors.black2,
  error: mainColors.red1
};