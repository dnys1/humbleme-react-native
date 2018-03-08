import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const deviceHeight = Dimensions.get('window').height;

export default EStyleSheet.create({
  container: {
    flex: 1,
    height: deviceHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$white',
  },
});
