import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { logoWidth, logoHeight } from './img/sizes';

const width = Dimensions.get('window').width / 2;

export default EStyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  torchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  whiteLogo: {
    width,
    height: Math.round(width * (logoHeight / logoWidth)),
  },
});
