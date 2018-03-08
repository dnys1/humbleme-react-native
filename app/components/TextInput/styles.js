import Color from 'color';
import EStyleSheet from 'react-native-extended-stylesheet';

const INPUT_HEIGHT = 48;
const BORDER_RADIUS = 4;

export default EStyleSheet.create({
  container: {
    backgroundColor: Color('#333').alpha(0.5),
    justifyContent: 'center',
    width: '80%',
    height: INPUT_HEIGHT,
    marginVertical: 11,
    borderRadius: BORDER_RADIUS,
    paddingHorizontal: 20,
  },
  input: {
    fontSize: 20,
    color: '$white',
  },
});
