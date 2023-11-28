import { Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window')

export const COLORS = {
    primary: '#FF6347',
    secondary: '#544C4C',
    white: '#ffffff',
    black: '#000000',
    gray: 'rgba(36, 39, 96, 0.05)',
    secondaryGray: 'rgba(84, 76, 76, 0.14)'
}

export const SIZES = {
    // global SIZES
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,
    padding3: 16,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 20,
    h3: 18,
    h4: 16,
    body1: 30,
    body2: 20,
    body3: 18,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height,

    xSmall: 10,
    small: 12,
    medium: 16,
    large: 20,
    xLarge: 24,
    xxLarge: 32,
}

export const FONTS = {
    largeTitle: {
        fontWeight: 'black',
        fontSize: SIZES.largeTitle,
        lineHeight: 55,
    },
    h1: { fontWeight: 'bold', fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontWeight: 'bold', fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontWeight: 'bold', fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontWeight: '500', fontSize: SIZES.h4, lineHeight: 20, },
    h5: { fontWeight: 'regular', fontSize: SIZES.h4, lineHeight: 22,  color: "#606060" },
    body1: { fontWeight: 'regular', fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontWeight: 'regular', fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontWeight: 'regular', fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontWeight: 'regular', fontSize: SIZES.body4, lineHeight: 20 },
}

const SHADOWS = {
    small: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 5.84,
      elevation: 5,
    },
  };

const appTheme = { COLORS, SIZES, FONTS, SHADOWS }

export default appTheme