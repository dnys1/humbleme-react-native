import EStyleSheet from 'react-native-extended-stylesheet';

const INPUT_HEIGHT = 48;

export default EStyleSheet.create({
  container: {
    backgroundColor: '$white',
    width: '90%',
    height: INPUT_HEIGHT,
    justifyContent: 'center',
    marginVertical: 11,
  },
  input: {
    fontSize: 20,
  },
});
